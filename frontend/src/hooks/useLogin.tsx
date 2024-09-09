import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios";

const useLogin = () => {
	const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

	const login = async (username: string, password: string) => {
        await api.post("/auth/login", {username, password})
        .then(response => {
            console.log(response.data);
            toast('Ingresó con exito');
            setAuthUser(response.data);
            
            if(response.data.role === "admin") {
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