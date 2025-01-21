import React, { useState } from 'react';
import axios from 'axios';

const ProgramForm = ({ programData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: programData?.title || '',
    detail: programData?.detail || '',
    category: programData?.category || '',
    startDate: programData?.startDate || '',
    endDate: programData?.endDate || '',
    target: programData?.target || '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('detail', formData.detail);
    data.append('category', formData.category);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    data.append('target', formData.target);

    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      await onSubmit(data); // Kirim data ke fungsi onSubmit (create atau update)
      alert('Program berhasil disimpan!');
      setFormData({
        title: '',
        detail: '',
        category: '',
        startDate: '',
        endDate: '',
        target: '',
        images: [],
      });
    } catch (err) {
      setError('Gagal menyimpan program. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Judul Program:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detail Program:
        </label>
        <textarea
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori:
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tanggal Mulai:
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tanggal Berakhir:
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Donasi:
        </label>
        <input
          type="number"
          name="target"
          value={formData.target}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Gambar:
        </label>
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          multiple
          required={!programData} // Hanya wajib diisi saat membuat program baru
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Menyimpan Program...' : 'Simpan Program'}
      </button>
    </form>
  );
};

export default ProgramForm;