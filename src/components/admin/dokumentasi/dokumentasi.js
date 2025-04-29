import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DokumentasiPage = () => {
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch all documentation data
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const response = await axios.get(
          "https://api2donation.syakiramutiara.my.id/api/documentations"
        );
        setDocumentations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Delete documentation function
  const handleDeleteDocumentation = async (documentationId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dokumentasi ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://api2donation.syakiramutiara.my.id/api/documentations/${documentationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Update state by removing the deleted documentation
        setDocumentations(documentations.filter(doc => doc._id !== documentationId));
        
        // Show success notification
        showNotification("Dokumentasi berhasil dihapus!", "success");
      } catch (err) {
        console.error("Error deleting documentation:", err);
        showNotification("Gagal menghapus dokumentasi.", "error");
      }
    }
  };

  // Show notification function
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dokumentasi</h1>

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

      {/* Create Documentation Button */}
      <Link
        to="/admin/dokumentasi/buat"
        className="mb-6 inline-block px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors"
      >
        + Buat Dokumentasi
      </Link>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentations.map((doc) => (
            <div key={doc._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Documentation Image */}
              {doc.images && doc.images.length > 0 && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://api2donation.syakiramutiara.my.id${doc.images[0]}`}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Documentation Details */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{doc.title}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Tanggal: {formatDate(doc.date)}</p>
                  <p>Dibuat pada: {formatDate(doc.createdAt)}</p>
                </div>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteDocumentation(doc._id)}
                  className="px-4 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DokumentasiPage;