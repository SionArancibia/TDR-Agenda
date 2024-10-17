import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CommunityCenter {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  managerName: string;
}

const CommunityCenters: React.FC = () => {
  const [centers, setCenters] = useState<CommunityCenter[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<CommunityCenter[]>([]);
  const [searchName, setSearchName] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<CommunityCenter | null>(null);
  const navigate = useNavigate();

  // Obtener los centros comunitarios al cargar el componente
  useEffect(() => {
    const fetchCommunityCenters = async () => {
      try {
        const response = await api.get('/communityCenters');
        setCenters(response.data);
        setFilteredCenters(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Error al obtener los centros comunitarios.');
      }
    };

    fetchCommunityCenters();
  }, []);

  // Filtrar centros comunitarios por nombre
  useEffect(() => {
    const filtered = centers.filter((center) =>
      center.name.toLowerCase().includes(searchName.toLowerCase())
    );

    setFilteredCenters(filtered);
  }, [searchName, centers]);

  const handleBack = () => {
    setSelectedCenter(null); // Volver a la vista de la tabla
  };

  return (
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Centros Comunitarios</h2>

      {!selectedCenter ? (
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
            onClick={() => navigate('/createCommunityCenter')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Crear nuevo centro comunitario
            </button>
          </div>

          <div className="p-4 bg-gray-50">
            <span className="font-bold">Total Centros:</span> {centers.length} &nbsp; | &nbsp;
            <span className="font-bold">Centros Filtrados:</span> {filteredCenters.length}
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Dirección</th>
                <th className="px-6 py-3">Teléfono</th>
                <th className="px-6 py-3">Encargado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <tr
                    key={center.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{center.name}</td>
                    <td className="px-6 py-4">{center.address}</td>
                    <td className="px-6 py-4">{center.phoneNumber}</td>
                    <td className="px-6 py-4">{center.managerName}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCenter(center)}
                        className="text-blue-600 hover:underline mr-5"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => setSelectedCenter(center)}
                        className="text-blue-600 hover:underline ml-5"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No se encontraron centros comunitarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="mt-4 p-2 bg-green-500 text-white rounded-md"
            >
              Volver a la tabla
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityCenters;
