// src/pages/admin/AdminStats.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-50">
        <div className="loader"></div>
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold">No data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-start py-6 px-4 bg-gray-50">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Admin Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl">{stats.totalUsers}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-2xl">{stats.totalAppointments}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Total Cancellations</h3>
            <p className="text-2xl">{stats.totalCancellations}</p>
          </div>
          {/* Añadir más estadísticas según sea necesario */}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;