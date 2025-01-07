import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-10 lg:px-40">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0">
        {/* Logo Section */}
        <div>
          <h2 className="text-white font-bold text-xl mb-2">Yayasan</h2>
          <p className="text-sm text-gray-400">Pelita Ilmu</p>
          <p className="text-sm mt-4">Copyright © 2020 Nexcent ltd.</p>
          <p className="text-sm">All rights reserved</p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#">
              <img src="/icons/instagram.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="/icons/dribbble.png" alt="Dribbble" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="/icons/twitter.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="/icons/youtube.png" alt="YouTube" className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex space-x-16">
          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About us</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Testimonials</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help center</a></li>
              <li><a href="#" className="hover:underline">Terms of service</a></li>
              <li><a href="#" className="hover:underline">Legal</a></li>
              <li><a href="#" className="hover:underline">Privacy policy</a></li>
              <li><a href="#" className="hover:underline">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay up to date</h3>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
