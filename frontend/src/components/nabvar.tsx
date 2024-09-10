import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-screen bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">

        
        <div className="flex items-center">
          <img src="src/assets/logo1.png" alt="Logo" className="h-10 mr-4" />
        </div>

        <span className="text-sm text-gray-600">
          MUNICIPIO CIUDADANO
        </span>


        <div className="flex items-center">
          <Link to="/profile">
            <img src="src/assets/account_circle.png" alt="Cuenta" className="h-10 ml-4 cursor-pointer" />
          </Link>
          
          <Link to="/messages">
            <img src="src/assets/mail.png" alt="Correo" className="h-10 ml-4 cursor-pointer" />
          </Link>
        </div>
      </div>


    
    </>
  );
};

export default Navbar;
