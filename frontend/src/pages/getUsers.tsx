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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Usuarios Registrados</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        {user.nombres} {user.apellidos} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetUsers;