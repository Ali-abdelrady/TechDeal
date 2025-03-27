package services

import (
	"fmt"

	"github.com/shirou/gopsutil/v3/host"
	"golang.org/x/sys/windows/registry"
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
	return OS{
		ModelName: hostInfo.Hostname,
		OS: fmt.Sprintf("%s", hostInfo.Platform),
		WindowsActivated: getWindowsActivationStatus(),
	}
}
func getWindowsActivationStatus() bool {
	k, err := registry.OpenKey(registry.LOCAL_MACHINE, `SOFTWARE\Microsoft\Windows NT\CurrentVersion`, registry.QUERY_VALUE)
	if err != nil {
		return false
	}
	defer k.Close()
	val, _, err := k.GetStringValue("RegisteredOwner")
	return err == nil && val != ""
}