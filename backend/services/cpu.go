package services

import "github.com/shirou/gopsutil/v3/cpu"


type CPU struct {
	Name string `json:"name"`
}
func NewCPU() *CPU {
	return &CPU{}
}

func (s *CPU)GetCpuInfo() CPU {
	cpuInfo, _ := cpu.Info()
	return CPU{
		Name:cpuInfo[0].ModelName,
	}
}