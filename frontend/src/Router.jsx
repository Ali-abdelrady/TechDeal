import React from "react";
import AppLayout from "./ui/AppLayout";
import Summary from "./pages/Summary";
import Camera from "./pages/Camera";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Battery from "./pages/Battery";
import Keyboard from "./pages/Keyboard";
import Sound from "./pages/Sound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<Summary />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/battery" element={<Battery />} />
          <Route path="/keyboard" element={<Keyboard />} />
          <Route path="/sound" element={<Sound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
