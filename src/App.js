import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/landing/hero';
import Footer from './components/footer';
import DonasiPage from './pages/DonasiPage';
import AboutPage from './pages/AboutPage';
import DokumentasiPage from './pages/DokumentasiPages';
import { useScrollReveal } from './hooks/useScrollReveal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import DonationDetailPage from './components/donasi/detail'; // Import DonationDetailPage

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
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        {!isLoginOrRegister && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donasi" element={<DonasiPage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/dokumentasi" element={<DokumentasiPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/donation/:id" element={<DonationDetailPage />} /> {/* Tambahkan rute ini */}
        </Routes>
        {!isLoginOrRegister && <Footer />}
      </div>
    </AuthProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;