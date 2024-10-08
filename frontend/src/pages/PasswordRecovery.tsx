import React, { useState } from 'react';
import usePasswordRecovery from '../hooks/usePasswordRecovery'; // Importar el hook

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { passwordRecovery } = usePasswordRecovery(); // Usar el hook

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await passwordRecovery({ email });
      setMessage('Solicitud de recuperación de contraseña enviada con éxito');
      setError(null);
    } catch (err) {
      setError('Error al enviar la solicitud de recuperación de contraseña.');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Recuperación de Contraseña</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block" htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                />
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 px-4 py-3 rounded-md hover:bg-blue-700">
                Enviar
              </button>
            </form>
            {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;