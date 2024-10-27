// src/hooks/useResetPassword.ts
import { useState } from 'react';
import axios from 'axios';

const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetPassword = async ({ token, newPassword }: { token: string; newPassword: string }) => {
    try {
      const response = await axios.post('/api/passwordRecovery/reset', { token, newPassword });
      setMessage(response.data.message);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al restablecer la contraseña');
      setMessage(null);
    }
  };

  return { resetPassword, error, message };
};

export default useResetPassword;