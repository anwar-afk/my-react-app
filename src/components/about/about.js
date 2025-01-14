import React from 'react';

const ProgramKerja = () => {
  const programs = [
    {
      title: "Creating Streamlined Safeguarding Processes with OneRen",
      link: "#",
      image: "/image/hero.png", // Ganti dengan path gambar
    },
    {
      title: "What are your safeguarding responsibilities and how can you manage them?",
      link: "#",
      image: "/image/hero.png", // Ganti dengan path gambar
    },
    {
      title: "Revamping the Membership Model with Triathlon Australia",
      link: "#",
      image: "/image/hero.png", // Ganti dengan path gambar
    },
  ];

  return (
    <div className="px-10 lg:px-40 py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
  <div className="bg-green-50 rounded-lg shadow-lg p-6 mb-20">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
    <p className="text-gray-600 whitespace-normal break-words">
      Kami adalah sebuah yayasan yang berkomitmen menjadi cahaya harapan bagi mereka yang membutuhkan. 
      Dengan penuh cinta dan keikhlasan, kami hadir untuk membantu anak-anak yatim, kaum dhuafa, dan 
      orang-orang yang sedang berjuang melawan keterbatasan.

      Di setiap langkah, kami percaya bahwa berbagi adalah kunci kebahagiaan sejati. Setiap donasi yang Anda 
      salurkan adalah setetes harapan yang mampu mengubah masa depan mereka yang membutuhkan. Mari bersama-sama 
      menciptakan dunia yang lebih peduli, di mana senyuman mereka adalah kebahagiaan kita semua. 🌟

      Bersama, kita wujudkan kehidupan yang lebih baik untuk mereka yang membutuhkan.
    </p>
  </div>
</div>


      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {programs.map((program, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{program.title}</h3>
              <a
                href={program.link}
                className="text-green-500 font-medium hover:underline flex items-center"
              >
                Readmore <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramKerja;
