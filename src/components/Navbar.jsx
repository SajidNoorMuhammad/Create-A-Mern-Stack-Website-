import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white">
          BrandLogo
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-indigo-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-indigo-300">
            About
          </a>
          <a href="#" className="text-white hover:text-indigo-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-indigo-300">
            Contact
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-48 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <a href="#" className="block px-4 py-2 text-white hover:bg-indigo-500">
            Home
          </a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-indigo-500">
            About
          </a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-indigo-500">
            Services
          </a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-indigo-500">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
