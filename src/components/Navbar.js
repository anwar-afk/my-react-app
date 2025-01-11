import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 lg:px-36 py-4 bg-white border-b border-gray-200 drop-shadow-lg relative z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="Yayasan Pelita Ilmu"
          className="h-8 w-8"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-800">Yayasan</h1>
          <p className="text-sm text-gray-600">Pelita Ilmu</p>
        </div>
      </div>

      {/* Navigation Links - Centered */}
      <div className="flex items-center justify-center flex-1 space-x-8">
        <Link to="/" className="text-gray-800 hover:text-green-500">
          Home
        </Link>
        <Link to="/donasi" className="text-gray-800 hover:text-green-500">
          Donasi
        </Link>
        <Link to="/dokumentasi" className="text-gray-800 hover:text-green-500">
          Dokumentasi
        </Link>
        <Link to="/laporan" className="text-gray-800 hover:text-green-500">
          Laporan
        </Link>
        <Link to="/faq" className="text-gray-800 hover:text-green-500">
          Faq
        </Link>
        <Link to="/tentang" className="text-gray-800 hover:text-green-500">
          Tentang
        </Link>
      </div>

      {/* Auth Buttons - Right */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/login"
          className="text-green-500 hover:text-green-600 font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
