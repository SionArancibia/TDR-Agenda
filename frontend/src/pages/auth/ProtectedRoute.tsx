import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole: string }) => {
    const { authUser } = useAuthContext();
    let storedUser = localStorage.getItem("user");

    if (!authUser && !storedUser) {
        console.log("No hay usuario autenticado o el contexto fue recargado");
        return <Navigate to="/login" />;
    }

    if (authUser?.role && (authUser?.role !== requiredRole)) {
        return <Navigate to="/unauthorized" />;
    }

  return children;
};
