import React, { useEffect } from 'react'; // Tambahkan useEffect
import { useParams } from 'react-router-dom'; // Gunakan useParams untuk mendapatkan ID

const DonationDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL

  // Scroll ke atas saat komponen dimuat
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll ke posisi (0, 0)
  }, []); // Array kosong artinya efek ini hanya dijalankan sekali saat komponen dimuat

  // Contoh data donasi (bisa diganti dengan data dari API)
  const donation = {
    id: 1,
    title: "Peduli Pendidikan Anak Bangsa",
    tag: "Donasi Anak Yatim",
    image: "/images/donation1.jpg",
    description: "Lorem ipsum bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla.",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={donation.image} // Gunakan gambar dari data donasi
              alt="Donation Detail"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Donation Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">{donation.tag}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{donation.title}</h2>
            <p className="text-gray-600 mt-4">{donation.description}</p>
            <button className="w-full mt-6 px-4 py-2 bg-green-600 text-white text-lg rounded hover:bg-green-700">
              Donasi
            </button>
          </div>
        </div>

        {/* Riwayat Donasi */}
        <section className="mt-12">
          <h3 className="text-xl font-bold text-gray-800">Riwayat</h3>
          <div className="mt-6 space-y-6">
            {/* Riwayat Item */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-gray-600"></i>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">Anda</p>
                    <p className="text-sm text-gray-600">30 Desember 2024</p>
                    <p className="text-sm text-gray-600">Semoga berkah aminn</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">Rp.200.000</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DonationDetailPage;