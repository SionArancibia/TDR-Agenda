import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/axios';
import { toast } from 'sonner';

interface Professional {
  id: string;
  area: string;
  specialty: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

const AgendaAdmin: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await api.get('/professionals');
        setProfessionals(response.data);
        setFilteredProfessionals(response.data);
      } catch (error) {
        console.error('Error al obtener profesionales:', error);
        toast.error('Error obteniendo profesionales.');
      }
    };

    fetchProfessionals();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = professionals.filter(
      (professional) =>
        professional.user.firstName.toLowerCase().includes(query) ||
        professional.user.lastName.toLowerCase().includes(query)
    );
    setFilteredProfessionals(filtered);
  };

  const handleViewAgenda = (professionalId: string) => {
    navigate(`/professionalAgenda/${professionalId}`);
  };

  const handleManageSchedule = (professionalId: string) => {
    navigate(`/manageSchedule/${professionalId}`);
  };

  const handleGenerateAppointments = (professionalId: string) => {
    navigate(`/generateAppointments/${professionalId}`);
  };

  return (
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Listado de Profesionales</h2>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-lg w-80 dark:bg-gray-700 dark:text-white"
            placeholder="Buscar por nombre o apellido"
          />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {['Id', 'Nombre', 'Apellido', 'Correo', 'Teléfono', 'Área', 'Especialidad', 'Acciones'].map((header) => (
              <th key={header} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <tr
                key={professional.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{professional.id}</td>
                <td className="px-6 py-4">{professional.user.firstName}</td>
                <td className="px-6 py-4">{professional.user.lastName}</td>
                <td className="px-6 py-4">{professional.user.email}</td>
                <td className="px-6 py-4">{professional.user.phoneNumber}</td>
                <td className="px-6 py-4">{professional.area}</td>
                <td className="px-6 py-4">{professional.specialty}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleViewAgenda(professional.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                  >
                    Ver Agenda
                  </button>
                  <button
                    onClick={() => handleManageSchedule(professional.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Gestionar Horarios
                  </button>
                  <button
                    onClick={() => handleGenerateAppointments(professional.id)}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition"
                  >
                    Generar Citas
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No se encontraron profesionales.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgendaAdmin;
