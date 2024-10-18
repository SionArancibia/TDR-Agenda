import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  category: Category; // Relación con la categoría
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  // Obtener servicios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services'); // Incluir categoría desde el backend
        console.log(response.data);
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Error al obtener los servicios.');
      }
    };

    fetchServices();
  }, []);

  // Filtrar servicios por nombre
  useEffect(() => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchName, services]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/services/${id}`);
      const updatedServices = services.filter((service) => service.id !== id);
      setServices(updatedServices);
      setFilteredServices(updatedServices);
      toast.success('Servicio eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      toast.error('No se pudo eliminar el servicio.');
    }
  };

  return (
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Servicios</h2>
      <>
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border rounded-lg w-80 dark:bg-gray-700 dark:text-white"
            placeholder="Buscar por nombre"
          />
          <button
            onClick={() => navigate('/createService')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Crear nuevo servicio
          </button>
        </div>

        <div className="p-4 bg-gray-50">
          <span className="font-bold">Total Servicios:</span> {services.length} &nbsp; | &nbsp;
          <span className="font-bold">Servicios Filtrados:</span> {filteredServices.length}
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Activo</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr
                  key={service.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{service.name}</td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4">{service.category.name}</td>
                  <td className="px-6 py-4">
                    {service.isActive ? 'Sí' : 'No'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No se encontraron servicios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Services;
