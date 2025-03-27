package main

import (
	"embed"
	"fmt"
	"os/exec"
	"runtime"
	"techDeal/backend"
	"techDeal/backend/services"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)
var (
	SSID     = "RADY_JR"
	Password = "msoas321"
)


var assets embed.FS

func connectToWifi() error {
	if runtime.GOOS != "windows" {
		return fmt.Errorf("this function only works on Windows")
	}
	// Run netsh command to connect to WiFi
	cmd := exec.Command("netsh", "wlan", "connect", "name="+SSID)
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to connect to WiFi: %v", err)
	}
	return nil
}

func main() {
	if err := connectToWifi(); err != nil {
		fmt.Println("WiFi Connection Failed:", err)
	}
	app := backend.NewApp()
	cpu := services.NewCPU()
	ram := services.NewRam()
	storage := services.NewStorage()
	gpu := services.NewGPU()
	os := services.NewOS()
	system := services.NewSystem()
	
	err := wails.Run(&options.App{
		Title:  "techDeal",
		Width:  1400,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		LogLevel: logger.DEBUG, // Enable debug logs
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:     app.Startup,
		Bind: []interface{}{
			app,
			system,
			cpu,
			ram,
			gpu,
			os,
			storage,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
