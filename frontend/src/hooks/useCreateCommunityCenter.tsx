import { toast } from "sonner";
import { api } from "../utils/axios";

interface CommunityCenterData {
  name: string;
  address: string;
  phoneNumber: string;
  managerName: string;
  description?: string;
}

const useCreateCommunityCenter = () => {
  const createCenter = async (data: CommunityCenterData) => {
    try {
      const response = await api.post("communityCenters", data);
      console.log(response.data);
      toast.success("Centro comunitario creado exitosamente.");
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.error || "Error al crear el centro.");
      throw error; // Re-throw to allow further handling if needed
    }
  };

  return createCenter; // Return the function directly, not an object
};

export default useCreateCommunityCenter;
