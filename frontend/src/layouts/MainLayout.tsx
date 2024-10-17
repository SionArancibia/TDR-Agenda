// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Nabvar';

const MainLayout: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto,1fr] min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-16 p-4"> {/* Espacio para el navbar fijo */}
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </div>
    </div>
  );
};

export default MainLayout;
