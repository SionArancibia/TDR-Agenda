import { useEffect, useState } from 'react';
import { api } from '../utils/axios';

const GetUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/adminCrud/getUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/adminCrud/deleteUsers/${id}`);
            setUsers(users.filter((user: any) => user.id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Usuarios Registrados</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id} className="mb-4">
                        {user.nombres} {user.apellidos} - {user.role}
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 text-white py-1 px-2 ml-4 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetUsers;