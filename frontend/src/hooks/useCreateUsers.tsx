import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { api } from "../utils/axios";

type CreateUsersInputs = {
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

const useCreateUsers = () => {
    const { setAuthUser } = useAuthContext();

    const createUsers = async (inputs: CreateUsersInputs) => {
        await api.post("/adminCrud/createUsers", inputs)
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

    return createUsers;
};

export default useCreateUsers;