import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, useInView } from "@react-spring/web";
import { getCampaigns } from "../../services/campaignService";
import { getStatistics } from "../../services/statisticService"; // Import service untuk statistik
import axios from "axios";

function FadeInComponent({ children }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const styles = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 250 }, // durasi animasi dipercepat menjadi 250ms
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
            Donasi melalui website Bersama <br /> Yayasan Syakira Mutiara.
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Dukung langkah kecil untuk perubahan besar. Bergabunglah dengan kami
            dalam misi kebaikan untuk membantu mereka yang membutuhkan.
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

// New component for Documentation Carousel
const DocumentationCarousel = () => {
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle image active

  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/documentations"
        );
        // Sort by date and get the latest 3
        const sortedDocs = response.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setDocumentations(sortedDocs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching documentations:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? documentations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === documentations.length - 1 ? 0 : prev + 1
    );
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Memuat dokumentasi...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        <p className="font-bold mb-2">Terjadi kesalahan:</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          Coba lagi
        </button>
      </div>
    );

  return (
    <FadeInComponent>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-40">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Sekecil apa pun bantuanmu sangat berarti untuk mereka
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Lihat bagaimana donasi Anda membuat perbedaan dalam kehidupan mereka
          </p>

          <div className="relative max-w-5xl mx-auto">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full p-3 shadow-md hover:bg-opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Carousel */}
            <div className="flex items-center justify-center overflow-hidden">
              {documentations.map((doc, index) => {
                // Calculate position relative to active index
                let position = index - activeIndex;
                if (position < -1) position += documentations.length;
                if (position > 1) position -= documentations.length;

                return (
                  doc.images &&
                  doc.images.length > 0 && (
                    <div
                      key={doc._id}
                      className={`transition-all duration-500 ease-in-out px-2 ${
                        position === 0
                          ? "z-20 scale-100 opacity-100 w-[60%]"
                          : "z-10 scale-75 opacity-60 blur-sm w-[20%]"
                      }`}
                      style={{
                        transform: `translateX(${position * 10}%)`,
                      }}
                    >
                      <img
                        src={`http://localhost:5000${doc.images[0]}`}
                        alt={doc.title}
                        className="w-full h-[300px] object-contain rounded-lg shadow-lg"
                        onError={(e) => {
                          console.error("Error loading image:", doc.images[0]);
                          e.target.src = "/image/syakira-mutiara.png";
                        }}
                      />
                    </div>
                  )
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full p-3 shadow-md hover:bg-opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
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
        setError(err.message || "Gagal mengambil data statistik");
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
        const response = await getCampaigns();
        console.log("Fetched data:", response); // ✅ Debugging: Show API response

        // Ensure campaigns exist and are an array
        if (
          response &&
          response.campaigns &&
          Array.isArray(response.campaigns)
        ) {
          const sortedCampaigns = response.campaigns.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setCampaigns(sortedCampaigns.slice(0, 3)); // Show only the latest 3 campaigns
        } else {
          console.error("Unexpected response format:", response);
          setCampaigns([]); // Avoid crashes by setting an empty array
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(
          err.message || "Terjadi kesalahan saat mengambil data campaign"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns(); // ✅ Call the function inside useEffect
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <FadeInComponent>
      <div className="px-10 lg:px-40 py-20 bg-white">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            program Kerja
          </h2>
          <p className="text-gray-600">
            Berbagilah pada mereka yang membutuhkan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campaigns.map((campaign) => {
            // Ensure correct image URL handling
            const firstImage =
              campaign.images?.length > 0
                ? `http://localhost:5000${campaign.images[0]}`
                : "/image/syakira-mutiara.png"; // Menggunakan logo sebagai fallback

            return (
              <Link
                to={`/donation/${campaign.id}`}
                key={campaign.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={firstImage}
                  alt={campaign.title}
                  className="w-full h-64 object-contain rounded-t-lg"
                  onError={(e) => {
                    console.error("Error loading image:", firstImage);
                    e.target.src = "/image/syakira-mutiara.png";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {campaign.detail || "Deskripsi tidak tersedia."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      🎯 Target: Rp {campaign.target.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      💰 Terkumpul: Rp {campaign.currentAmount.toLocaleString()}
                    </span>
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
      <DocumentationCarousel />
      <Summary />
      <ProgramKerja />
    </div>
  );
};

export default HomePage;
