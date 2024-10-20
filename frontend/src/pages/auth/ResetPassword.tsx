import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResetPassword from '../../hooks/useResetPassword'; // Importa el hook personalizado

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { resetPassword, error, message } = useResetPassword(); // Usa el hook personalizado

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    await resetPassword({ token: token!, newPassword }); // Llama a la función del hook

    if (!error) {
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">
        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Restablecer Contraseña</h2>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 px-4 py-3 rounded-md hover:bg-blue-700">
              Restablecer Contraseña
            </button>
            {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;