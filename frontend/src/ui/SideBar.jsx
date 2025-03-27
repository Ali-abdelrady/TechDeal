import { NavLink } from "react-router-dom";
import { OpenDeviceManager } from "../../wailsjs/go/services/System";
import {
  Camera,
  NotebookText,
  Speaker,
  Keyboard,
  Laptop,
  BatteryCharging,
} from "lucide-react";

const links = [
  {
    icon: <NotebookText />,
    text: "Summary",
    path: "/",
  },
  {
    icon: <Keyboard />,
    text: "Keyboard",
    path: "/keyboard",
  },
  {
    icon: <Speaker />,
    text: "sound",
    path: "/sound",
  },
  {
    icon: <Camera />,
    text: "camera",
    path: "/camera",
  },
  {
    icon: <BatteryCharging />,
    text: "Battery Report",
    path: "/battery",
  },
  {
    icon: <Laptop />,
    text: "device manger",
    path: "",
    onclick: async () => {
      try {
        await OpenDeviceManager();
      } catch (error) {
        console.error("Failed to open Device Manager:", error);
      }
    },
  },
];
export default function SideBar() {
  return (
    <aside>
      <Logo />
      <NavLinks data={links} />
    </aside>
  );
}
function Logo() {
  return (
    <div className="logo">
      <img src="/src/assets/images/logo.png" alt="logo" />
    </div>
  );
}

function NavLinks({ data }) {
  return (
    <div className="sidebar-links">
      <ul>
        {data.map((item, index) => {
          const isExternal = item.path.startsWith("http");
          console.log(isExternal);
          return (
            <li key={index}>
              {item.path != "" || isExternal ? (
                <NavLink to={item.path ? item.path : ""} className={"link"}>
                  {item.icon}
                  {item.text}
                </NavLink>
              ) : (
                <a className={"link"} onClick={item.onclick}>
                  {item.icon}
                  {item.text}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
