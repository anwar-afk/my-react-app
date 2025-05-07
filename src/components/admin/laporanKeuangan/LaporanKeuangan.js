import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const LaporanKeuangan = () => {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const reports = [
    { id: 1, year: "2024", pdfUrl: "#" },
    { id: 2, year: "2023", pdfUrl: "#" },
    { id: 3, year: "2022", pdfUrl: "#" },
    { id: 4, year: "2021", pdfUrl: "#" },
  ];

  const visibleReports = reports; // Display all reports without slicing

  return (
    <animated.div style={fadeIn} className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-6">Keuangan Tahunan</h1>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-yellow-100 text-gray-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            + Laporan Keuangan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Tahun {report.year}
                </h3>
                <a
                  href={report.pdfUrl}
                  className="w-full flex items-center justify-center py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  <span>Unduh pdf</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Tambah Laporan Tahunan</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Judul Program
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Masukkan judul program"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default LaporanKeuangan;
