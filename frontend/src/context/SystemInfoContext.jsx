import { createContext, useContext, useEffect, useState } from "react";
import { GetCpuInfo } from "../../wailsjs/go/services/CPU";
import { GetGraphicsInfo } from "../../wailsjs/go/services/GPU";
import { GetOSInfo } from "../../wailsjs/go/services/OS";
import { GetRamInfo } from "../../wailsjs/go/services/RAM";
import { GetStorageInfo } from "../../wailsjs/go/services/Storage";

const context = createContext();
function SystemInfoProvider({ children }) {
  const [cpuInfo, SetCpuInfo] = useState(null);
  const [ramInfo, SetRamInfo] = useState(null);
  const [storageInfo, SetStorageInfo] = useState(null);
  const [gpuInfo, SetGpuInfo] = useState(null);
  const [osInfo, SetOSInfo] = useState(null);
  useEffect(() => {
    fetchCpu();
    fetchGpu();
    fetchRam();
    fetchStorage();
    fetchOperatingSystem();
  }, []);

  async function fetchCpu() {
    const response = await GetCpuInfo();

    SetCpuInfo(response);
    console.log(response);
  }
  async function fetchRam() {
    const response = await GetRamInfo();
    SetRamInfo(response);
    console.log(response);
  }
  async function fetchStorage() {
    const response = await GetStorageInfo();
    SetStorageInfo(response);
    console.log(response);
  }
  async function fetchGpu() {
    const response = await GetGraphicsInfo();
    SetGpuInfo(response);
    console.log(response);
  }
  async function fetchOperatingSystem() {
    const response = await GetOSInfo();
    SetOSInfo(response);
    console.log(response);
  }
  return (
    <context.Provider
      value={{ cpuInfo, ramInfo, gpuInfo, storageInfo, osInfo }}
    >
      {children}
    </context.Provider>
  );
}
function useSystemInfo() {
  return useContext(context);
}
export { useSystemInfo, SystemInfoProvider };
