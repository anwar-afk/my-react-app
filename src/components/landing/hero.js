import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import { getCampaigns } from '../../services/campaignService';

// Komponen Hero Pertama
const Hero1 = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-40 py-20 bg-white">
      {/* Image Section dengan animasi fade-in-left */}
      <div className="lg:max-w-lg animate-fade-in-left">
        <img
          src="/image/hero2.png"
          alt="Illustration"
          className="w-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Section dengan animasi fade-in-up */}
      <div className="mt-10 lg:mt-0 lg:max-w-2xl animate-fade-in-up">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 hover:text-green-500 transition-colors duration-300">
          Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor,
          augue nec tincidunt molestie, massa nunc varius arcu, et scelerisque
          elit erat a magna. Donec quis erat at libero ultrices mollis. In hac
          habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi
          facilisis finibus.
        </p>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          Donasi disini
        </button>
      </div>
    </div>
  );
};

// Komponen Summary
const Summary = () => {
  return (
    <div className="bg-green-100 px-10 lg:px-40 py-20 flex flex-col lg:flex-row items-center lg:justify-between">
      {/* Left Section (Text) */}
      <div className="lg:max-w-md mb-10 lg:mb-0">
        <h2 className="text-3xl font-bold text-gray-800">
          Bantu Donasi <br />
          <span className="text-green-500">Yayasan Kami</span>
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          We reached here with our hard work and dedication
        </p>
      </div>

      {/* Right Section (Statistics) */}
      <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
        {/* Donatur Statistic */}
        <div className="flex items-center space-x-4">
          <img
            src="/image/ic-hero3.svg" // Path gambar ikon donatur
            alt="Donatur Icon"
          />
          <div>
            <p className="text-3xl font-bold text-gray-800">2,245,341</p>
            <p className="text-gray-600">Donatur</p>
          </div>
        </div>

        {/* Komunitas Statistic */}
        <div className="flex items-center space-x-4 mt-8 lg:mt-0">
          <img
            src="/image/hand-ic-hero3.svg" // Path gambar ikon komunitas
            alt="Komunitas Icon"
          />
          <div>
            <p className="text-3xl font-bold text-gray-800">46,328</p>
            <p className="text-gray-600">Komunitas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Hero Kedua
const Hero2 = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-40 py-20 bg-white mb-10">
      {/* Text Section */}
      <div className="text-center lg:text-left max-w-lg lg:max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bersama untuk Masa Depan,{' '}
          <span className="text-green-500">ahay.</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Where to grow your business as a photographer: site or social media?
        </p>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          Register
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-10 lg:mt-0 lg:max-w-md">
        <img
          src="/image/hero.png" // Path gambar
          alt="Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

// Komponen Program Kerja dengan Data Campaign
const ProgramKerja = () => {
  const [campaigns, setCampaigns] = useState([]); // State untuk menyimpan data campaign
  const [loading, setLoading] = useState(true); // State untuk menangani loading state
  const [error, setError] = useState(null); // State untuk menangani error

  // Ambil data campaign saat komponen dimuat
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns(); // Panggil service untuk mengambil data campaign

        // Urutkan campaign berdasarkan createdAt (dari yang terbaru ke terlama)
        const sortedCampaigns = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Ambil 3 campaign terbaru
        const latestCampaigns = sortedCampaigns.slice(0, 3);

        setCampaigns(latestCampaigns); // Simpan 3 campaign terbaru ke state
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data campaign'); // Tangani error
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    };

    fetchCampaigns();
  }, []);

  // Tampilkan loading state jika data sedang diambil
  if (loading) {
    return <div>Loading...</div>;
  }

  // Tampilkan error jika terjadi kesalahan
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-10 lg:px-40 py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Program Kerja</h2>
        <p className="text-gray-600 whitespace-normal break-words">
          The Nexcent blog is the best place to read about the latest membership insights,
          trends and more. See who's joining the community, read about how our community 
          are increasing their membership income and lot's more.
        </p>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {campaigns.map((campaign) => (
          <Link
            to={`/donation/${campaign._id}`} // Navigasi ke halaman detail dengan ID campaign
            key={campaign._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{campaign.title}</h3>
              <p className="text-gray-600 mb-4">{campaign.detail}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Target: Rp {campaign.target.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  Terkumpul: Rp {campaign.currentAmount.toLocaleString()}
                </span>
              </div>
              <div className="text-green-500 font-medium hover:underline flex items-center mt-4">
                Readmore <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Komponen Utama yang Menggabungkan Semua Komponen
const HomePage = () => {
  return (
    <div>
      <Hero1 /> {/* Hero Pertama */}
      <Summary /> {/* Summary Section */}
      <Hero2 /> {/* Hero Kedua */}
      <ProgramKerja /> {/* Program Kerja Section dengan Data Campaign */}
    </div>
  );
};

export default HomePage;