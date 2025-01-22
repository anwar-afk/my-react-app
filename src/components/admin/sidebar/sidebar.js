import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; // Sesuaikan path sesuai struktur folder

const Sidebar = () => {
  const { logout } = useContext(AuthContext); // Ambil fungsi logout dari AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Panggil fungsi logout
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul className="flex-1">
        <li className="mb-3">
          <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/program" className="block p-2 hover:bg-gray-700 rounded">
            Program
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/dokumentasi" className="block p-2 hover:bg-gray-700 rounded">
            Dokumentasi
          </Link>
        </li>
      </ul>
      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;