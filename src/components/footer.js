import React from 'react';

const Footer = () => {
  return (
    <footer className="justify-center items-center bg-gray-800 text-gray-300 py-10 px-6 lg:px-40">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0">
        {/* Logo Section */}
        <div>
          <h2 className="text-white font-bold text-xl mb-2">Yayasan</h2>
          <p className="text-sm text-gray-400">Syakira Mutiara</p>
          <p className="text-sm mt-4">Copyright © 2025 Syakira Mutiara ltd.</p>
          <p className="text-sm">All rights reserved</p>
        
        </div>
        

       
      </div>
    </footer>
  );
};

export default Footer;