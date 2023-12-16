// Login.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import Footer from "./pages/footer/Footer";
import LoginContent from "./pages/login/Login";

function LoginApp() {
  return (
    <BrowserRouter>
      <NavBar />
      <LoginContent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginContent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// export default LoginApp;
