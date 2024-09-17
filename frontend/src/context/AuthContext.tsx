import { api } from "../utils/axios";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type AuthUserType = {
	id: string;
	rut: string;
	apellidos: string;
	domicilio: string;
	edad: number;
	telefono: number;
    username: string;
	nombres: string;
	gender: string;
	role: string;
};

const AuthContext = createContext<{
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
}>({
	authUser: null,
	setAuthUser: () => {},
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

	useEffect(() => {
		const getAuthUser = async () => {

            await api.get("/auth/me")
            .then(response => {
                console.log(response.data);
                setAuthUser(response.data);
            })
            .catch(error => {console.log(error.message)});
		};

		getAuthUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				authUser,
				setAuthUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};