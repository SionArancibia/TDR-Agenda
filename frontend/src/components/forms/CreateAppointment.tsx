import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../utils/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const AppointmentSchema = z.object({
    date: z.string().min(1, 'La fecha es obligatoria'),
    professionalId: z.string().min(1, 'El ID del profesional es obligatorio'),
    serviceId: z.string().nullable(),
    patientId: z.string().nullable(),
    available: z.boolean().default(true),
    homecare: z.boolean().default(false),
});

type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;

interface CreateAppointmentProps {
    onClose: () => void;
    professionalId?: string;
}

const CreateAppointment: React.FC<CreateAppointmentProps> = ({ onClose, professionalId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AppointmentSchemaType>({ 
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            date: '',
            professionalId: professionalId || '',
            serviceId: null,
            patientId: null,
            available: true,
            homecare: false,
        }
    });

    const onSubmit: SubmitHandler<AppointmentSchemaType> = async (data) => {
        try {
            await api.post('/appointments', data);
            toast.success('Cita creada con éxito.');
            onClose(); // Cerrar el modal después de crear la cita
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                console.error('Error al crear la cita:', error.response.data);
                toast.error(error.response.data.error || 'Error al crear la cita.');
            } else {
                console.error('Error inesperado:', error);
                toast.error('Error al crear la cita.');
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-gray-800 text-center text-2xl font-bold">Crear Cita</h2>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Fecha</label>
                            <input {...register("date")} type="datetime-local" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                            {errors.date && <span className="text-red-600">{errors.date.message}</span>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">ID del Profesional</label>
                            <input 
                                {...register("professionalId")} 
                                value={professionalId}
                                readOnly 
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                            />
                            {errors.professionalId && <span className="text-red-600">{errors.professionalId.message}</span>}
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">ID del Servicio (opcional)</label>
                            <input {...register("serviceId")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">ID del Paciente (opcional)</label>
                            <input {...register("patientId")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                        </div>

                        <div className="flex items-center">
                            <input {...register("available")} type="checkbox" className="mr-2" />
                            <label className="text-gray-800 text-sm">Disponible</label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input type="submit" value="Crear Cita" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"/>
                    </div>
                    <div className="mt-4">
                        <button onClick={onClose} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none">Cancelar</button>
                    </div>
                </form>

                
            </div>
        </div>
    );
};

export default CreateAppointment;
