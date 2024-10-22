import { toast } from "sonner";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";

interface ServiceData {
  name: string;
  description?: string;
  categoryId: string;
  isActive: boolean;
}

const useCreateService = () => {
  const navigate = useNavigate();

  const createService = async (data: ServiceData) => {
    try {
      const response = await api.post("/services", data);
      console.log(response.data);
      toast.success("Servicio creado exitosamente.");
      navigate("/services");
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.error || "Error al crear el servicio.");
      throw error;
    }
  };

  return createService;
};

export default useCreateService;
