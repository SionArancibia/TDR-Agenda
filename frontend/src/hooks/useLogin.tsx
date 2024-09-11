import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const useLogin = () => {
	const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async (rut: string, contrasena: string) => {
        await api.post("/auth/login", { rut, contrasena })
        .then(response => {
            console.log(response.data);
            toast('Ingresó con éxito');
            setAuthUser(response.data);
            
            if (response.data.role === "admin") {
                navigate("/dashboard");
            }
        })
        .catch(error => {
            console.log(error.response.data);
            toast.error(error.response.data.error);
        });
    };

	return login;
};
export default useLogin;