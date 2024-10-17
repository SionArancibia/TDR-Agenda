import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEnvelope } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="flex items-center">
        <img 
          src="src/assets/logo1.png" 
          alt="Logo" 
          className="h-10 mr-4 object-contain" 
        />
      </div>

      <span className="text-sm text-gray-600">MUNICIPIO CIUDADANO</span>

      <div className="flex items-center">
        <Link to="/profile">
          <FaUserCircle className="w-8 h-8 text-gray-600 ml-4 cursor-pointer" />
        </Link>
        <Link to="/messages">
          <FaEnvelope className="w-8 h-8 text-gray-600 ml-4 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
