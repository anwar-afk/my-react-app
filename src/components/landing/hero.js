import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-40 py-20 bg-white">
      {/* Image Section */}
      <div className="lg:max-w-lg">
        <img
          src="/image/hero2.png" // Path gambar, sesuaikan
          alt="Illustration"
          className="w-full"
        />
      </div>

      {/* Text Section */}
      <div className="mt-10 lg:mt-0 lg:max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor,
          augue nec tincidunt molestie, massa nunc varius arcu, et scelerisque
          elit erat a magna. Donec quis erat at libero ultrices mollis. In hac
          habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi
          facilisis finibus.
        </p>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          Donasi disini
        </button>
      </div>
    </div>
  );
};

export default Hero;
