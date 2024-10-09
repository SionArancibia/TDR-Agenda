import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Nabvar';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      <Footer />
    </div>
  );
};

export default MainLayout;