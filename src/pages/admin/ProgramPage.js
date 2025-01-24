import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramForm from '../../components/admin/JS_programForm'; // Sesuaikan path

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null); // Untuk menyimpan program yang dipilih (edit)
  const [campaigns, setCampaigns] = useState([]); // Untuk menyimpan data campaigns

  // Ambil token dari localStorage
  const token = localStorage.getItem('token');

  // Base URL API
  const baseUrl = 'https://express-production-fac9.up.railway.app';

  // Fungsi untuk mengambil data campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/campaigns`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        }
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  // Ambil data campaigns saat komponen pertama kali di-render
  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Fungsi untuk membuat program baru
  const handleCreateProgram = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/campaigns`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        }
      );
      fetchCampaigns(); // Refresh data campaigns setelah membuat program baru
      return response.data;
    } catch (error) {
      console.error('Error creating program:', error);
      throw error;
    }
  };

  // Fungsi untuk mengedit program
  const handleUpdateProgram = async (data) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/campaigns/${selectedProgram._id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        }
      );
      fetchCampaigns(); // Refresh data campaigns setelah mengedit program
      return response.data;
    } catch (error) {
      console.error('Error updating program:', error);
      throw error;
    }
  };

  // Fungsi untuk menghapus program
  const handleDeleteProgram = async (campaignId) => {
    try {
      await axios.delete(
        `${baseUrl}/api/campaigns/${campaignId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        }
      );
      fetchCampaigns(); // Refresh data campaigns setelah menghapus program
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Program Admin</h1>

      {/* Form Buat/Edit Program */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {selectedProgram ? 'Edit Program' : 'Buat Program Baru'}
        </h2>
        <ProgramForm
          programData={selectedProgram} // Kirim data program jika sedang edit
          onSubmit={selectedProgram ? handleUpdateProgram : handleCreateProgram} // Pilih fungsi create atau update
        />
      </div>

      {/* Daftar Program */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Program</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Images</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td className="py-2 px-4 border-b">{campaign.title}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    {campaign.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${baseUrl}${image}`} // Gabungkan base URL dengan path gambar
                        alt={`Campaign Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{new Date(campaign.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => setSelectedProgram(campaign)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(campaign._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramPage;