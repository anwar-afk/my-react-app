import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Impor Link
import { getCampaigns } from '../../services/campaignService'; // Impor fungsi getCampaigns
import { AuthContext } from '../../context/AuthContext'; // Impor AuthContext

const DonationDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [campaign, setCampaign] = useState(null); // State untuk menyimpan data campaign
  const [loading, setLoading] = useState(true); // State untuk menangani loading state
  const [error, setError] = useState(null); // State untuk menangani error
  const [donationHistory, setDonationHistory] = useState([]); // State untuk menyimpan riwayat donasi

  // Ambil status login dari AuthContext
  const { user } = useContext(AuthContext);

  // Fetch semua data campaign dan filter berdasarkan ID
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaigns(); // Ambil semua data campaign
        const selectedCampaign = data.find((campaign) => campaign._id === id); // Filter berdasarkan ID
        if (selectedCampaign) {
          setCampaign(selectedCampaign); // Simpan data campaign ke state
        } else {
          setError("Data campaign tidak ditemukan."); // Set error jika campaign tidak ditemukan
        }
        setLoading(false); // Set loading ke false
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Gagal memuat data campaign."); // Set error message
        setLoading(false); // Set loading ke false
      }
    };

    fetchCampaign();
  }, [id]); // Jalankan efek ini setiap kali `id` berubah

  // Scroll ke atas saat komponen dimuat
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll ke posisi (0, 0)
  }, []); // Array kosong artinya efek ini hanya dijalankan sekali saat komponen dimuat

  // Tampilkan loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Memuat data campaign...</p>
      </div>
    );
  }

  // Tampilkan error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Jika data campaign tidak ditemukan
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Data campaign tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={campaign.image} // Gunakan gambar dari data campaign
              alt="Donation Detail"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Donation Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {campaign.category} {/* Tampilkan kategori campaign */}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{campaign.title}</h2>
            <p className="text-gray-600 mt-4">{campaign.detail}</p>
            <button className="w-full mt-6 px-4 py-2 bg-green-600 text-white text-lg rounded hover:bg-green-700">
              Donasi
            </button>
          </div>
        </div>

        {/* Riwayat Donasi */}
        <section className="mt-12">
          <h3 className="text-xl font-bold text-gray-800">Riwayat</h3>
          <div className="mt-6 space-y-6">
            {user ? ( // Jika sudah login
              donationHistory.length > 0 ? ( // Jika ada riwayat donasi
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
                <p className="text-gray-600">Mulai kirim donasi.</p> // Jika belum ada riwayat donasi
              )
            ) : (
              <p className="text-gray-600">Login dan lihat riwayat donasi kamu.</p> // Jika belum login
            )}
          </div>
        </section>

        {/* Tombol Login (Hanya Tampilkan Jika Belum Login) */}
        {!user && ( // Hanya tampilkan tombol login jika belum login
          <div className="mt-8">
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonationDetailPage;