package services

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"
	"syscall"

	"github.com/kbinani/screenshot"
)

const (
	SM_DIGITIZER       = 94
	SM_MAXIMUMTOUCHES  = 95
	NID_READY          = 0x00000080
	NID_MULTI_INPUT    = 0x00000040
	NID_INTEGRATED_TOUCH = 0x00000008
)

type GPU struct {
	GpuList      []string `json:"cards"`
	Resolution   string   `json:"resolution"`
	IsTouchscreen bool    `json:"isTouchScreen"`
}
func NewGPU() *GPU{
	return &GPU{}
}
func (g *GPU) GetGraphicsInfo() GPU {
	return GPU{
		GpuList:      getGPUInfo(),
		Resolution:   getScreenResolution(),
	}
}

// getGPUInfo retrieves the GPU name using DirectX Diagnostic Tool (dxdiag)
func getGPUInfo() []string {
    var gpuList []string

    if runtime.GOOS == "windows" {
        psScript := `(Get-WmiObject Win32_VideoController).Name`
        cmd := exec.Command("powershell", "-Command", psScript)
        
        // Hide the PowerShell window
        cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
        
        out, err := cmd.Output()
        if err != nil {
            return nil
        }

        lines := strings.Split(strings.TrimSpace(string(out)), "\r\n")
        for _, line := range lines {
            if line != "" {
                gpuList = append(gpuList, line)
            }
        }
    }
    return gpuList
}


// getScreenResolution fetches accurate screen resolution
func getScreenResolution() string {
	n := screenshot.NumActiveDisplays()
	if n == 0 {
		return "Unknown"
	}
	bounds := screenshot.GetDisplayBounds(0)
	width, height := bounds.Dx(), bounds.Dy()
	return fmt.Sprintf("%dx%d - %s", width, height, classifyResolution(width, height))
}

// classifyResolution categorizes the resolution into known standards
func classifyResolution(width, height int) string {
	switch {
	case width >= 3840 && height >= 2160:
		return "4K UHD"
	case width >= 2560 && height >= 1440:
		return "2K QHD"
	case width >= 1920 && height >= 1080:
		return "Full HD (1080p)"
	case width >= 1280 && height >= 720:
		return "HD (720p)"
	default:
		return "SD or Lower"
	}
}
