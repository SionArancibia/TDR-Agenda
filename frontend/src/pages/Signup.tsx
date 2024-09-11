import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        rut: '',
        nombres: '',
        apellidos: '',
        domicilio: '', 
        edad: '',      
        telefono: '',  
        contrasena: '',
        confirmContrasena: '',
        gender: 'male', 
        role: 'professional', 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
                withCredentials: true,
            });
            
            console.log("User registered successfully:", response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Error during registration:", error.response?.data || error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700">RUT</label>
                        <input
                            type="text"
                            name="rut"
                            value={formData.rut}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Domicilio</label>
                        <input
                            type="text"
                            name="domicilio"
                            value={formData.domicilio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Edad</label>
                        <input
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmContrasena"
                            value={formData.confirmContrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Género</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            >
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Rol</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            >
                            <option value="patient">Paciente</option>
                            <option value="professional">Profesional</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;