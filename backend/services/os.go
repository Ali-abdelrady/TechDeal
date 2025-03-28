package services

import (
	"context"
	"fmt"
	"os/exec"
	"strings"
	"sync"
	"time"

	"github.com/shirou/gopsutil/v3/host"
	"golang.org/x/sys/windows/registry"
)
var (
    deviceModelOnce sync.Once
    cachedModel     string
)

type OS struct {
	ModelName        string `json:"modelName"`
	OS               string `json:"os"`
	WindowsActivated bool   `json:"windowsActivated"`
}
func NewOS() *OS{
	return &OS{}
}
func (s *OS) GetOSInfo() OS {
	hostInfo, _ := host.Info()
	modelName := getDeviceModel() // Get actual device model
	return OS{
		ModelName: modelName,
		OS: hostInfo.Platform,
	}
}


func getDeviceModel() string {
    deviceModelOnce.Do(func() {
        cachedModel = fetchDeviceModel()
    })
    return cachedModel
}

func fetchDeviceModel() string {
    // Try WMI first (fastest)
    if model := tryWMI(); model != "" {
        return model
    }
    
    // Try optimized registry paths
    regPaths := []struct {
        path  string
        value string
    }{
        {`SYSTEM\CurrentControlSet\Control\SystemInformation`, "SystemProductName"},
        {`HARDWARE\DESCRIPTION\System\BIOS`, "SystemProductName"},
    }
    
    for _, reg := range regPaths {
        if val, err := getRegistryStringValue(reg.path, reg.value); err == nil && val != "" {
            return val
        }
    }
    
    return "Unknown Model"
}

func tryWMI() string {
    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer cancel()
    
    cmd := exec.CommandContext(ctx, "wmic", "csproduct", "get", "name", "/value")
    output, err := cmd.Output()
    if err == nil && strings.HasPrefix(string(output), "Name=") {
        return strings.TrimSpace(string(output)[5:])
    }
    return ""
}

func getRegistryStringValue(path, value string) (string, error) {
    key, err := registry.OpenKey(registry.LOCAL_MACHINE, path, registry.READ)
    if err != nil {
        return "", fmt.Errorf("failed to open key %s: %w", path, err)
    }
    defer key.Close()

    val, valType, err := key.GetStringValue(value)
    if err != nil {
        return "", fmt.Errorf("failed to read value %s: %w", value, err)
    }

    // Handle expandable strings (REG_EXPAND_SZ)
    if valType == registry.EXPAND_SZ {
        expanded, err := registry.ExpandString(val)
        if err != nil {
            return val, nil // Return original if expansion fails
        }
        return expanded, nil
    }

    return val, nil
}