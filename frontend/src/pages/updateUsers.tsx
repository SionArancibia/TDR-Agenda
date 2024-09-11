import React, { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUsers = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        rut: '',
        nombres: '',
        apellidos: '',
        domicilio: '',
        edad: '',
        role: '',
        telefono: '',
        gender: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/adminCrud/getUser/${id}`);
                const selectedUser = response.data;
                setUser({
                    rut: selectedUser.rut,
                    nombres: selectedUser.nombres,
                    apellidos: selectedUser.apellidos,
                    domicilio: selectedUser.domicilio,
                    edad: selectedUser.edad,
                    role: selectedUser.role,
                    telefono: selectedUser.telefono,
                    gender: selectedUser.gender,
                });
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/adminCrud/updateUsers/${id}`, user);
            navigate('/getUsers'); 
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Actualizar Usuario</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">

            <label className="block mb-2">Rut</label>
                <input
                    type="text"
                    name="rut"
                    value={user.rut}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Nombres</label>
                <input
                    type="text"
                    name="nombres"
                    value={user.nombres}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Apellidos</label>
                <input
                    type="text"
                    name="apellidos"
                    value={user.apellidos}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Domicilio</label>
                <input
                    type="text"
                    name="domicilio"
                    value={user.domicilio}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Edad</label>
                <input
                    type="number"
                    name="edad"
                    value={user.edad}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Rol</label>
                <select
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                >
                    <option value="professional">Profesional</option>
                    <option value="admin">Admin</option>
                </select>

                <label className="block mb-2">Telefóno</label>
                <input
                    type="tel"
                    name="telefono"
                    value={user.telefono}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">Género</label>
                <select
                    name="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                >
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                </select>

                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Actualizar Usuario
                </button>
            </div>
        </div>
    );
};

export default UpdateUsers;