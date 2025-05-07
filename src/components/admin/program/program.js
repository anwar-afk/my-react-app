import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProgramForm from "../JS_programForm";
import { useSpring, animated } from "@react-spring/web";

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000";

  const fetchCampaigns = async () => {
    try {
      const url = `${baseUrl}/api/campaigns`;
      console.log("Fetching campaigns from:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Campaigns response:", response.data);

      if (response.data && Array.isArray(response.data.campaigns)) {
        setCampaigns(response.data.campaigns);
      } else {
        console.error("Unexpected response format:", response.data);
        setCampaigns([]);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setCampaigns([]);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateProgram = async (data) => {
    try {
      const url = `${baseUrl}/api/campaigns`;
      console.log("Creating program at:", url);
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCampaigns();
      showNotification("Program berhasil dibuat!", "success");
      setModalIsOpen(false);
      return response.data;
    } catch (error) {
      console.error("Error creating program:", error);
      showNotification("Gagal membuat program.", "error");
      throw error;
    }
  };

  const handleUpdateProgram = async (data) => {
    try {
      const url = `${baseUrl}/api/campaigns/${selectedProgram.id}`;
      console.log("Updating program at:", url);
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCampaigns();
      setSelectedProgram(null);
      setModalIsOpen(false);
      showNotification("Program berhasil diperbarui!", "success");
      return response.data;
    } catch (error) {
      console.error("Error updating program:", error);
      showNotification("Gagal memperbarui program.", "error");
      throw error;
    }
  };

  const handleDeleteProgram = async (campaignId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      try {
        const url = `${baseUrl}/api/campaigns/${campaignId}`;
        console.log("Deleting program at:", url);

        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        fetchCampaigns();
        showNotification("Program berhasil dihapus!", "success");
      } catch (error) {
        console.error("Error deleting program:", error);
        showNotification("Gagal menghapus program.", "error");
      }
    }
  };

  const handleEditProgram = async (campaign) => {
    try {
      const url = `${baseUrl}/api/campaigns/${campaign.id}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSelectedProgram({
          ...campaign,
          ...response.data,
        });
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching program details:", error);
      showNotification("Gagal mengambil detail program.", "error");
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
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (formData) => {
    if (selectedProgram) {
      handleUpdateProgram(formData);
    } else {
      handleCreateProgram(formData);
    }
  };

  const handleCancel = () => {
    setModalIsOpen(false);
    setSelectedProgram(null);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn}>
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Daftar Program
        </h1>

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

        <button
          onClick={() => {
            setSelectedProgram(null);
            setModalIsOpen(true);
          }}
          className="mb-6 px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors"
        >
          + Buat Program Baru
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-50 p-4 border-b">
            <div className="font-medium text-gray-700">Nama Program</div>
            <div className="font-medium text-gray-700">Gambar</div>
            <div className="font-medium text-gray-700">Kategori</div>
            <div className="font-medium text-gray-700">Target</div>
            <div className="font-medium text-gray-700">Periode</div>
            <div className="font-medium text-gray-700">Aksi</div>
          </div>

          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="grid grid-cols-6 p-4 border-b hover:bg-gray-50"
              >
                <div className="text-gray-800 flex items-center">
                  {campaign.title}
                </div>
                <div className="flex items-center">
                  {campaign.images && campaign.images.length > 0 && (
                    <img
                      src={`${baseUrl}${campaign.images[0]}`}
                      alt={campaign.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
                <div className="text-gray-600 flex items-center">
                  {campaign.category || "-"}
                </div>
                <div className="text-gray-600 flex items-center">
                  {formatCurrency(campaign.target)}
                </div>
                <div className="text-gray-600 flex items-center">
                  {formatDate(campaign.startDate)} -{" "}
                  {formatDate(campaign.endDate)}
                </div>
                <div className="flex space-x-2 items-center">
                  <button
                    onClick={() => handleEditProgram(campaign)}
                    className="px-3 py-1 bg-yellow-100 text-gray-800 rounded hover:bg-yellow-200 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(campaign.id)}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Belum ada program yang dibuat
            </div>
          )}
        </div>

        {modalIsOpen && (
          <ProgramForm
            programData={selectedProgram}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </animated.div>
  );
};

export default ProgramPage;
