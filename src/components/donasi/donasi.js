import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from '../../services/campaignService'; // Updated import
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set default icon for Leaflet markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const baseUrl = "http://localhost:5000";

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
  const [selectedCategories, setSelectedCategories] = useState({});
  const [mapInstance, setMapInstance] = useState(null);
  const [markersLayer, setMarkersLayer] = useState(null);
  const mapRef = useRef(null);
  
  const categories = ["bencana alam", "pendidikan", "kesehatan", "kemanusiaan", "lingkungan", "lainnya"];


  // Initialize category checkboxes
  useEffect(() => {
    const initialCategories = categories.reduce((acc, cat) => {
      acc[cat] = true;
      return acc;
    }, {});
    setSelectedCategories(initialCategories);
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        console.log("Raw response:", response);

        if (response.success && Array.isArray(response.campaigns)) {
          console.log("Valid campaigns:", response.campaigns);
          setCampaigns(response.campaigns);
        } else {
          console.error("Invalid response format:", response);
          setError("Format data tidak valid");
          setCampaigns([]);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data campaign");
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  
    // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    console.log("🗺️ Initializing map...");
    
    // Create map instance
    const map = L.map(mapRef.current).setView([-6.200000, 106.816666], 5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Set map instance and create markers layer
    setMapInstance(map);
    setMarkersLayer(L.layerGroup().addTo(map));

    // Force a resize to ensure proper rendering
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    setMapInstance(map);
    setMarkersLayer(L.layerGroup().addTo(map));

    // Force a resize to ensure proper rendering
    map.invalidateSize();

    return () => {
      if (map) {
        map.remove();
        console.log("🗺️ Map cleaned up");
      }
    };
  }, [mapRef.current]); // Add mapRef.current as a dependency

  // Update markers when campaigns or filters change
  useEffect(() => {
    if (!mapInstance || !markersLayer) return;

    markersLayer.clearLayers();

    const filteredCampaigns = campaigns.filter(campaign => {
      const normalizedCategory = campaign.category?.replace(/_/g, ' ');
      return selectedCategories[normalizedCategory];
    });

    filteredCampaigns.forEach(campaign => {
      if (campaign.latitude && campaign.longitude) {
        const marker = L.marker([campaign.latitude, campaign.longitude])
          .bindPopup(`
            <div class="text-center">
              <h3 class="font-bold">${campaign.title}</h3>
              <p class="text-sm">${campaign.category}</p>
              <a href="/donation/${campaign.id}" class="text-green-500 hover:underline">Lihat Detail</a>
            </div>
          `);
        markersLayer.addLayer(marker);
      }
    });
  }, [campaigns, selectedCategories, mapInstance]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredCampaigns = React.useMemo(() => {
    if (!Array.isArray(campaigns)) return [];
    
    return campaigns.filter((campaign) => {
      if (!campaign) return false;
      const normalizedCategory = campaign.category?.replace(/_/g, ' ');
      return selectedCategories[normalizedCategory];
    });
  }, [campaigns, selectedCategories]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!campaigns.length) return <div className="text-center py-10">Tidak ada campaign yang tersedia</div>;

  return (
    <div id="donasi-content" className="px-6 lg:px-40 py-10">
      <h1 className="text-4xl lg:text-5xl font-normal text-green-500 mb-10 mt-20">
        Mari Bantu <span className="font-semibold">Mereka</span>
      </h1>

      {/* Map Section */}
      <div className="mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Lokasi Program</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Filter Kategori:</h3>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories[category]}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-green-500"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div ref={mapRef} style={{ width: '100%', height: '400px' }} className="w-full rounded-lg border border-gray-200" />
        </div>
      </div>

      {/* Campaign Cards Section */}
      <div className="mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Program Donasi</h2>
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns
              .slice(0, showAll ? filteredCampaigns.length : 4)
              .map((campaign) => (
                <CampaignCard key={campaign.id || campaign._id} campaign={campaign} />
              ))}
          </div>
        ) : (
          <div className="text-center py-10">
            Tidak ada campaign dalam kategori ini
          </div>
        )}
      </div>

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
          src={campaign.images?.length > 0 ? `http://localhost:5000${campaign.images[0]}` : "https://via.placeholder.com/300"}
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
