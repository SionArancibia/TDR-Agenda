import { toast } from "sonner";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";

type CreateUsersInputs = {
	rut: string;
	firstName: string;
	lastName: string;
    address: string;
    age: number;
    email: string;
    phoneNumber: number;
    password: string;
    confirmPassword: string;
    gender: string;
    role: string;
};

const useCreateUsers = () => {
    const navigate = useNavigate();
    
    const createUsers = async (inputs: CreateUsersInputs) => {
        await api.post("/users/createUser", inputs)
        .then(response => {
            console.log(response.data);
            toast('Usuario registrado con éxito');
            navigate("/users")
            
        })
        .catch(error => {
            console.log(error.response.data);
            toast.error(error.response.data.error);
        });
    };

    return createUsers;
};

export default useCreateUsers;