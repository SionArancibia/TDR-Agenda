import { useState, useEffect } from 'react';
import { api } from "../utils/axios";

const useAdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats'); // Asegúrate de que esta URL sea correcta
        console.log('Response Data:', response.data);
        setStats(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching stats:', err);
        setError(err.response?.data?.error || 'Error fetching stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useAdminStats;