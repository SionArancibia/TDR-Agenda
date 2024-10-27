import { useState, useEffect } from 'react';
import axios from 'axios';

const useAdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        console.log(response.data);
        setStats(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error fetching stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useAdminStats;