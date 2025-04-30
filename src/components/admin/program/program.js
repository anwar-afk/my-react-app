import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProgramForm from '../JS_programForm';

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem('token');
  const baseUrl = 'https://api2donation.syakiramutiara.my.id';

  const fetchCampaigns = async () => {
    try {
      const url = `${baseUrl}/api/campaigns`;
      console.log('Fetching campaigns from:', url);
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Campaigns response:', response.data);
      
      // Pastikan mengambil array `campaigns` dari response API
      if (response.data && Array.isArray(response.data.campaigns)) {
        setCampaigns(response.data.campaigns);
      } else {
        console.error('Unexpected response format:', response.data);
        setCampaigns([]); // Set ke array kosong untuk menghindari error
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]); // Set ke array kosong jika terjadi error
    }
  };
  
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateProgram = async (data) => {
    try {
      const url = `${baseUrl}/api/campaigns`;
      console.log('Creating program at:', url);
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCampaigns();
      showNotification('Program berhasil dibuat!', 'success');
      setModalIsOpen(false);
      return response.data;
    } catch (error) {
      console.error('Error creating program:', error);
      showNotification('Gagal membuat program.', 'error');
      throw error;
    }
  };

  const handleUpdateProgram = async (data) => {
    try {
      const url = `${baseUrl}/api/campaigns/${selectedProgram._id}`;
      console.log('Updating program at:', url);
      const response = await axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCampaigns();
      setSelectedProgram(null);
      setModalIsOpen(false);
      showNotification('Program berhasil diperbarui!', 'success');
      return response.data;
    } catch (error) {
      console.error('Error updating program:', error);
      showNotification('Gagal memperbarui program.', 'error');
      throw error;
    }
  };

  const handleDeleteProgram = async (campaignId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      try {
        const url = `${baseUrl}/api/campaigns/${campaignId}`;
        console.log('Deleting program at:', url);
    
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        fetchCampaigns();
        showNotification('Program berhasil dihapus!', 'success');
      } catch (error) {
        console.error('Error deleting program:', error);
        showNotification('Gagal menghapus program.', 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmit = (formData) => {
    if (selectedProgram) {
      handleUpdateProgram(formData);
    } else {
      handleCreateProgram(formData);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Program</h1>

      {/* Notification */}
      {notification && (
        <div
          className={`mb-4 p-3 rounded-md ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Create Program Button */}
      <button
        onClick={() => {
          setSelectedProgram(null);
          setModalIsOpen(true);
        }}
        className="mb-6 px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors"
      >
        + Buat Program Baru
      </button>

      {/* Program Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-white p-4 border-b">
          <div className="font-medium text-gray-700">Nama Program</div>
          <div className="font-medium text-gray-700">Gambar</div>
          <div className="font-medium text-gray-700">Waktu</div>
          <div className="font-medium text-gray-700">Aksi</div>
        </div>

        {/* Table Body */}
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id} className="grid grid-cols-4 p-4 border-b hover:bg-gray-50">
              <div className="text-gray-800">
                {campaign.title}
              </div>
              <div>
                {campaign.images && campaign.images.length > 0 && (
                  <img
                    src={`${baseUrl}${campaign.images[0]}`}
                    alt={campaign.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="text-gray-600">
                {campaign.startDate && campaign.endDate 
                  ? `${formatDate(campaign.startDate)}-${formatDate(campaign.endDate)}`
                  : 'Tanggal tidak tersedia'}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedProgram(campaign);
                    setModalIsOpen(true);
                  }}
                  className="min-w-[100px] px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProgram(campaign._id)}
                  className="min-w-[100px] px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 transition-colors text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Tidak ada program yang tersedia.</div>
        )}
      </div>

      {/* Modal for Create/Edit Program */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedProgram ? 'Edit Program' : 'Buat Program Baru'}
            </h2>
            <ProgramForm
              programData={selectedProgram}
              onSubmit={handleSubmit}
              onCancel={() => {
                setModalIsOpen(false);
                setSelectedProgram(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPage;
