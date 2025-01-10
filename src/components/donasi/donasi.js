import React from "react";

const Donasi = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-60 py-20 bg-green-100">
      {/* Left Section */}
      <div className="lg:max-w-lg text-center lg:text-left mb-10 lg:mb-0">
        <h1 className="text-4xl font-extrabold text-brown-800 mb-6">
          Bersama <br /> Wujudkan Harapan
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Setiap donasi Anda adalah langkah kecil menuju perubahan besar.
          Bergabunglah dengan kami untuk membawa cahaya harapan bagi mereka yang membutuhkan.
        </p>
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600">
          MAKE A DONATION
        </button>
      </div>

      {/* Right Section */}
      <div className="relative">
        {/* Image */}
        <img
          src="/image/child smiling.png" // Ganti dengan path gambar
          alt="Child Smiling"
          className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full"
        />
        <div className="absolute bottom-0 left-0 transform -translate-x-10 translate-y-10">
          <div className="w-20 h-20 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Donasi;
