import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { toast } from 'sonner';
import PDFViewer from '../../components/admin/PDFViewer';
import CreateUsers from './CreateUsers';

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
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('requests/getRegistrationRequests');
        setRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Error obteniendo solicitudes.');
      }
    };

    fetchRequests();
  }, []);

  // Filtra solicitudes por RUT y estado de validación
  useEffect(() => {
    const filtered = requests.filter((request) => {
      const registration = request.RegistrationRequest[0];
      const matchesRut = registration.rut.includes(searchRut);
      const matchesValidation = filterValidated === null || request.validated.toString() === filterValidated;

      return matchesRut && matchesValidation;
    });

    setFilteredRequests(filtered);
  }, [searchRut, filterValidated, requests]);

  const handleBack = () => {
    setSelectedRequest(null); // Volver a la vista de la tabla
  };

  return (
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Manejo de Solicitudes de Registro</h2>

      {!selectedRequest ? (
        // Mostrar tabla si no hay solicitud seleccionada
        <>
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
            <input
              type="text"
              value={searchRut}
              onChange={(e) => setSearchRut(e.target.value)}
              className="p-2 border rounded-lg w-80 dark:bg-gray-700 dark:text-white"
              placeholder="Buscar por RUT"
            />

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
            <span className="font-bold">Total Solicitudes:</span> {requests.length} &nbsp; | &nbsp;
            <span className="font-bold">Solicitudes Filtradas:</span> {filteredRequests.length}
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
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-blue-600 hover:underline"
                        >
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
        </>
      ) : (
        <>
            <div className="flex justify-center">
                <button
                    onClick={handleBack}
                    className="mt-4 p-2 bg-green-500 text-white rounded-md"
                >
                    Volver a la tabla de solicitudes
                </button>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    <CreateUsers initialRut={selectedRequest.RegistrationRequest[0].rut} initialPassword={selectedRequest.RegistrationRequest[0].password} />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <PDFViewer fileUrl={'https://s28.q4cdn.com/392171258/files/doc_downloads/test.pdf'} />
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default Requests;
