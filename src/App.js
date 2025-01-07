import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/landing/hero';
import ProgramKerja from './components/landing/ProgramKerja';
import Hero2 from './components/landing/hero2';
import Hero3 from './components/landing/hero3';


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Hero2 />
      <Hero3 />
      <ProgramKerja />
    </div>
  );
}

export default App;
