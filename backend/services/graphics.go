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
	GpuList []string `json:"cards"`
	Resolution string `json:"resolution"`
	IsTouchscreen bool `json:"isTouchScreen"`
}
func NewGPU() *GPU{
	return &GPU{}
}
func (g *GPU) GetGraphicsInfo() GPU {
	var gpuList []string
	
	os := runtime.GOOS
	if os == "windows"{
		out, err := exec.Command("wmic", "path", "win32_videocontroller", "get", "name").Output()
		if err != nil {
			return GPU{GpuList: nil}
		}
		lines := strings.Split(string(out), "\n")
		for _, line := range lines {
			trimmedLine := strings.TrimSpace(line)
			if trimmedLine != "" && !strings.Contains(trimmedLine, "Name") {
				gpuList = append(gpuList, trimmedLine)
			}
		}
	}
	return GPU{
		GpuList: gpuList,
		IsTouchscreen: isTouchscreenEnabled(),
		Resolution: getScreenResolution(),
	}
}

// isTouchscreenEnabled checks if the screen is a touchscreen (Windows only)
func isTouchscreenEnabled() bool {
	if runtime.GOOS != "windows" {
		return false
	}

	user32 := syscall.NewLazyDLL("user32.dll")
	getSystemMetrics := user32.NewProc("GetSystemMetrics")

	// Check if digitizer is ready
	ret, _, _ := getSystemMetrics.Call(SM_DIGITIZER)
	if (ret & NID_READY) == 0 {
		return false
	}

	// Check if it's an integrated touch screen
	if (ret & NID_INTEGRATED_TOUCH) != 0 {
		return true
	}

	// Check if it supports multi-touch
	if (ret & NID_MULTI_INPUT) != 0 {
		// Check maximum touches supported
		maxTouches, _, _ := getSystemMetrics.Call(SM_MAXIMUMTOUCHES)
		return maxTouches > 0
	}

	return false
}
// getScreenResolution fetches screen resolution and classification
func getScreenResolution() string {
	n := screenshot.NumActiveDisplays()
	if n == 0 {
		return "Unknown"
	}
	bounds := screenshot.GetDisplayBounds(0)
	width, height := bounds.Dx(), bounds.Dy()
	return fmt.Sprintf("%dx%d - %s", width, height, classifyResolution(width, height))
}

// classifyResolution classifies resolution based on width and height
func classifyResolution(width, height int) string {
	if width >= 3840 && height >= 2160 {
		return "4K UHD"
	} else if width >= 2560 && height >= 1440 {
		return "2K QHD"
	} else if width >= 1920 && height >= 1080 {
		return "Full HD (1080p)"
	} else if width >= 1280 && height >= 720 {
		return "HD (720p)"
	} else {
		return "SD or Lower"
	}
}