import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/axios';
import { toast } from 'sonner';
import CreateAppointment from '../../components/forms/CreateAppointment';
import BlockScheduleModal from '../../components/forms/BlockScheduleModal';

interface Appointment {
  id: string;
  date: string;
  professionalId: string;
  serviceId: string | null;
  patientId: string | null;
  available: boolean;
  canceled: boolean;
}

const ProfessionalAgenda: React.FC = () => {
  const { professionalId } = useParams<{ professionalId: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isBlockModalOpen, setBlockModalOpen] = useState(false);
    
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/professionals/appointments/all', {
          params: { professionalId },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error al obtener citas:', error);
        toast.error('Error obteniendo citas.');
      }
    };

    fetchAppointments();
  }, [professionalId]);

  const handleCancelAppointment = async (id: string, canceled: boolean) => {
    try {
      const response = await api.put(`/appointments/${id}`, {
        canceled: !canceled,
      });
      setAppointments((prev) => 
        prev.map((appointment) => 
          appointment.id === id ? response.data : appointment
        )
      );
      toast.success(canceled ? 'Cita reactivada con éxito.' : 'Cita cancelada con éxito.');
    } catch (error) {
      console.error('Error al cambiar el estado de cancelación:', error);
      toast.error('Error al cambiar el estado de cancelación.');
    }
  };

  const handleToggleAvailability = async (id: string, available: boolean) => {
    try {
      const response = await api.put(`/appointments/${id}`, {
        available: !available,
      });
      setAppointments((prev) => 
        prev.map((appointment) => 
          appointment.id === id ? response.data : appointment
        )
      );
      toast.success('Estado de disponibilidad actualizado.');
    } catch (error) {
      console.error('Error al cambiar el estado de disponibilidad:', error);
      toast.error('Error al cambiar el estado de disponibilidad.');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
      toast.success('Cita eliminada con éxito.');
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      toast.error('Error al eliminar la cita.');
    }
  };

  const handleCreateAppointment = () => {
    setCreateModalOpen(true);
  };

  const handleBlockSchedule = () => {
    setBlockModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const closeBlockModal = () => {
    setBlockModalOpen(false);
  };

  return (
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Agenda del Profesional</h2>
      <button
        onClick={handleCreateAppointment}
        className="mb-4 bg-blue-500 text-white px-4 py-2 mr-5 ml-5 rounded hover:bg-blue-600 transition"
      >
        Crear Cita
      </button>
      <button
        onClick={handleBlockSchedule}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Bloquear horario
      </button>
      {isCreateModalOpen && <CreateAppointment onClose={closeCreateModal} professionalId={professionalId} />}
      {isBlockModalOpen && <BlockScheduleModal professionalId={professionalId} onClose={closeBlockModal} />}
      <>
        {appointments.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {['Fecha', 'Disponible', 'Cancelada', 'Paciente', 'Acciones'].map((header) => (
                  <th key={header} className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{new Date(appointment.date).toLocaleString()}</td>
                  <td className="px-6 py-4">{appointment.available ? 'Sí' : 'No'}</td>
                  <td className="px-6 py-4">{appointment.canceled ? 'Sí' : 'No'}</td>
                  <td className="px-6 py-4">{appointment.patientId || 'No asignado'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleAvailability(appointment.id, appointment.available)}
                      className={`mr-2 px-2 py-1 rounded transition ${appointment.available ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                    >
                      {appointment.available ? 'Marcar como cita NO disponible' : 'Marcar como cita Disponible'}
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id, appointment.canceled)}
                      className={`px-2 py-1 rounded transition ${appointment.canceled ? 'bg-green-500' : 'bg-red-500'} text-white`}
                    >
                      {appointment.canceled ? 'Reactivar Cita' : 'Cancelar cita'}
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">No hay citas disponibles para este profesional.</div>
        )}
      </>
    </div>
  );
};

export default ProfessionalAgenda;
