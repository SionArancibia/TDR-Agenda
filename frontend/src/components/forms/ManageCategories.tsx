import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '../../utils/axios';

// Esquema de validación con Zod
const CategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es obligatorio'),
});

type CategorySchemaType = z.infer<typeof CategorySchema>;

interface Category {
  id: string;
  name: string;
}

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
  });

  // Obtener todas las categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/serviceCategories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Error al obtener las categorías.');
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<CategorySchemaType> = async (data) => {
    try {
      await api.post('/serviceCategories', data);
      toast.success('Categoría creada exitosamente.');
      reset();
      // Refrescar la lista de categorías
      const response = await api.get('/serviceCategories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Error al crear la categoría.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/serviceCategories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Categoría eliminada exitosamente.');
    } catch (error) {
      toast.error('Error al eliminar la categoría.');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] p-4">
      <h2 className="text-gray-800 text-center text-2xl font-bold">Gestionar Categorías</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Nombre de la Categoría</label>
          <input
            {...register('name')}
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Crear Categoría
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Categorías Existentes</h3>
        <ul className="mt-2">
          {categories.map(category => (
            <li key={category.id} className="flex justify-between items-center bg-white border border-gray-300 p-2 rounded-md mb-2">
              <span>{category.name}</span>
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCategories;
