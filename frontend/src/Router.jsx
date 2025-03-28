import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Preloader from "./ui/Preloader";
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Summary = lazy(() => import("./pages/Summary"));
const Camera = lazy(() => import("./pages/Camera"));
const Battery = lazy(() => import("./pages/Battery"));
const Keyboard = lazy(() => import("./pages/Keyboard"));
const Sound = lazy(() => import("./pages/Sound"));

export default function Router() {
  return (
    <Suspense fallback={<Preloader />}>
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
    </Suspense>
  );
}
