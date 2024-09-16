import CardDataStats from '../components/admin/CardDataStats';
import SolicitudeTable from '../components/admin/Tables/SolicitudeTable';
import DefaultLayout from '../components/admin/layout/DefaultLayout';

const AdminDashboard = () => {
  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total peticiones" total="653"><div>Peticiones de registro</div></CardDataStats>
          <CardDataStats title="Agendas para hoy" total="21"><div>Agenda</div></CardDataStats>
          <CardDataStats title="Usuarios nuevos" total="221"><div>Usuarios</div></CardDataStats>
          <CardDataStats title="Profesionales totales" total="21"><div>Profesionales</div></CardDataStats>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-8">
            <SolicitudeTable />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AdminDashboard;
