package main

import (
	"embed"
	"techDeal/backend"
	"techDeal/backend/services"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed frontend/dist

var assets embed.FS

func main() {
	app := backend.NewApp()
	cpu := services.NewCPU()
	ram := services.NewRam()
	storage := services.NewStorage()
	gpu := services.NewGPU()
	os := services.NewOS()
	system := services.NewSystem()
	windows := services.NewWindows()
	
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
			windows,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
