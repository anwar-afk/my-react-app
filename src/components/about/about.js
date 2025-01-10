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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tentang Kami</h2>
        <p className="text-gray-600 whitespace-normal break-words">
          The Nexcent blog is the best place to read about the latest membership insights,
          trends and more. See who's joining the community, read about how our community 
          are increasing their membership income and lot's more.
        </p>
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
