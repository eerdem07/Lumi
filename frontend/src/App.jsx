import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./components/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
