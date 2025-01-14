import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { getCampaigns } from '../../services/campaignService';
import { AuthContext } from '../../context/AuthContext';

const DonationDetailPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const { user } = useContext(AuthContext);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaigns();
        const selectedCampaign = data.find((campaign) => campaign._id === id);
        if (selectedCampaign) {
          setCampaign(selectedCampaign);
        } else {
          setError("Data campaign tidak ditemukan.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Gagal memuat data campaign.");
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Memuat data campaign...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Data campaign tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={campaign.image}
              alt="Donation Detail"
              className="rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-500"
            />
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md">
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {campaign.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">{campaign.title}</h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {campaign.detail}
            </p>
            <button className="w-full mt-6 px-6 py-3 bg-green-500 text-white text-lg rounded-full shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-300">
              Donasi Sekarang
            </button>
          </div>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800">Riwayat Donasi</h3>
          <div className="mt-6 space-y-6">
            {user ? (
              donationHistory.length > 0 ? (
                donationHistory.map((donation) => (
                  <div key={donation.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-600"></i>
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">Anda</p>
                        <p className="text-sm text-gray-600">{donation.date}</p>
                        <p className="text-sm text-gray-600">{donation.message}</p>
                      </div>
                    </div>
                    <p className="text-green-600 font-bold">Rp. {donation.amount.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Mulai kirim donasi.</p>
              )
            ) : (
              <p className="text-gray-600">Login dan lihat riwayat donasi kamu.</p>
            )}
          </div>
        </section>

        {!user && (
          <div className="mt-8">
            <Link
              to="/login"
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
            >
              Login untuk Donasi
            </Link>
          </div>
        )}
      </main>
    </animated.div>
  );
};

export default DonationDetailPage;
