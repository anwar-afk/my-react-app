import React from 'react';

// Data laporan keuangan
const laporanKeuangan = [
  { tahun: 2025, link: 'https://rumah-yatim.org/storage/files/laporan/keuangan/1728962452-LaporanKeuanganAuditeed2023Publikasi.pdf' },
];

const LaporanKeuangan = () => {
  return (
    <div className="container mx-auto px-6 py-12 mb-80">
      <h1 className="text-4xl font-extrabold text-green-600 text-center mb-12">Laporan Keuangan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {laporanKeuangan.map((laporan) => (
          <div
            key={laporan.tahun}
            className="bg-gradient-to-r from-green-100 to-green-50 shadow-lg rounded-lg p-4 w-64 transform transition-transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Laporan Keuangan {laporan.tahun}</h2>
            {laporan.link !== '#' ? (
              <a
                href={laporan.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                View Details
              </a>
            ) : (
              <p className="text-gray-500 italic text-center">Link tidak tersedia</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaporanKeuangan;
