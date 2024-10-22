import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '../../utils/axios';
import { useParams } from 'react-router-dom';

const ScheduleSchema = z.object({
  professionalId: z.string().min(1, 'El ID del profesional es obligatorio'),
  day: z.string().min(1, 'El día es obligatorio'),
  startTime: z.string().min(1, 'La hora de inicio es obligatoria'),
  endTime: z.string().min(1, 'La hora de fin es obligatoria'),
});

// Extender el tipo para incluir el id
type ScheduleSchemaType = z.infer<typeof ScheduleSchema> & { id: string };

const ManageSchedule: React.FC = () => {
  const { professionalId } = useParams<{ professionalId: string }>();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSchemaType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduleSchemaType>({
    resolver: zodResolver(ScheduleSchema),
  });

  const daysOfWeek = [
    { value: 'Monday', label: 'Lunes' },
    { value: 'Tuesday', label: 'Martes' },
    { value: 'Wednesday', label: 'Miércoles' },
    { value: 'Thursday', label: 'Jueves' },
    { value: 'Friday', label: 'Viernes' },
    { value: 'Saturday', label: 'Sábado' },
    { value: 'Sunday', label: 'Domingo' },
  ];

  // Función para traducir el día
  const translateDay = (day: string) => {
    const translations: { [key: string]: string } = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    };
    return translations[day] || day;
  };

  const fetchSchedules = async () => {
    try {
      const response = await api.get(`/schedules/${professionalId}`);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
      toast.error('Error al obtener los horarios.');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [professionalId]);

  const onSubmit: SubmitHandler<ScheduleSchemaType> = async (data) => {
    try {
      if (selectedSchedule) {
        await api.put(`/schedules/${selectedSchedule.id}`, { ...data });
        toast.success('Horario actualizado con éxito.');
      } else {
        await api.post('/schedules', { ...data });
        toast.success('Horario creado con éxito.');
      }
      reset();
      setSelectedSchedule(null);
      fetchSchedules();
    } catch (error: any) {
      toast.error('Error al guardar el horario.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/schedules/${id}`);
      toast.success('Horario eliminado con éxito.');
      fetchSchedules();
    } catch (error: any) {
      toast.error('Error al eliminar el horario.');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-lg w-full">
          <div className="p-4 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              {selectedSchedule ? 'Actualizar Horario' : 'Crear Horario'}
            </h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">ID del Profesional</label>
                <input 
                  {...register('professionalId')} 
                  defaultValue={professionalId}
                  readOnly
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.professionalId && <span className="text-red-600">{errors.professionalId.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Día</label>
                <select 
                  {...register('day')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                >
                  <option value="">Selecciona un día</option>
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
                {errors.day && <span className="text-red-600">{errors.day.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Hora de Inicio</label>
                <input 
                  {...register('startTime')} 
                  type="time" 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.startTime && <span className="text-red-600">{errors.startTime.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Hora de Fin</label>
                <input 
                  {...register('endTime')} 
                  type="time" 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.endTime && <span className="text-red-600">{errors.endTime.message}</span>}
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {selectedSchedule ? 'Actualizar Horario' : 'Crear Horario'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8">
            <h3 className="text-gray-800 text-lg font-bold">Horarios Existentes</h3>
            <ul className="mt-4 space-y-2">
              {schedules.map((schedule) => (
                <li key={schedule.id} className="flex justify-between items-center p-2 border border-gray-300 rounded-md">
                  <div>
                    <p>{translateDay(schedule.day)} de {schedule.startTime} a {schedule.endTime}</p>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(schedule.id)} className="ml-2 text-red-600 hover:underline">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;
