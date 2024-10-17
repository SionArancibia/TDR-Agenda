import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { toast } from 'sonner';

interface RegistrationRequest {
  id: string;
  rut: string;
  password: string;
  document: string;
  createdAt: string;
}

interface Request {
  id: string;
  validated: boolean;
  RegistrationRequest: RegistrationRequest[];
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchRut, setSearchRut] = useState('');
  const [filterValidated, setFilterValidated] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('requests/getRegistrationRequests');
        setRequests(response.data);
        console.log(response.data)
        setFilteredRequests(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Error obteniendo solicitudes.');
      }
    };

    fetchRequests();
  }, []);

  // Filtrar solicitudes por RUT y estado de validación
  useEffect(() => {
    const filtered = requests.filter((request) => {
      const registration = request.RegistrationRequest[0];
      const matchesRut = registration.rut.includes(searchRut);
      const matchesValidation = filterValidated === null || request.validated.toString() === filterValidated;

      return matchesRut && matchesValidation;
    });

    setFilteredRequests(filtered);
  }, [searchRut, filterValidated, requests]);

  const totalRequests = requests.length;
  const totalFiltered = filteredRequests.length;

  return (
    <>
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Manejo de Solicitudes</h2>      
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <input
            type="text"
            value={searchRut}
            onChange={(e) => setSearchRut(e.target.value)}
            className="p-2 border rounded-lg w-80 dark:bg-gray-700 dark:text-white"
            placeholder="Buscar por RUT"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-2">Filtrar por Validación:</label>
          <select
            value={filterValidated === null ? '' : filterValidated}
            onChange={(e) => setFilterValidated(e.target.value === '' ? null : e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos</option>
            <option value="true">Validados</option>
            <option value="false">No Validados</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <span className="font-bold">Total Solicitudes:</span> {totalRequests} &nbsp; | &nbsp;
        <span className="font-bold">Solicitudes Filtradas:</span> {totalFiltered}
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">RUT</th>
            <th className="px-6 py-3">Fecha de Solicitud</th>
            <th className="px-6 py-3">Validado</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => {
              const registration = request.RegistrationRequest[0];
              return (
                <tr
                  key={request.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{registration.rut}</td>
                  <td className="px-6 py-4">
                    {new Date(registration.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {request.validated ? (
                      <span className="text-green-500">Validado</span>
                    ) : (
                      <span className="text-red-500">No Validado</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline">
                      Validar Solicitud
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No se encontraron solicitudes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
    
  );
};

export default Requests;
