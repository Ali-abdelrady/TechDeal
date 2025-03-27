package services

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// System struct to hold system-related functions
type System struct{
	batteryReportPath string
}

// NewSystem creates an instance of System
func NewSystem() *System {
	return &System{}
}

// OpenDeviceManager opens the Windows Device Manager
func (s *System) OpenDeviceManager() error {
	if runtime.GOOS == "windows" {
		cmd := exec.Command("cmd", "/C", "devmgmt.msc")
		return cmd.Start() // Start runs it in the background
	}
	return nil
}
func (s *System) GenerateBatteryReport() (string, error) {
	if runtime.GOOS != "windows" {
		return "", fmt.Errorf("battery reports are only supported on Windows")
	}

	// If already generated, return existing path
	if s.batteryReportPath != "" {
		if _, err := os.Stat(s.batteryReportPath); err == nil {
			return s.getFileURL(), nil
		}
	}

	// Generate new report
	userDir, err := os.UserHomeDir()
		if err != nil {
			return "", err
		}
	s.batteryReportPath = filepath.Join(userDir,"Documents", "battery-report.html")

	cmd := exec.Command("powercfg", "/batteryreport", "/output", s.batteryReportPath)
	if output, err := cmd.CombinedOutput(); err != nil {
		return "", fmt.Errorf("failed to generate battery report: %w (output: %s)", err, string(output))
	}

	// Read the file content
	content, err := os.ReadFile(s.batteryReportPath)
	if err != nil {
		return "", fmt.Errorf("failed to read report: %w", err)
	}

	return string(content), nil
}

// getFileURL formats the path as a file:// URL
func (s *System) getFileURL() string {
	return "file:///" + filepath.ToSlash(s.batteryReportPath)
}