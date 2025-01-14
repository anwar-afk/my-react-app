import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../../services/campaignService";

// Komponen Header (Donasi)
export const DonasiHeader = () => {
  const handleScrollToContent = () => {
    const contentSection = document.getElementById("donasi-content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <button
          onClick={handleScrollToContent}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600"
        >
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
  const [showAll, setShowAll] = useState(false); // State untuk kontrol "Lihat Lebih Banyak"
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

  const visibleCampaigns = showAll ? filteredCampaigns : filteredCampaigns.slice(0, 4);

  return (
    <div id="donasi-content" className="px-10 lg:px-40 py-20">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleCampaigns.length > 0 ? (
          visibleCampaigns.map((campaign) => (
            <Link
              to={`/donation/${campaign._id}`}
              key={campaign._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full inline-block mb-2">
                  {campaign.category}
                </span>
                <h3 className="text-md font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                <div className="text-green-500 font-medium hover:underline flex items-center">
                  Lihat Selengkapnya <span className="ml-1">→</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">Tidak ada campaign yang tersedia.</p>
        )}
      </div>
      {/* Button Section */}
      {filteredCampaigns.length > 4 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
          >
            {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Lebih Banyak"}
          </button>
        </div>
      )}
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

export default Donasi;