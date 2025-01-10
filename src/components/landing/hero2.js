import React from 'react';

const Summary = () => {
  return (
    <div className="bg-green-100 px-10 lg:px-40 py-20 flex flex-col lg:flex-row items-center lg:justify-between">
      {/* Left Section (Text) */}
      <div className="lg:max-w-md mb-10 lg:mb-0">
        <h2 className="text-3xl font-bold text-gray-800">
          Bantu Donasi <br />
          <span className="text-green-500">Yayasan Kami</span>
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          We reached here with our hard work and dedication
        </p>
      </div>

      {/* Right Section (Statistics) */}
      <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
        {/* Donatur Statistic */}
        <div className="flex items-center space-x-4">
          <img
            src="/image/ic-hero3.svg" // Path gambar ikon donatur
          />
          <div>
            <p className="text-3xl font-bold text-gray-800">2,245,341</p>
            <p className="text-gray-600">Donatur</p>
          </div>
        </div>

        {/* Komunitas Statistic */}
        <div className="flex items-center space-x-4 mt-8 lg:mt-0">
          <img
            src="/image/hand-ic-hero3.svg" // Path gambar ikon komunitas
          />
          <div>
            <p className="text-3xl font-bold text-gray-800">46,328</p>
            <p className="text-gray-600">Komunitas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
