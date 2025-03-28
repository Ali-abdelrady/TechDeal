package services

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"
	"syscall"
	"techDeal/backend/utils"

	"github.com/shirou/gopsutil/v3/mem"
)

type RAM struct {
	Size string `json:"size"`
	Slots int `json:"slots"`
}

func NewRam() *RAM{
	return &RAM{}
}
func (s *RAM)GetRamInfo() RAM {
	vmem, _ := mem.VirtualMemory()
	slots:= getRamSlots()
	ramSize := utils.FormatCapacity(float64(vmem.Total))
	return RAM{
		Size: ramSize,
		Slots: slots,
	}
}
func getRamSlots() int {
	if runtime.GOOS != "windows" {
		return 0
	}

	// Method 2: Alternative WMI query
	cmd := exec.Command("wmic", "memphysical", "get", "memorydevices")

		// Hide terminal window
		cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}

		output, err := cmd.Output()
		if err == nil {
			lines := strings.Split(strings.TrimSpace(string(output)), "\n")
			if len(lines) >= 2 {
				var slots int
				if _, err := fmt.Sscanf(strings.TrimSpace(lines[1]), "%d", &slots); err == nil && slots > 0 {
					return slots
				}
			}
		}
	// Method 3: PowerShell fallback
	psScript := `
	$totalSlots = 0
	try { $totalSlots = (Get-WmiObject Win32_PhysicalMemoryArray).MemoryDevices }
	catch { 
		try { $totalSlots = (Get-CimInstance Win32_PhysicalMemoryArray).MemoryDevices }
		catch { $totalSlots = 0 }
	}
	$totalSlots
	`
	cmd = exec.Command("powershell", "-Command", psScript)
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true} // Hide the window on Windows
	output, err = cmd.CombinedOutput()
	if err == nil {
		var slots int
		if _, err := fmt.Sscanf(strings.TrimSpace(string(output)), "%d", &slots); err == nil && slots > 0 {
			return slots
		}
	}

	return 0
}