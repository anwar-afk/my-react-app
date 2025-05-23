import React, { useEffect, useState, useRef } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStatistics } from "../../../services/statisticsService";
import { useSpring, animated } from "@react-spring/web";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getCampaigns } from '../../../services/campaignService';

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 250 },
  });

  // Set default icon for markers
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  // Fetch programs data
  const fetchPrograms = async () => {
    try {
      const result = await getCampaigns();
      if (result.success) {
        setPrograms(result.campaigns);
      } else {
        console.error('Error fetching programs:', result.error);
        setPrograms([]);
      }
    } catch (err) {
      console.error('Error fetching programs:', err);
      setPrograms([]);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !statistics) return;

    const initializeMap = () => {
      try {
        console.log("🗺️ Initializing map...");
        const map = L.map(mapRef.current).setView([-6.200000, 106.816666], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
        markersLayerRef.current = L.layerGroup().addTo(map);

        // Force a resize after initialization
        requestAnimationFrame(() => {
          map.invalidateSize();
          setMapInitialized(true);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Initialize map after a short delay to ensure the container is ready
    const timer = setTimeout(initializeMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        setMapInitialized(false);
      }
    };
  }, [statistics]); // Add statistics as dependency to ensure map initializes after data is loaded

  // Update markers when programs or filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filteredPrograms = programs.filter(program => {
      if (filter === 'active') return program.status === 'active';
      if (filter === 'inactive') return program.status === 'inactive';
      return true;
    });

    filteredPrograms.forEach(program => {
      if (program.latitude && program.longitude) {
        const marker = L.marker([program.latitude, program.longitude])
          .bindPopup(`
            <div>
              <h3 class="font-bold">${program.title}</h3>
              <p class="text-sm">${program.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</p>
              <p class="text-sm">Target: Rp ${formatCurrency(program.target)}</p>
            </div>
          `);
        markersLayerRef.current.addLayer(marker);
      }
    });
  }, [programs, filter]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse] = await Promise.all([
          getStatistics(),
          fetchPrograms()
        ]);
        setStatistics(statsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!statistics) return <div className="p-6">Data tidak tersedia</div>;

  const formatCurrency = (amount) => {
    return parseInt(amount).toLocaleString("id-ID");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = [
    {
      title: "Donasi Berhasil",
      value: statistics.totalSuccessfulDonations,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Total Donasi",
      value: `Rp ${formatCurrency(statistics.totalDonationAmount)}`,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Donatur",
      value: statistics.totalRegisteredUsers,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Program Aktif",
      value: statistics.activeCampaigns,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  return (
    <animated.div style={fadeIn}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-sm text-gray-500">
            Terakhir diperbarui: {formatDate(statistics.lastUpdated)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  {stat.icon}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Peta Program</h2>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Semua Program</option>
                <option value="active">Program Aktif</option>
                <option value="inactive">Program Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div 
            ref={mapRef} 
            className="w-full h-[500px] rounded-lg relative"
            style={{ 
              minHeight: "500px",
              opacity: mapInitialized ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
          {!mapInitialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-600">Initializing map...</p>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default Dashboard;
