import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";

const Album = () => {
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  // Fetch data dokumentasi dari API
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/documentations"
        );
        setDocumentations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  const fadeProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  // Function to handle next image
  const handleNextImage = (docId) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[docId] || 0;
      const doc = documentations.find(d => d._id === docId);
      const maxIndex = doc.images.length - 1;
      return {
        ...prevIndexes,
        [docId]: currentIndex >= maxIndex ? 0 : currentIndex + 1
      };
    });
  };

  // Function to handle previous image
  const handlePrevImage = (docId) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[docId] || 0;
      const doc = documentations.find(d => d._id === docId);
      const maxIndex = doc.images.length - 1;
      return {
        ...prevIndexes,
        [docId]: currentIndex <= 0 ? maxIndex : currentIndex - 1
      };
    });
  };

  // Filter dokumentasi berdasarkan tahun
  const filteredDocumentations = documentations.filter((doc) => {
    if (selectedYear === "ALL") return true;
    
    const docYear = new Date(doc.date).getFullYear().toString();
    return docYear === selectedYear;
  });

  // Mendapatkan tahun unik dari dokumentasi
  const getYears = () => {
    const years = documentations.map(doc => new Date(doc.date).getFullYear().toString());
    return ["ALL", ...new Set(years)].sort();
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  return (
    <animated.div style={fadeProps} className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dokumentasi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>

      {/* Filter tahun */}
      <div className="flex justify-center space-x-4 mb-12">
        {getYears().map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-8 py-2 rounded-full border ${
              selectedYear === year
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition-colors duration-300`}
          >
            {year}
          </button>
        ))}
      </div>

      {selectedYear !== "ALL" && (
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{selectedYear}</h2>
      )}

      {/* Grid dokumentasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocumentations.map((doc) => {
          const currentImageIndex = currentImageIndexes[doc._id] || 0;
          
          return (
            <div key={doc._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {doc.images && doc.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={`http://localhost:5000${doc.images[currentImageIndex]}`}
                      alt={doc.title}
                      className="w-full h-64 object-contain"
                    />
                    {doc.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrevImage(doc._id);
                          }}
                          className="bg-white bg-opacity-70 rounded-full p-2 text-gray-700 hover:bg-opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleNextImage(doc._id);
                          }}
                          className="bg-white bg-opacity-70 rounded-full p-2 text-gray-700 hover:bg-opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    {doc.category || "Donasi Jum'at Berkah"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{doc.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </animated.div>
  );
};

export default Album;