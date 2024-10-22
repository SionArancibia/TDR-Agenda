import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '../../utils/axios';

const BlockScheduleSchema = z.object({
  startDate: z.string().min(1, 'La fecha de inicio es obligatoria'),
  endDate: z.string().min(1, 'La fecha de fin es obligatoria'),
  reason: z.string().min(1, 'La razón es obligatoria'),
});

type BlockScheduleSchemaType = z.infer<typeof BlockScheduleSchema>;

interface BlockScheduleModalProps {
  professionalId?: string;
  onClose: () => void;
}

const BlockScheduleModal: React.FC<BlockScheduleModalProps> = ({ professionalId, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BlockScheduleSchemaType>({
    resolver: zodResolver(BlockScheduleSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      reason: '',
    }
  });

  const onSubmit = async (data: BlockScheduleSchemaType) => {
    try {
      await api.post('/blocks', { ...data, professionalId });
      toast.success('Horario bloqueado con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al bloquear horario:', error);
      toast.error('Error al bloquear horario.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-gray-800 text-center text-2xl font-bold">Bloquear Horario</h2>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Fecha de Inicio</label>
              <input {...register("startDate")} type="datetime-local" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
              {errors.startDate && <span className="text-red-600">{errors.startDate.message}</span>}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Fecha de Fin</label>
              <input {...register("endDate")} type="datetime-local" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
              {errors.endDate && <span className="text-red-600">{errors.endDate.message}</span>}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Razón</label>
              <textarea {...register("reason")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
              {errors.reason && <span className="text-red-600">{errors.reason.message}</span>}
            </div>
          </div>

          <div className="mt-4">
            <input type="submit" value="Bloquear Horario" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" />
          </div>
          <div className="mt-4">
              <button onClick={onClose} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockScheduleModal;
