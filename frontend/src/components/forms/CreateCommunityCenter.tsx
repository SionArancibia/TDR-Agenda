import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useCreateCommunityCenter from '../../hooks/useCreateCommunityCenter';

// Esquema de validación con Zod
const CommunityCenterSchema = z.object({
  name: z.string().min(1, 'El nombre del centro es obligatorio'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  phoneNumber: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  managerName: z.string().min(1, 'El nombre del encargado es obligatorio'),
  description: z.string().optional(),
});

type CommunityCenterSchemaType = z.infer<typeof CommunityCenterSchema>;

const CreateCommunityCenter: React.FC = () => {
  const createCenter = useCreateCommunityCenter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityCenterSchemaType>({
    resolver: zodResolver(CommunityCenterSchema),
  });

  const onSubmit: SubmitHandler<CommunityCenterSchemaType> = async (data) => {
    try {
      await createCenter(data);
      toast.success('Centro comunitario creado exitosamente.');
    } catch (error: any) {
      toast.error(error.message || 'Error creando el centro comunitario.');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-lg w-full">
          <div className="p-4 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Registrar Centro Comunitario</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Nombre del Centro</label>
                <input 
                  {...register('name')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Dirección</label>
                <input 
                  {...register('address')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.address && <span className="text-red-600">{errors.address.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Teléfono</label>
                <input 
                  {...register('phoneNumber')} 
                  type="tel" 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.phoneNumber && <span className="text-red-600">{errors.phoneNumber.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Encargado</label>
                <input 
                  {...register('managerName')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.managerName && <span className="text-red-600">{errors.managerName.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Descripción (Opcional)</label>
                <textarea 
                  {...register('description')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 resize-none" 
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Registrar Centro
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityCenter;
