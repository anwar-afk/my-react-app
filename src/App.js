import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/landing/hero";
import Footer from "./components/footer";
import DonasiPage from "./pages/DonasiPage";
import AboutPage from "./pages/AboutPage";
import DokumentasiPage from "./pages/DokumentasiPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LaporanPage from "./pages/LaporanPage";
import DonationDetailPage from "./components/donasi/detail";
import AdminPage from "./pages/AdminPage"; // Import halaman admin
import { AuthContext } from "./context/AuthContext";
import { useScrollReveal } from "./hooks/useScrollReveal";
import RoleMiddleware from "./middleware/RoleMiddleware"; // Import RoleMiddleware

// Komponen Home terpisah
const Home = () => {
  return (
    <>
      <div className="scroll-reveal" ref={useScrollReveal()}>
        <Hero />
      </div>
    </>
  );
};

function App() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === "/login" || location.pathname === "/register";
  const isAdmin = location.pathname.startsWith("/admin"); // Cek apakah route adalah /admin
  const { updateLastInteraction } = useContext(AuthContext);

  useEffect(() => {
    const handleUserInteraction = () => {
      updateLastInteraction();
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);
    window.addEventListener("keypress", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("keypress", handleUserInteraction);
    };
  }, [updateLastInteraction]);

  return (
    <div className="min-h-screen bg-white">
      {/* Tampilkan Navbar hanya jika bukan halaman login, register, atau admin */}
      {!isLoginOrRegister && !isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donasi" element={<DonasiPage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/dokumentasi" element={<DokumentasiPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/donation/:id" element={<DonationDetailPage />} />
        <Route
          path="/admin/*" // Gunakan /* untuk menangani semua route di bawah /admin
          element={
            <RoleMiddleware requiredRole="admin">
              <AdminPage />
            </RoleMiddleware>
          }
        />
      </Routes>

      {/* Tampilkan Footer hanya jika bukan halaman login, register, atau admin */}
      {!isLoginOrRegister && !isAdmin && <Footer />}
    </div>
  );
}

export default App;