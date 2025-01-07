import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/landing/hero';
import ProgramKerja from './components/landing/ProgramKerja';
import Hero2 from './components/landing/hero2';
import Hero3 from './components/landing/hero3';
import Footer from './components/footer';


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Hero2 />
      <Hero3 />
      <ProgramKerja />
      <Footer />
    </div>
  );
}

export default App;
