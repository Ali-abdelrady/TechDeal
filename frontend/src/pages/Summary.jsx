import {
  Cpu,
  Database,
  Maximize,
  MemoryStick,
  Monitor,
  MonitorCog,
  Pointer,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import styles from "../css/Summary.module.css";
import { useSystemInfo } from "../context/SystemInfoContext";

export default function Summary() {
  const { cpuInfo, ramInfo, gpuInfo, storageInfo, osInfo, windowsActivation } =
    useSystemInfo();

  const infoData = [
    {
      icon: <Monitor />,
      title: "Device Info",
      value: ` Model Name: ${osInfo?.modelName || "Loading..."} \n os: ${
        osInfo?.os || "Loading..."
      }`,
    },
    { icon: <Cpu />, title: "CPU", value: cpuInfo?.name },
    {
      icon: <MemoryStick />,
      title: "RAM",
      value: `${ramInfo?.size || "Loading"} - ${
        ramInfo?.slots || "Loading"
      } Slots`,
    },
    {
      icon: <MonitorCog />,
      title: "GPU",
      value: gpuInfo?.cards?.map((card) => card).join("\n"),
    },
    {
      icon: <Database />,
      title: "Storage",
      value: `${storageInfo?.disks
        ?.map((disk) => `${disk.size} ${disk.type}`)
        .join("\n")}
        Total:${storageInfo?.total}`,
    },
    {
      icon: <ShieldCheck />,
      title: "Windows Activation",
      value: !windowsActivation
        ? "Loading..."
        : windowsActivation.isActivated
        ? "Activated"
        : "Not Activated",
    },
    { icon: <Maximize />, title: "Resolution", value: gpuInfo?.resolution },
  ];
  function handleRefreshButton() {
    window.location.reload();
  }
  return (
    <div className={styles.summary}>
      <div className="container">
        <div className={styles.topSection}>
          <h1>Summary </h1>
          <button onClick={handleRefreshButton}>
            Refresh <RotateCcw />{" "}
          </button>
        </div>
        <div className={styles.boxes}>
          {infoData.map(({ icon, title, value }, index) => (
            <InfoBox key={index} icon={icon} title={title}>
              {value ? (
                value.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))
              ) : (
                <Loader />
              )}
            </InfoBox>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon, title, children }) {
  return (
    <div className={styles.infoBox}>
      <h3>
        {icon} {title}
      </h3>
      <p>{children}</p>
    </div>
  );
}

function Loader() {
  return <span>Loading...</span>;
}
