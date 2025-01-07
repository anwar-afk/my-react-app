import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-40 py-20 bg-gray-100 mb-10">
      {/* Text Section */}
      <div className="text-center lg:text-left max-w-lg lg:max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bersama untuk Masa Depan,{' '}
          <span className="text-green-500">ahay.</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Where to grow your business as a photographer: site or social media?
        </p>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          Register
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-10 lg:mt-0 lg:max-w-md">
        <img
          src="/image/hero.png" // Path gambar
          alt="Illustration"
          className="w-full"
        />
      </div>
      
    </div>
    
  );
};

export default Hero;
