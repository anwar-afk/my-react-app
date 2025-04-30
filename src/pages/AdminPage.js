import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/admin/sidebar/sidebar';
import Dashboard from '../components/admin/dashboard/dashboard';
import ProgramPage from '../components/admin/program/program';
import DokumentasiPage from '../components/admin/dokumentasi/dokumentasi';
import BuatDokumentasiPage from '../components/admin/dokumentasi/buatDokumentasi';
import KeuanganPage from '../components/admin/keuangan/KeuanganPage';
import CampaignStatisticDetail from '../components/admin/keuangan/CampaignStatisticDetail';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  
  // Default profile image if user doesn't have one
  const profileImage = user?.profileImage || '/image/default-avatar.png';
  const adminName = user?.name || 'Admin';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-green-300 shadow-sm p-4 flex justify-end items-center pb-6">
          <div className="flex items-center">
            <span className="mr-3 text-gray-700">Admin, {adminName}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="program" element={<ProgramPage />} />
            <Route path="dokumentasi" element={<DokumentasiPage />} />
            <Route path="dokumentasi/buat" element={<BuatDokumentasiPage />} />
            <Route path="keuangan" element={<KeuanganPage />} />
            <Route path="keuangan/detail/:id" element={<CampaignStatisticDetail />} />
            <Route index element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;