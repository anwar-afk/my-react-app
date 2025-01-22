import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dokumentasi = () => {
  const [documentations, setDocumentations] = useState([]); // State untuk menyimpan data dokumentasi
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // Fetch semua data dokumentasi
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const response = await axios.get(
          "https://express-production-fac9.up.railway.app/api/documentations"
        );
        setDocumentations(response.data); // Simpan data ke state
        setLoading(false); // Set loading ke false setelah data diterima
      } catch (err) {
        setError(err.message); // Tangani error
        setLoading(false); // Set loading ke false meskipun ada error
      }
    };

    fetchDocumentations();
  }, []);

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Dokumentasi Page</h1>
      <p className="text-gray-700 mb-6">
        Ini adalah halaman untuk mengelola dokumentasi.
      </p>

      {/* Tombol "Buat Dokumentasi" */}
      <Link
        to="/admin/dokumentasi/buat"
        className="mb-6 inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Buat Dokumentasi
      </Link>

      {/* Tampilkan data dokumentasi */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : documentations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentations.map((doc) => (
            <div key={doc._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tampilkan gambar pertama */}
              {doc.images.length > 0 && (
                <img
                  src={`https://express-production-fac9.up.railway.app${doc.images[0]}`}
                  alt={doc.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Detail dokumentasi */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                <p className="text-sm text-gray-500">
                  Tanggal: {formatDate(doc.date)}
                </p>
                <p className="text-sm text-gray-500">
                  Dibuat pada: {formatDate(doc.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada dokumentasi.</p>
      )}
    </div>
  );
};

export default Dokumentasi;