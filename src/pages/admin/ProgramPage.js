import React, { useState } from 'react';
import axios from 'axios';
import ProgramForm from '../../components/admin/JS_programForm'; // Sesuaikan path

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null); // Untuk menyimpan program yang dipilih (edit)

  const handleCreateProgram = async (data) => {
    const response = await axios.post(
      'https://express-production-c596.up.railway.app/api/campaigns',
      data
    );
    return response.data;
  };

  const handleUpdateProgram = async (data) => {
    const response = await axios.put(
      `https://express-production-c596.up.railway.app/api/campaigns/${selectedProgram._id}`,
      data
    );
    return response.data;
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

      {/* Daftar Program (Opsional) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Program</h2>
        {/* Tambahkan logika untuk menampilkan daftar program di sini */}
      </div>
    </div>
  );
};

export default ProgramPage;