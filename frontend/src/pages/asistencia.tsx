import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Paciente {
  id: number;
  nombre: string;
  rut: string;
  presente: boolean;
  
  
}


interface PacienteConHora extends Paciente {
  hora: string;
}


const horasDisponibles = [
  "11:30-12:30",
  "13:30-14:30",
  "16:30-17:30",
  "17:30-18:30",
];


const pacientesData: Paciente[] = [
  { id: 1, nombre: 'Pedro Cuevas Medina', rut: '0123456789', presente: true },
  { id: 2, nombre: 'Clara Silva Leal', rut: '86993541-3', presente: false },
  { id: 3, nombre: 'Maria Silva Leal', rut: '123456789', presente: true },
];


const asignarHorasAPacientes = (pacientes: Paciente[], horas: string[]): PacienteConHora[] => {
  return pacientes.map((paciente, index) => {
    const hora = horas[index % horas.length]; 
    return { ...paciente, hora };
  });
};

const RegistroAsistencia: React.FC = () => {
  const [pacientes, setPacientes] = useState<PacienteConHora[]>([]);

  useEffect(() => {
   
    const pacientesConHoras = asignarHorasAPacientes(pacientesData, horasDisponibles);
    setPacientes(pacientesConHoras);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">Registro de Asistencia</h1>
      
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3">Nombre Usuario</th>
              <th className="p-3">RUT</th>
              <th className="p-3">Horario</th>
              <th className="p-3">Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id} className="border-b">
                <td className="p-3 text-center text-gray-700">{paciente.nombre}</td>
                <td className="p-3 text-center text-gray-700">{paciente.rut}</td>
                <td className="p-3 text-center text-gray-700">{paciente.hora}</td>
                <td className="p-3 text-center">
                  {paciente.presente ? (
                    <span className="bg-green-300 text-white px-4 py-2 rounded-full shadow-md">Presente</span>
                  ) : (
                    <span className="bg-red-300 text-white px-4 py-2 rounded-full shadow-md">Ausente</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-center mt-8">
          <Link
            to="/"
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
    </div>
  );
};

export default RegistroAsistencia;
