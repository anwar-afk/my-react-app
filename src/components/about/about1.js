import React from "react";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start px-10 lg:px-40 py-16 bg-gray-100">
      {/* Left Section (Image) */}
      <div className="flex-shrink-0 px-20">
        <img
          src="/image/child smiling.png" // Ganti dengan path gambar Anda
          alt="Tesla Logo"
          className="w-80 h-80 rounded-lg shadow-md"
        />
      </div>

      {/* Right Section (Text Content) */}
      <div className="lg:ml-10 mt-6 lg:mt-0 text-center lg:text-left">
        <p className="text-gray-600 mb-6 leading-relaxed break-words whitespace-pre-wrap max-w-[600px]">
          Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.
        </p>
        <h3 className="text-green-500 font-semibold text-lg">Tim Smith</h3>
        <p className="text-gray-400">British Dragon Boat Racing Association</p>
      </div>
    </div>
  );
};

export default About;
