import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";
import { AxiosError } from "axios";
import { useState } from "react";

type ResetPasswordInputs = {
  token: string;
  newPassword: string;
};

const useResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const resetPassword = async (inputs: ResetPasswordInputs) => {
    try {
      const response = await api.post("/passwordRecovery/resetPassword", inputs);
      console.log(response.data);
      console.log(response);
      // Mostrar el mensaje de éxito solo si la solicitud fue exitosa
      if (response.status === 200) {
        setMessage('Contraseña restablecida con éxito');
        toast('Contraseña restablecida con éxito');
        
        // Redirigir al usuario a una página específica si es necesario
        navigate("/login");
      } else {
        setError('Error inesperado al restablecer la contraseña');
        toast.error('Error inesperado al restablecer la contraseña');
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error(error.response.data);
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        console.error(error);
        setError('Error al restablecer la contraseña');
        toast.error('Error al restablecer la contraseña');
      }
    }
  };

  return { resetPassword, error, message };
};

export default useResetPassword;