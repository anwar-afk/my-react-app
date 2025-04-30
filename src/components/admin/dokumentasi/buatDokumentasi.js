import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuatDokumentasiPage = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || images.length === 0) {
      setError("Judul, tanggal, dan gambar harus diisi.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      images.forEach((image) => {
        formData.append("images", image);
      });

      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/documentations",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/dokumentasi");
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat membuat dokumentasi.");
      console.error("Error creating documentation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Buat Dokumentasi Baru</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Dokumentasi
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kegiatan
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Dokumentasi
            </label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              accept="image/*"
              multiple
              required
            />
            
            {/* Image Preview */}
            {imagePreview.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imagePreview.map((src, index) => (
                  <img 
                    key={index} 
                    src={src} 
                    alt={`Preview ${index}`} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/admin/dokumentasi")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Dokumentasi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuatDokumentasiPage;