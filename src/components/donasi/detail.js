import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { getCampaigns } from '../../services/campaignService';
import { AuthContext } from '../../context/AuthContext';
import { createDonation } from '../../services/donateService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Base API URL
const baseUrl = 'http://localhost:5000';

const DonationDetailPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [donationError, setDonationError] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Fetch campaign data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCampaigns();
        console.log("✅ Fetched campaigns:", response);
        console.log("🔍 Looking for campaign with ID:", id);

        if (response && response.campaigns && Array.isArray(response.campaigns)) {
          const selectedCampaign = response.campaigns.find(campaign => 
            campaign.id === id || 
            campaign.id === parseInt(id) || 
            campaign.id.toString() === id ||
            campaign._id === id
          );

          if (selectedCampaign) {
            console.log("✅ Found campaign:", selectedCampaign);
            setCampaign(selectedCampaign);
          } else {
            console.log("❌ No campaign found with ID:", id);
            setError("Data campaign tidak ditemukan.");
          }
        } else {
          console.error("🚨 Unexpected response format:", response);
          setError("Format respons tidak sesuai.");
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Initialize map when campaign data is available
  useEffect(() => {
    if (campaign && mapRef.current) {
      // Default coordinates if not set
      const lat = campaign.latitude || -6.200000;
      const lng = campaign.longitude || 106.816666;

      if (!mapInstanceRef.current) {
        console.log("🗺️ Initializing map with coordinates:", { lat, lng });
        
        // Initialize map
        mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 13);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);
        
        // Add marker with popup
        markerRef.current = L.marker([lat, lng])
          .bindPopup(`
            <div class="text-center">
              <h3 class="font-bold">${campaign.title}</h3>
              <p class="text-sm">${campaign.category}</p>
            </div>
          `)
          .addTo(mapInstanceRef.current);

        // Open popup by default
        markerRef.current.openPopup();
        
        // Force a resize after a small delay to ensure proper rendering
        setTimeout(() => {
          mapInstanceRef.current.invalidateSize();
        }, 100);
      }
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [campaign]);

  // Modal handlers and donation submission
  const openModal = () => {
    if (!user) {
      alert("Harap login dulu jika ingin berdonasi.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAmount('');
    setDonationError(null);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setDonationError("Masukkan jumlah donasi yang valid.");
      return;
    }

    try {
      console.log("🔼 Sending donation request:", { campaignId: id, amount: Number(amount) });

      const response = await createDonation(id, Number(amount));

      console.log("✅ Donation response:", response);

      if (response.success && response.paymentUrl) {
        window.location.href = response.paymentUrl; // Redirect to payment page
      } else {
        setDonationError(response.message || "Gagal membuat donasi. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("❌ Error creating donation:", error);
      setDonationError(error.response?.data?.message || "Terjadi kesalahan saat membuat donasi.");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-gray-600">Memuat data campaign...</p>
  </div>;

  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-red-600">{error}</p>
  </div>;

  if (!campaign) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <p className="text-gray-600">Data campaign tidak ditemukan.</p>
  </div>;

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Slider */}
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="rounded-lg shadow-lg"
            >
              {campaign.images?.length > 0 ? (
                campaign.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${baseUrl}${image}`}
                      alt={`Campaign Image ${index + 1}`}
                      className="w-full h-64 lg:h-96 object-contain rounded-lg"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image"
                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* Campaign Details */}
          <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">{campaign.category}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-4">{campaign.title}</h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">{campaign.detail}</p>
            <button onClick={openModal} className="w-full mt-6 px-6 py-3 bg-green-500 text-white text-lg rounded-full shadow-md hover:bg-green-600">
              Donasi Sekarang
            </button>
          </div>
        </div>

        {/* Map Section - Added margin and explicit height */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Lokasi Program</h3>
          <div 
            ref={mapRef}
            className="w-full h-[400px] rounded-lg"
            style={{ minHeight: '400px' }}
          />
        </div>
      </main>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Donasi Sekarang</h2>
            <form onSubmit={handleDonationSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Donasi (Rp)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Masukkan jumlah donasi"
                  required
                />
              </div>
              {donationError && <p className="text-red-500 text-sm mb-4">{donationError}</p>}
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Donasi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default DonationDetailPage;
