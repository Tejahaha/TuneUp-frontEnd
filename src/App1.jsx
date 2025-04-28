"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/authentication/signup";
import Login from "./components/authentication/login";
import HarmonyLandingPage from "./Landercomponents/HarmonyLandingPage";
import AppLayout from "./AppLayout";
import HeroGeometric from "./Landercomponents/HeroGeometric";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/" element={<HarmonyLandingPage />} /> */}
          <Route path="/" element={<HeroGeometric />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </Router>
  );
}
