import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar?');
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-6 lg:px-36 py-4 bg-white border-b border-gray-200 drop-shadow-lg relative z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Yayasan</h1>
          <p className="text-sm text-gray-600">Syakira Mutiara</p>
        </div>
      </div>  

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Navigation Links - Centered */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:justify-center lg:space-x-8 lg:w-auto mt-4 lg:mt-0`}>
        <Link to="/" className="block lg:inline-block text-gray-800 hover:text-green-500 py-2 lg:py-0">
          Home
        </Link>
        <Link to="/donasi" className="block lg:inline-block text-gray-800 hover:text-green-500 py-2 lg:py-0">
          Donasi
        </Link>
        <Link to="/dokumentasi" className="block lg:inline-block text-gray-800 hover:text-green-500 py-2 lg:py-0">
          Dokumentasi
        </Link>
        <Link to="/laporan" className="block lg:inline-block text-gray-800 hover:text-green-500 py-2 lg:py-0">
          Laporan
        </Link>
        <Link to="/tentang" className="block lg:inline-block text-gray-800 hover:text-green-500 py-2 lg:py-0">
          Tentang
        </Link>
      </div>

      {/* Auth Buttons - Right */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:space-x-4 lg:w-auto mt-4 lg:mt-0`}>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-800">{user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              keluar
            </button>
          </div>
        ) : (
          <>
            <Link 
              to="/login"
              className="block lg:inline-block text-green-500 hover:text-green-600 font-medium py-2 lg:py-0"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block lg:inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;