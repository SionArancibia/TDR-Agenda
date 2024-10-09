import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { Link, useNavigate, useParams, /* useNavigate */ } from 'react-router-dom';
import { toast } from "sonner";

const UpdateUsers = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        rut: '',
        firstName: '',
        lastName: '',
        address: '',
        age: '',
        role: '',
        phoneNumber: '',
        gender: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/getUser/${id}`);
                const selectedUser = response.data;
                setUser({
                    rut: selectedUser.rut,
                    firstName: selectedUser.firstName,
                    lastName: selectedUser.lastName,
                    address: selectedUser.address,
                    age: selectedUser.age,
                    role: selectedUser.role,
                    phoneNumber: selectedUser.phoneNumber,
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
            console.log(user);
            await api.put(`/users/updateUser/${id}`, user);
            toast('Usuario actualizado con éxito');
            navigate('/users');
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

                <label className="block mb-2">firstName</label>
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">lastName</label>
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">address</label>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="border px-4 py-2 w-full mb-4"
                />

                <label className="block mb-2">age</label>
                <input
                    type="number"
                    name="age"
                    value={user.age}
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
                    <option value="patient">Paciente</option>
                    <option value="professional">Profesional</option>
                    <option value="admin">Administrador</option>
                </select>

                <label className="block mb-2">Telefóno</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={user.phoneNumber}
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
            <div className="w-full flex justify-center mt-10 mb-10">
                <Link
                    to="/users"
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
        </div>
    );
};

export default UpdateUsers;