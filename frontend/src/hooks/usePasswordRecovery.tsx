import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";
import { AxiosError } from "axios";

type PasswordRecoveryInputs = {
  email: string;
};

const usePasswordRecovery = () => {
  const navigate = useNavigate();

  const passwordRecovery = async (inputs: PasswordRecoveryInputs) => {
    try {
      const response = await api.post("/passwordRecovery/passwordRecovery", inputs);
      console.log(response.data);
        console.log(response);
      // Mostrar el mensaje de éxito solo si la solicitud fue exitosa
      if (response.status === 200) {
        toast('Solicitud de recuperación de contraseña enviada con éxito');
        
        // Redirigir al usuario a una página específica si es necesario
        navigate("/somePage");
      } else {
        toast.error('Error inesperado al enviar la solicitud de recuperación de contraseña');
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error(error.response.data);
        toast.error(error.response.data.error);
      } else {
        console.error(error);
        toast.error('Error al enviar la solicitud de recuperación de contraseña');
      }
    }
  };

  return { passwordRecovery };
};

export default usePasswordRecovery;