import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from '../../services/campaignService'; // Updated import
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const baseUrl = "http://localhost:8000";

export const DonasiHeader = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const headerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(-50px)",
  });

  const handleScrollToContent = () => {
    document.getElementById("donasi-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <animated.div ref={ref} style={headerAnimation} className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-60 py-10 bg-green-100">
      <div className="lg:max-w-lg text-center lg:text-left mb-10 lg:mb-0">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-brown-800 mb-6">Bersama <br /> Wujudkan Harapan</h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">Setiap donasi Anda adalah langkah kecil menuju perubahan besar.</p>
        <button onClick={handleScrollToContent} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600">
          MAKE A DONATION
        </button>
      </div>
      <div className="relative">
        <img src="/image/child smiling.png" alt="Child Smiling" className="w-64 h-64 lg:w-96 lg:h-96 object-cover rounded-full" />
      </div>
    </animated.div>
  );
};

export const DonasiContent = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ["bencana alam", "pendidikan", "kesehatan", "kemanusiaan", "lingkungan", "lainnya"];

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        console.log("Fetched data:", response); // ✅ Debugging: Show API response

        // Ensure campaigns exist and are an array
        if (response && response.campaigns && Array.isArray(response.campaigns)) {
          // Don't limit to 3 campaigns for the donation page
          setCampaigns(response.campaigns);
        } else {
          console.error("Unexpected response format:", response);
          setCampaigns([]); // Avoid crashes by setting an empty array
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) =>
    (selectedCategory === "all" || campaign.category === selectedCategory) &&
    new Date(campaign.endDate) > new Date()
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div id="donasi-content" className="px-6 lg:px-40 py-10">
      <h1 className="text-4xl lg:text-5xl font-normal text-green-500 mb-10 mt-20">
        Mari Bantu <span className="font-semibold">Mereka</span>
      </h1>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Donasi</h2>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCampaigns.slice(0, showAll ? filteredCampaigns.length : 4).map((campaign) => (
        // ✅ Use `id` instead of `_id`
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
      {filteredCampaigns.length > 4 && (
        <div className="flex justify-center mt-10">
          <button onClick={() => setShowAll(!showAll)} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
            {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Lebih Banyak"}
          </button>
        </div>
      )}
    </div>
  );
};

const CampaignCard = ({ campaign }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const cardAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
  });

  return (
    <animated.div ref={ref} style={cardAnimation} className="w-full">
      <Link
        to={`/donation/${campaign.id}`} // ✅ Use `id` instead of `_id`
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full block"
      >
        <img
          src={campaign.images?.length > 0 ? `https://api2donation.syakiramutiara.my.id/${campaign.images[0]}` : "https://via.placeholder.com/300"}
          alt={campaign.title}
          className="w-full h-48 object-contain rounded-t-lg"
        />
        <div className="p-4">
          <span className="text-sm bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full inline-block mb-3">
            {campaign.category}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{campaign.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {campaign.detail || "Deskripsi tidak tersedia."} {/* ✅ Fix: Use `detail` instead of `description` */}
          </p>
          <div className="text-green-500 font-medium hover:underline flex items-center">
            Lihat Selengkapnya <span className="ml-1">→</span>
          </div>
        </div>
      </Link>
    </animated.div>
  );
};

const Donasi = () => (
  <div>
    <DonasiHeader />
    <DonasiContent />
  </div>
);

export default Donasi;
