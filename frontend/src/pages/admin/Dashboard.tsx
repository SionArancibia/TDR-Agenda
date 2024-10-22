import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <Link to="/requests" className="transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-red-500 h-8"></div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Solicitudes</h2>
              </div>
            </div>
          </Link>
          <Link to="/users" className="transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-blue-500 h-8"></div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Usuarios</h2>
              </div>
            </div>
          </Link>
          <Link to="/agendaAdmin" className="transform transition-transform duration-300 hover:scale-105">          
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-yellow-500 h-8"></div>+
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Agenda</h2>
              </div>
            </div>
          </Link>
          <Link to="/adminStats" className="transform transition-transform duration-300 hover:scale-105">          
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-green-500 h-8"></div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Estadisticas</h2>
              </div>
            </div>
          </Link>
          <Link to="/communityCenters" className="transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-yellow-500 h-8"></div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Centros comunitarios</h2>
              </div>
            </div>
          </Link>
          <Link to="/services" className="transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-40 mx-auto">
              <div className="bg-green-500 h-8"></div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-black">Servicios</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
