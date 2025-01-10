import React from "react";

const Donasi2 = () => {
  const donations = [
    {
      id: 1,
      title: "Peduli Pendidikan Anak Bangsa",
      tag: "Donasi Anak Yatim",
      image: "/images/donation1.jpg", // Path gambar
      link: "#",
    },
    {
      id: 2,
      title: "Sehat untuk Semua",
      tag: "Donasi Anak Yatim",
      image: "/images/donation2.jpg", // Path gambar
      link: "#",
    },
    {
      id: 3,
      title: "Cahaya Harapan di Pelosok Negeri",
      tag: "Donasi Anak Yatim",
      image: "/images/donation3.jpg", // Path gambar
      link: "#",
    },
    {
      id: 4,
      title: "Cahaya Harapan di Pelosok Negeri",
      tag: "Donasi Anak Yatim",
      image: "/images/donation3.jpg", // Path gambar
      link: "#",
    },
    {
      id: 5,
      title: "Cahaya Harapan di Pelosok Negeri",
      tag: "Donasi Anak Yatim",
      image: "/images/donation3.jpg", // Path gambar
      link: "#",
    },
    {
      id: 6,
      title: "Cahaya Harapan di Pelosok Negeri",
      tag: "Donasi Anak Yatim",
      image: "/images/donation3.jpg", // Path gambar
      link: "#",
    },
  ];

  return (
    <div className="px-10 lg:px-40 py-20">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Donasi Anak Yatim</h2>

      {/* Donation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full inline-block mb-4">
                {donation.tag}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{donation.title}</h3>
              <a
                href={donation.link}
                className="text-green-500 font-medium hover:underline flex items-center"
              >
                Lihat Selengkapnya <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Button Section */}
      <div classname="">
        <button className="flex item-center mt-20 mb-20 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
            Lihat Lebih Banyak
        </button>
      </div>
    </div>
  );
};

export default Donasi2;
