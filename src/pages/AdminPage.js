import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/admin/sidebar';
import Dashboard from '../components/admin/dashboard';
import ProgramPage from './admin/ProgramPage'; // Impor ProgramPage
import DokumentasiPage from './admin/DokumentasiPage'; // Impor DokumentasiPage

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="program" element={<ProgramPage />} /> {/* Gunakan ProgramPage */}
          <Route path="dokumentasi" element={<DokumentasiPage />} /> {/* Gunakan DokumentasiPage */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;