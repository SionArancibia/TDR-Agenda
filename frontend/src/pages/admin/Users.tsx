import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/axios';
import { toast } from "sonner";

interface User {
    id: string;
    rut: string;
    nombres: string;
    apellidos: string;
    domicilio: string;
    edad: number;
    role: string;
    telefono: string;
    gender: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/users/deleteUser/${id}`);
            setUsers(users.filter(user => user.id !== id));
            toast('Usuario eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const handleUpdate = (id: string) => {
        navigate(`/updateUser/${id}`);
    };

    const handleRegisterClick = () => {
        navigate('/createUser');
    };

    return (
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
                    <button
                        onClick={handleRegisterClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Registrar Usuario
                    </button>
                    <Link
                        to="/dashboardAdmin"
                        className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200 w-auto"
                    >
                        <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Atrás
                    </Link>
                </div>
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Rut</th>
                            <th className="py-2 px-4 border">Nombres</th>
                            <th className="py-2 px-4 border">Apellidos</th>
                            <th className="py-2 px-4 border">Domicilio</th>
                            <th className="py-2 px-4 border">Edad</th>
                            <th className="py-2 px-4 border">Rol</th>
                            <th className="py-2 px-4 border">Teléfono</th>
                            <th className="py-2 px-4 border">Género</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border">{user.rut}</td>
                                <td className="py-2 px-4 border">{user.nombres}</td>
                                <td className="py-2 px-4 border">{user.apellidos}</td>
                                <td className="py-2 px-4 border">{user.domicilio}</td>
                                <td className="py-2 px-4 border">{user.edad}</td>
                                <td className="py-2 px-4 border">{user.role}</td>
                                <td className="py-2 px-4 border">{user.telefono}</td>
                                <td className="py-2 px-4 border">{user.gender}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded">
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(user.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;