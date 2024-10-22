import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/getUsers');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        toast.error('Error obteniendo usuarios.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/deleteUser/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      toast.success('Usuario eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      toast.error('No se pudo eliminar el usuario.');
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/updateUser/${id}`);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);

    const filtered = role
      ? users.filter((user) => user.role === role)
      : users;
    setFilteredUsers(filtered);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.rut.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Contar usuarios totales y filtrados
  const totalUsers = users.length;
  const totalFiltered = filteredUsers.length;

  return (
    <>
    <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-lg font-semibold text-center p-4">Manejo de usuarios</h2> 
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-lg w-80 dark:bg-gray-700 dark:text-white"
            placeholder="Buscar usuario por nombre o RUT"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos los Roles</option>
            <option value="admin">Admin</option>
            <option value="professional">Profesional</option>
            <option value="patient">Paciente</option>
          </select>
          <button
            onClick={() => navigate('/createUser')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Registrar Usuario
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <span className="font-bold">Total de Usuarios:</span> {totalUsers} &nbsp; | &nbsp;
        <span className="font-bold">Usuarios Filtrados:</span> {totalFiltered}
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {['RUT', 'Nombre', 'Apellidos', 'Correo', 'Rol', 'Teléfono', 'Género', 'Acciones'].map((header) => (
              <th key={header} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{user.rut}</td>
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Users;
