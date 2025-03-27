package services

import (
	"log"
	"strings"
	"techDeal/backend/utils"

	"github.com/shirou/gopsutil/v3/disk"
)

// Storage represents overall storage information.
type Storage struct {
	Disks []Disk `json:"disks"`
	Total string `json:"total"`
}
type Disk struct {
	Size string `json:"size"`
	Type string `json:"type" `// HDD or SSD
}

func NewStorage() *Storage{
	return &Storage{}
}

// GetStorageInfo retrieves storage details, including disk types.
func (s *Storage) GetStorageInfo() Storage {
	totalStorage := 0.0
	partitions, err := disk.Partitions(false)
	if err != nil {
		log.Fatalf("Error getting disk partitions: %v", err)
	}

	var storageList []Disk
	for _, partition := range partitions {
		diskInfo, err := disk.Usage(partition.Mountpoint)
		if err == nil {
			storageList = append(storageList, Disk{
				Size: utils.FormatCapacity(float64(diskInfo.Total)),
				Type: detectDiskType(partition.Device),
			})
			totalStorage += float64(diskInfo.Total)
		}
	}

	return Storage{
		Disks: storageList,
		Total: utils.FormatCapacity(totalStorage),
	}
}

// detectDiskType determines if a disk is an HDD or SSD.
func detectDiskType(device string) string {
	stats, err := disk.IOCounters()
	if err != nil {
		log.Printf("Error getting disk stats for %s: %v", device, err)
		return "Unknown"
	}

	// Check if the disk is rotational (HDD) or non-rotational (SSD)
	if stat, exists := stats[device]; exists {
		if stat.WeightedIO > 0 {
			return "HDD" // Rotational disk
		}
		return "SSD" // Non-rotational disk
	}

	// Fallback check based on device name
	if isSSD(device) {
		return "SSD"
	}
	return "HDD"
}

// isSSD checks device naming patterns to identify SSDs.
func isSSD(device string) bool {
	return containsAny(device, []string{"nvme", "ssd"})
}

// containsAny checks if a string contains any substrings from a given list.
func containsAny(str string, substrings []string) bool {
	for _, substr := range substrings {
		if strings.Contains(str, substr) {
			return true
		}
	}
	return false
}