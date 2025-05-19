import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";

const DokumentasiPage = () => {
  const [dokumentasi, setDokumentasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000";

  const fetchDokumentasi = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/documentations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDokumentasi(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dokumentasi:", error);
      setError("Gagal memuat data dokumentasi");
      setLoading(false);
    }
  }, [token, baseUrl]);

  useEffect(() => {
    fetchDokumentasi();
  }, [fetchDokumentasi]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Dokumentasi ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseUrl}/api/documentations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Dihapus!", "Dokumentasi berhasil dihapus.", "success");
        fetchDokumentasi();
      } catch (error) {
        console.error("Error deleting dokumentasi:", error);
        Swal.fire("Gagal!", "Gagal menghapus dokumentasi.", "error");
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSuccessNotification = () => {
    showNotification("Dokumentasi berhasil dibuat!", "success");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 250 },
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await axios.post(`${baseUrl}/api/documentations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      handleSuccessNotification();
      fetchDokumentasi();
      handleModalClose();
    } catch (err) {
      setError("Gagal membuat dokumentasi.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <animated.div style={fadeIn} className="flex-1 p-8 bg-gray-100">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-2xl font-bold mb-2">Dokumentasi Kegiatan</h1>
        <button
          onClick={handleModalOpen}
          className="px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors"
        >
          + Buat Dokumentasi
        </button>
      </div>

      {notification && (
        <div
          className={`mb-4 p-3 rounded-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Buat Dokumentasi Baru</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
              <div className="mb-6">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Simpan Dokumentasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dokumentasi.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative aspect-video">
              {doc.images && doc.images.length > 0 && (
                <img
                  src={`${baseUrl}${doc.images[0]}`}
                  alt={doc.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-600">
                Tanggal: {formatDate(doc.date)}
              </p>
              {doc.images && doc.images.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {doc.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={`${baseUrl}${image}`}
                      alt={`${doc.title} - ${index + 2}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {dokumentasi.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            Belum ada dokumentasi yang dibuat
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default DokumentasiPage;
