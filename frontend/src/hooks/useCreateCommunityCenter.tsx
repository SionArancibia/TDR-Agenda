import { toast } from "sonner";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";

interface CommunityCenterData {
  name: string;
  address: string;
  phoneNumber: string;
  managerName: string;
  description?: string;
}

const useCreateCommunityCenter = () => {
  const navigate = useNavigate();
  const createCenter = async (data: CommunityCenterData) => {
    try {
      const response = await api.post("communityCenters", data);
      console.log(response.data);
      toast.success("Centro comunitario creado exitosamente.");
      navigate("/communityCenters")
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.error || "Error al crear el centro comunitario.");
      throw error; 
    }
  };

  return createCenter; 
};

export default useCreateCommunityCenter;
