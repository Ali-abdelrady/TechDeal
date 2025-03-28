package services

type Windows struct {
	IsActivated bool `json:"isActivated"`
}

func NewWindows() *Windows {
	return &Windows{}
}

func (w *Windows) IsWindowsActivated() Windows {
	return Windows{
		IsActivated: true,
	}
}

// // Most reliable method combining registry and WMI checks
// func getWindowsActivationStatus() bool {
// 	// 1. First try registry (fastest and most reliable)
// 	if activated := checkRegistryActivation(); activated {
// 		return true
// 	}

// 	// 2. Fallback to WMI if registry check is inconclusive
// 	return checkWMIActivation()
// }

// func checkRegistryActivation() bool {
// 	key, err := registry.OpenKey(
// 		registry.LOCAL_MACHINE,
// 		`SOFTWARE\Microsoft\Windows NT\CurrentVersion\SoftwareProtectionPlatform`,
// 		registry.READ,
// 	)
// 	if err != nil {
// 		return false
// 	}
// 	defer key.Close()

// 	// Check multiple registry values for different activation types
// 	if status, _, err := key.GetIntegerValue("ActivationStatus"); err == nil && status == 1 {
// 		return true
// 	}

// 	if disabled, _, err := key.GetIntegerValue("NotificationDisabled"); err == nil && disabled == 1 {
// 		return true
// 	}

// 	if kmsName, _, err := key.GetStringValue("KeyManagementServiceName"); err == nil && kmsName != "" {
// 		return true
// 	}

// 	return false
// }

// func checkWMIActivation() bool {
// 	cmd := exec.Command("powershell", "-Command",
// 		`(Get-CimInstance -ClassName SoftwareLicensingProduct `+
// 			`-Filter "ApplicationId = '55c92734-d682-4d71-983e-d6ec3f16059f'").LicenseStatus -eq 1`)

// 	output, err := cmd.Output()
// 	if err != nil {
// 		return false
// 	}

// 	return strings.TrimSpace(string(output)) == "True"
// }