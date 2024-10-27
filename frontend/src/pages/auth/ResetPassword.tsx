import React  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useResetPassword from '../../hooks/useResetPassword'; // Importa el hook personalizado

// Definir el esquema de validación
const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirme su contraseña'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { resetPassword, error } = useResetPassword(); // Usa el hook personalizado

  const { register, handleSubmit, formState: { errors }, setError } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
    await resetPassword({ token: token!, newPassword: data.newPassword }); // Llama a la función del hook
    
    if (error === 'La nueva contraseña no puede ser la misma que la anterior') {
      setError('newPassword', { type: 'manual', message: error });
    } else if (!error) {
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">
        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Restablecer Contraseña</h2>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword")}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
              {errors.newPassword && <span className="text-red-600">{errors.newPassword.message}</span>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
              {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Restablecer Contraseña
            </button>
          </form>
          {error && error !== 'La nueva contraseña no puede ser la misma que la anterior' && (
            <div className="mt-4 text-red-600 text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;