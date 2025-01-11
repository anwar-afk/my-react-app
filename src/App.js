import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/landing/hero';
import ProgramKerja from './components/landing/ProgramKerja';
import Hero2 from './components/landing/hero2';
import Hero3 from './components/landing/hero3';
import Footer from './components/footer';
import DonasiPage from './pages/DonasiPage';
import AboutPage from './pages/AboutPage';
import DokumentasiPage from './pages/DokumentasiPages';
import { useScrollReveal } from './hooks/useScrollReveal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

// Komponen Home terpisah
const Home = () => {
  return (
    <>
      <div className="scroll-reveal" ref={useScrollReveal()}>
        <Hero />
      </div>
      <div className="scroll-reveal" ref={useScrollReveal()}>
        <Hero2 />
      </div>
      <div className="scroll-reveal" ref={useScrollReveal()}>
        <Hero3 />
      </div>
      <div className="scroll-reveal" ref={useScrollReveal()}>
        <ProgramKerja />
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donasi" element={<DonasiPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/dokumentasi" element={<DokumentasiPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
