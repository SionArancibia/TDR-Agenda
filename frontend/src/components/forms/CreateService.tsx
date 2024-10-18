import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useCreateService from '../../hooks/useCreateService';
import { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { Link } from 'react-router-dom';

// Esquema de validación con Zod
const ServiceSchema = z.object({
  name: z.string().min(1, 'El nombre del servicio es obligatorio'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'La categoría es obligatoria'),
  isActive: z.boolean().default(true),
});

type ServiceSchemaType = z.infer<typeof ServiceSchema>;

const CreateService: React.FC = () => {
  const createService = useCreateService();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceSchemaType>({
    resolver: zodResolver(ServiceSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/serviceCategories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        toast.error('Error al obtener las categorías.');
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<ServiceSchemaType> = async (data) => {
    try {
      await createService(data);
      toast.success('Servicio creado exitosamente.');
    } catch (error: any) {
      toast.error(error.message || 'Error creando el servicio.');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-lg w-full">
          <div className="p-4 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Registrar Servicio</h2>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Nombre del Servicio</label>
                <input 
                  {...register('name')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                />
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Descripción (Opcional)</label>
                <textarea 
                  {...register('description')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 resize-none" 
                  rows={3}
                />
              </div>
              

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Categoría</label>
                <select 
                  {...register('categoryId')} 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <span className="text-red-600">{errors.categoryId.message}</span>}
                <div className="mt-2">
                    <Link to="/manageCategories" className="text-blue-600 hover:underline">
                    Administrar Categorías
                    </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  {...register('isActive')} 
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-800 text-sm">¿Activo?</label>
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Registrar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
