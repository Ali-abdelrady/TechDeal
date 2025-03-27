package services

import (
	"fmt"
	"os/exec"
	"strings"
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
func getRamSlots()int{
	cmd := exec.Command("wmic", "memphysical", "get", "memorydevices")
	output, err := cmd.Output()
	if err != nil {
		return 0
	}

	lines := strings.Split(string(output), "\n")
	if len(lines) < 2 {
		return 0
	}

	var slots int
	_, err = fmt.Sscanf(strings.TrimSpace(lines[1]), "%d", &slots)
	if err != nil {
		return 0
	}

	return slots

}
