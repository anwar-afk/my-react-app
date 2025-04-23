import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/admin/sidebar/sidebar';
import Dashboard from '../components/admin/dashboard/dashboard';
import ProgramPage from '../components/admin/program/program'; // Updated import
import DokumentasiPage from '../components/admin/dokumentasi/dokumentasi'; // Updated import
import BuatDokumentasiPage from '../components/admin/dokumentasi/buatDokumentasi'; // Updated import

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="program" element={<ProgramPage />} />
          <Route path="dokumentasi" element={<DokumentasiPage />} />
          <Route path="dokumentasi/buat" element={<BuatDokumentasiPage />} />
          <Route index element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;