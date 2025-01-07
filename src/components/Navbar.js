import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-36 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.svg" // Ganti dengan path logo Anda
          alt="Yayasan Pelita Ilmu"
          className="h-8 w-8"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-800">Yayasan</h1>
          <p className="text-sm text-gray-600">Pelita Ilmu</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <a href="#home" className="text-gray-800 hover:text-green-500">
          Home
        </a>
        <a href="#donasi" className="text-gray-800 hover:text-green-500">
          Donasi
        </a>
        <a href="#dokumentasi" className="text-gray-800 hover:text-green-500">
          Dokumentasi
        </a>
        <a href="#laporan" className="text-gray-800 hover:text-green-500">
          Laporan
        </a>
        <a href="#faq" className="text-gray-800 hover:text-green-500">
          Faq
        </a>
        <a href="#tentang" className="text-gray-800 hover:text-green-500">
          Tentang
        </a>
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-green-500 hover:text-green-700">Login</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
