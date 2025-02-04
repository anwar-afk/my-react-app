import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, useInView } from '@react-spring/web';
import { getCampaigns } from '../../services/campaignService';
import { getStatistics } from '../../services/statisticService'; // Import service untuk statistik

function FadeInComponent({ children }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const styles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { duration: 1000 },
  });

  return (
    <animated.div ref={ref} style={styles}>
      {children}
    </animated.div>
  );
}

// Komponen Hero Pertama
const Hero1 = () => {
  return (
    <FadeInComponent>
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-40 py-20 bg-white">
        <div className="lg:max-w-lg">
          <img
            src="/image/hero2.png"
            alt="Illustration"
            className="w-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-10 lg:mt-0 lg:max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 hover:text-green-500 transition-colors duration-300">
            Bersama Mewujudkan Harapan, <br /> Memberi Kehidupan Baru.
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Dukung langkah kecil untuk perubahan besar. Bergabunglah dengan kami dalam misi kebaikan untuk membantu mereka yang membutuhkan.
          </p>
          <Link
            to="/donasi"
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            Donasi disini
          </Link>
        </div>
      </div>
    </FadeInComponent>
  );
};

// Komponen Summary
const Summary = () => {
  const [statistics, setStatistics] = useState({
    totalSuccessfulDonations: 0,
    totalRegisteredUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics(); // Ambil data statistik
        setStatistics({
          totalSuccessfulDonations: data.totalSuccessfulDonations,
          totalRegisteredUsers: data.totalRegisteredUsers,
        });
      } catch (err) {
        setError(err.message || 'Gagal mengambil data statistik');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FadeInComponent>
      <div className="bg-green-100 px-10 lg:px-40 py-20 flex flex-col lg:flex-row items-center lg:justify-between">
        <div className="lg:max-w-md mb-10 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800">
            Bantu Donasi <br />
            <span className="text-green-500">Yayasan Kami</span>
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            We reached here with our hard work and dedication
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
          <div className="flex items-center space-x-4">
            <img src="/image/ic-hero3.svg" alt="Donatur Icon" />
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {statistics.totalSuccessfulDonations.toLocaleString()}
              </p>
              <p className="text-gray-600">Donatur</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-8 lg:mt-0">
            <img src="/image/hand-ic-hero3.svg" alt="Komunitas Icon" />
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {statistics.totalRegisteredUsers.toLocaleString()}
              </p>
              <p className="text-gray-600">Komunitas</p>
            </div>
          </div>
        </div>
      </div>
    </FadeInComponent>
  );
};

// Komponen Program Kerja
const ProgramKerja = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        const sortedCampaigns = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCampaigns(sortedCampaigns.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data campaign');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <FadeInComponent>
      <div className="px-10 lg:px-40 py-20 bg-white">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Program Kerja</h2>
          <p className="text-gray-600">
            Berbagilah pada mereka yang membutuhkan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campaigns.map((campaign) => {
            // Ambil gambar pertama dari array images
            const firstImage = campaign.images && campaign.images.length > 0
              ? `https://express-production-51f2.up.railway.app/${campaign.images[0]}`
              : "https://via.placeholder.com/150"; // Fallback image jika tidak ada gambar

            return (
              <Link
                to={`/donation/${campaign._id}`}
                key={campaign._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={firstImage}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.detail}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Target: Rp {campaign.target.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Terkumpul: Rp {campaign.currentAmount.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </FadeInComponent>
  );
};

// Komponen Utama
const HomePage = () => {
  return (
    <div>
      <Hero1 />
      <Summary />
      <ProgramKerja />
    </div>
  );
};

export default HomePage;