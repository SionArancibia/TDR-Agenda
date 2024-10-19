import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { api } from '../../utils/axios';

// Esquema de validación con Zod
const AppointmentSchema = z.object({
  professionalId: z.string().min(1, 'El ID del profesional es obligatorio'),
  duration: z
    .number()
    .min(1, 'La duración debe ser al menos de 1 minuto')
    .max(240, 'La duración no puede exceder 240 minutos'),
  date: z.string().min(1, 'La fecha es obligatoria'),
});

type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;

const GenerateAppointments: React.FC = () => {
  const [professionals, setProfessionals] = useState<{ id: string; name: string }[]>([]);
  const [appointments, setAppointments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentSchemaType>({
    resolver: zodResolver(AppointmentSchema),
  });

  // Obtener lista de profesionales al cargar el componente
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await api.get('/professionals');
        console.log("profesionales,: ", response.data)
        setProfessionals(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Error al obtener los profesionales.');
      }
    };

    fetchProfessionals();
  }, []);

  const onSubmit: SubmitHandler<AppointmentSchemaType> = async (data) => {
    try {
      const response = await api.post('/professionals/generate/available/appointments', data);
      setAppointments(response.data);
      toast.success('Citas generadas con éxito.');
    } catch (error: any) {
      toast.error('Error al generar citas.');
      console.log(error)
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-lg w-full">
          <div className="p-4 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Generar Citas</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Profesional</label>
                <select
                  {...register('professionalId')}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                >
                  <option value="">Selecciona un profesional</option>
                  {professionals.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.id} 
                    </option>
                  ))}
                </select>
                {errors.professionalId && <span className="text-red-600">{errors.professionalId.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Duración (minutos)</label>
                <input
                  type="number"
                  {...register('duration', { valueAsNumber: true })}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                />
                {errors.duration && <span className="text-red-600">{errors.duration.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Fecha</label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                />
                {errors.date && <span className="text-red-600">{errors.date.message}</span>}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Generar Citas
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <h3 className="text-gray-800 text-lg font-semibold">Citas Disponibles</h3>
            {appointments.length > 0 ? (
              <ul className="list-group mt-2">
                {appointments.map((appointment: any) => (
                  <li key={appointment.id} className="list-group-item border-b py-2">
                    <strong>Fecha:</strong> {new Date(appointment.date).toLocaleString()}
                    <br />
                    <strong>Disponible:</strong> {appointment.available ? 'Sí' : 'No'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-600">No hay citas disponibles generadas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateAppointments;
