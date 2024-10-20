import { toast } from "sonner";
import { api } from "../utils/axios";

const useAgenda = () => {
  const getAppointments = async (professionalRut: string, month: string, year: string) => {
    try {
      const response = await api.get("professionals/appointments/byDate", {
        params: { professionalRut, month, year }
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  const createAppointmentRequest = async (data: { appointmentId: string; cancelReason: string }) => {
    try {
      const response = await api.post("requests/cancelAppointmentRequest", data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
    }
  };

  return { getAppointments, createAppointmentRequest };
};

export default useAgenda;