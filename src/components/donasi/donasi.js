import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../services/campaignService";

// Komponen Header (Donasi)
export const DonasiHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-60 py-20 bg-green-100">
      {/* Left Section */}
      <div className="lg:max-w-lg text-center lg:text-left mb-10 lg:mb-0">
        <h1 className="text-4xl font-extrabold text-brown-800 mb-6">
          Bersama <br /> Wujudkan Harapan
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Setiap donasi Anda adalah langkah kecil menuju perubahan besar.
          Bergabunglah dengan kami untuk membawa cahaya harapan bagi mereka yang membutuhkan.
        </p>
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600">
          MAKE A DONATION
        </button>
      </div>

      {/* Right Section */}
      <div className="relative">
        {/* Image */}
        <img
          src="/image/child smiling.png" // Ganti dengan path gambar
          alt="Child Smiling"
          className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full"
        />
        <div className="absolute bottom-0 left-0 transform -translate-x-10 translate-y-10">
          <div className="w-20 h-20 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Komponen Konten Donasi (DonasiContent)
export const DonasiContent = () => {
  const [campaigns, setCampaigns] = useState([]); // State untuk menyimpan data campaign
  const [selectedCategory, setSelectedCategory] = useState("all"); // State untuk menyimpan kategori yang dipilih
  const categories = ['bencana_alam', 'pendidikan', 'kesehatan', 'kemanusiaan', 'lingkungan', 'lainnya']; // Daftar kategori

  // Fetch data campaign dari API menggunakan campaign service
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns(); // Menggunakan fungsi getCampaigns dari service
        console.log("Fetched Campaigns:", data); // Periksa data yang di-fetch
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // Filter campaign berdasarkan kategori dan endDate
  const filteredCampaigns = campaigns.filter((campaign) => {
    const isCategoryMatch = selectedCategory === "all" || campaign.category === selectedCategory;
    const isActive = new Date(campaign.endDate) > new Date(); // Cek apakah campaign masih aktif
    return isCategoryMatch && isActive;
  });

  return (
    <div className="px-10 lg:px-40 py-20">
      <h1 className="text-5xl font-normal text-green-500 mb-10 mb-40 mt-20">
        Mari Bantu <span className="font-semibold">Mereka</span>
      </h1>
      {/* Title dan Filter Kategori */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Donasi</h2>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              console.log("Selected Category:", e.target.value); // Periksa nilai yang dipilih
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <Link
              to={`/donation/${campaign._id}`}
              key={campaign._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full inline-block mb-4">
                  {campaign.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{campaign.title}</h3>
                <div className="text-green-500 font-medium hover:underline flex items-center">
                  Lihat Selengkapnya <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">Tidak ada campaign yang tersedia.</p>
        )}
      </div>
      {/* Button Section */}
      <div className="">
        <button className="flex item-center mt-20 mb-20 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
          Lihat Lebih Banyak
        </button>
      </div>
    </div>
  );
};

// Komponen Utama yang Menggabungkan DonasiHeader dan DonasiContent
const Donasi = () => {
  return (
    <div>
      <DonasiHeader /> {/* Tampilkan Header */}
      <DonasiContent /> {/* Tampilkan Konten Donasi */}
    </div>
  );
};

export default Donasi; // Default export untuk komponen utama