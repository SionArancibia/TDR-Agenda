import { toast } from "sonner";
import { api } from "../utils/axios";

const useAgenda = () => {
  const getCitas = async (profesionalId: string, pacienteId: string, mes: string, año: string) => {
    try {
      const response = await api.get("/citas", {
        params: { profesionalId, pacienteId, mes, año }
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  return { getCitas };
};

export default useAgenda;
