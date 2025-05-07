import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="bg-green-200 text-gray-800 w-64 min-h-screen flex flex-col">
      <div className="p-4 flex items-center space-x-2">
        <img src="/android-chrome-512x512.png" alt="Logo" className="w-10 h-10" />
        <div>
          <h1 className="text-lg font-bold">Yayasan</h1>
          <p className="text-sm">Syakira Mutiara</p>
        </div>
      </div>
      
      <ul className="bg-white flex-1 p-4">
        <li className="mb-2">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/dashboard') 
                ? 'bg-gray-100 text-gray-800 shadow-md' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link 
            to="/admin/program" 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/program') 
                ? 'bg-gray-100 text-gray-800 shadow-md' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Program
          </Link>
        </li>
        <li className="mb-2">
          <Link 
            to="/admin/dokumentasi" 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/dokumentasi') 
                ? 'bg-gray-100 text-gray-800 shadow-md' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Dokumentasi
          </Link>
        </li>
        <li className="mb-2">
          <Link 
            to="/admin/keuangan" 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isActive('/admin/keuangan') 
                ? 'bg-gray-100 text-gray-800 shadow-md' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Keuangan
          </Link>
        </li>
      </ul>
      
      <div className="bg-white p-4">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-yellow-100 text-gray-800 rounded-lg hover:bg-yellow-200 transition-colors"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;