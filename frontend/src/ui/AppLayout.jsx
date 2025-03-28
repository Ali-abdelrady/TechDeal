import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <>
      <div className="layout">
        <SideBar />
        <main>
          <Outlet />
        </main>
        <footer>
          © 2025 TechDeal V2. This software is created by Omar Abderlady. All
          rights reserved
        </footer>
      </div>
    </>
  );
}
