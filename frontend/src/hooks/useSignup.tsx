import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { api } from "../utils/axios";

type SignupInputs = {
	rut: string;
	nombres: string;
	apellidos: string;
    domicilio: string;
    edad: number;
    telefono: number;
    contrasena: string;
    confirmarContrasena: string;
    gender: string;
    role: string;
};

const useSignup = () => {
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs: SignupInputs) => {
        await api.post("/auth/signup", inputs)
        .then(response => {
            console.log(response.data);
            toast('Usuario registrado con éxito');
            setAuthUser(response.data);
        })
        .catch(error => {
            console.log(error.response.data);
            toast.error(error.response.data.error);
        });
    };

    return signup;
};

export default useSignup;