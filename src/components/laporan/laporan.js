import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const LaporanKeuangan = () => {
  const [showMore, setShowMore] = useState(false);
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  // Sample data for financial reports
  // In the future, this would come from an API
  const reports = [
    { id: 1, year: '2024', pdfUrl: '#' },
    { id: 2, year: '2023', pdfUrl: '#' },
    { id: 3, year: '2023', pdfUrl: '#' },
    { id: 4, year: '2022', pdfUrl: '#' },
    { id: 5, year: '2021', pdfUrl: '#' },
    { id: 6, year: '2020', pdfUrl: '#' },
    { id: 7, year: '2019', pdfUrl: '#' },
    { id: 8, year: '2018', pdfUrl: '#' },
  ];

  // Display only first 6 reports initially
  const visibleReports = showMore ? reports : reports.slice(0, 6);

  return (
    <animated.div style={fadeIn} className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Laporan Keuangan</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">Laporan Tahunan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Tahun {report.year}</h3>
                <a 
                  href={report.pdfUrl} 
                  className="w-full flex items-center justify-center py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  <span>Unduh pdf</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {reports.length > 6 && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => setShowMore(!showMore)}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              {showMore ? 'Tampilkan Lebih Sedikit' : 'Lihat Lebih Banyak'}
            </button>
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default LaporanKeuangan;
