import React from 'react';
import useAdminStats from '../../hooks/useAdminStats';

const AdminStats: React.FC = () => {
  const { stats, loading, error } = useAdminStats();
  console.log('Stats in Component:', stats);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-start py-6 px-4 bg-gray-50">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Admin Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Total Reservations</h3>
            <p className="text-2xl">{stats?.totalReservations}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Total Attendances</h3>
            <p className="text-2xl">{stats?.totalAttendances}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Community Centers</h3>
            <ul>
              {stats?.communityCenterStats?.map((center: any) => (
                <li key={center.id}>{center.name}: {center._count.appointments}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Most Visited Services</h3>
            <ul>
              {stats?.serviceStats?.map((service: any) => (
                <li key={service.id}>{service.name}: {service._count.appointments}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Busiest Schedules</h3>
            <ul>
              {stats?.scheduleStats?.map((schedule: any) => (
                <li key={schedule.date}>{new Date(schedule.date).toLocaleString()}: {schedule._count.date}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;