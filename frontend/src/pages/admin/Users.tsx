import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/axios';
import { toast } from 'sonner';

interface User {
  id: string;
  rut: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  age: number;
  phoneNumber: string;
  role: string;
  gender: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>(''); // Filtro del rol
  const navigate = useNavigate();

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/getUsers');
        setUsers(response.data);
        setFilteredUsers(response.data); // Inicialmente mostrar todos
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  // Función para manejar la eliminación de usuarios
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/deleteUser/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Actualizar lista filtrada también
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

  // Función para manejar el cambio en el filtro por rol
  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);

    if (role === '') {
      setFilteredUsers(users); // Si no hay filtro, mostrar todos
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered);
    }
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

        {/* Filtro por tipo de usuario */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Filtrar por Rol:</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todos</option>
            <option value="admin">Admin</option>
            <option value="professional">Professional</option>
            <option value="patient">Paciente</option>
          </select>
        </div>

        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Rut</th>
              <th className="py-2 px-4 border">Nombres</th>
              <th className="py-2 px-4 border">Apellidos</th>
              <th className="py-2 px-4 border">Dirección</th>
              <th className="py-2 px-4 border">Edad</th>
              <th className="py-2 px-4 border">Correo</th>
              <th className="py-2 px-4 border">Rol</th>
              <th className="py-2 px-4 border">Teléfono</th>
              <th className="py-2 px-4 border">Género</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border">{user.rut}</td>
                <td className="py-2 px-4 border">{user.firstName}</td>
                <td className="py-2 px-4 border">{user.lastName}</td>
                <td className="py-2 px-4 border">{user.address}</td>
                <td className="py-2 px-4 border">{user.age}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">{user.phoneNumber}</td>
                <td className="py-2 px-4 border">{user.gender}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                  >
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
