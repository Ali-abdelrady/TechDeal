package utils

import (
	"fmt"
	"math"
)

var (
	GB = math.Pow(1024, 3) // 1 GB in bytes
	TB = math.Pow(1024, 4) // 1 TB in bytes
)

func FormatCapacity(capacity float64) string {
	if capacity >= TB {
		return fmt.Sprintf("%.2f TB", math.Ceil(capacity/TB) )
	}
	return fmt.Sprintf("%.2f GB",  math.Ceil(capacity/GB))
}
