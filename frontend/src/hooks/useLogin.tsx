import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const useLogin = () => {
	const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async (rut: string, password: string) => {
        await api.post("/auth/login", { rut, password })
        .then(response => {
            toast('Ingresó con éxito');
            localStorage.setItem("user", response.data.id);
            setAuthUser(response.data);
            navigate("/");
        })
        .catch(error => {
            console.log(error.response.data);
            toast.error(error.response.data.error);
        });
    };

	return login;
};
export default useLogin;