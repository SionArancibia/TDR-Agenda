import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { authUser, fetchUserData, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil del Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <p className="text-gray-900">{authUser?.firstName} {authUser?.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
          <p className="text-gray-900">{authUser?.email}</p>
        </div>
        {authUser?.role === 'professional' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Especialidad:</label>
            <p className="text-gray-900">{authUser?.professional?.specialty}</p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <p className="text-gray-900">{authUser?.phoneNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
          <p className="text-gray-900">{authUser?.address}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mb-4"
        >
          Cerrar Sesión
        </button>
        <div className="w-full flex justify-center">
          {authUser?.role === 'admin' && (
            <Link to="/dashboardAdmin" className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </Link>
          )}
          {authUser?.role === 'professional' && (
            <Link to="/dashboardProfessional" className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Atrás
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;