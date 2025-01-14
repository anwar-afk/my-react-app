import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Album = () => {
  const currentDate = new Date();
  const maxYear = currentDate.getFullYear();
  const [currentYear, setCurrentYear] = React.useState(2025);
  const [currentMonth, setCurrentMonth] = React.useState(currentDate.getMonth());

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleNextYear = () => {
    if (currentYear < maxYear) {
      setCurrentYear(currentYear + 1);
    }
  };

  const handlePrevYear = () => {
    if (currentYear > 2024) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      if (currentYear < maxYear) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      }
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      if (currentYear > 2024) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    }
  };

  const photos = [
    {
      id: 1,
      location: "Mississauga, Ontario",
      image: "/images/album-image.png",
      title: "Title Text",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      date: "Jan 31",
    },
    {
      id: 2,
      location: "London, UK",
      image: "/images/album-image.png",
      title: "Title Text",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      date: "Jan 31",
    },
    {
      id: 3,
      location: "Lausanne, Switzerland",
      image: "/images/album-image.png",
      title: "Title Text",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...",
      date: "Jan 31",
    },
  ];

  const fadeProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeProps} className="bg-white text-gray-800 min-h-screen px-10 lg:px-40 py-16">
      {/* Header */}
      <div className="border-b border-gray-300 pb-6">
        <h1 className="text-3xl font-bold mb-2">Dokumentasi</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">foto</p>
        </div>
      </div>

      {/* Year Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold">{currentYear}</h2>
          <div className="flex gap-4">
            <button 
              onClick={handlePrevYear}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                currentYear <= 2024 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
              disabled={currentYear <= 2024}
            >
              <span className="material-icons">Tahun sebelumnya</span>
            </button>
            <button 
              onClick={handleNextYear}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                currentYear >= maxYear ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
              disabled={currentYear >= maxYear}
            >
              <span className="material-icons">Tahun setelahnya</span>
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Month Section */}
      <div className="mt-10 border-b border-gray-300 pb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">{months[currentMonth]}</h3>
          <div className="flex gap-4">
            <button 
              onClick={handlePrevMonth}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                currentYear === 2024 && currentMonth === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
              disabled={currentYear === 2024 && currentMonth === 0}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button 
              onClick={handleNextMonth}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                currentYear === maxYear && currentMonth === currentDate.getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
              disabled={currentYear === maxYear && currentMonth === currentDate.getMonth()}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  {photo.location}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold">{photo.title}</h4>
                <p className="text-sm text-gray-500">{photo.description}</p>
                <p className="text-sm text-gray-500 mt-4 flex items-center">
                  <span className="material-icons text-sm mr-2">calendar_today</span>
                  {photo.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center text-green-500 font-semibold hover:underline">
          <span className="mr-2 material-icons">arrow_forward</span>
          Lihat Lebih Banyak
        </button>
      </div>
    </animated.div>
  );
};

export default Album;
