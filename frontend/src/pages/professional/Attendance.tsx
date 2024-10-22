import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  rut: string;
  patientId:string;
}

const Attendance: React.FC = () => {

  const [pacientes, setPacientes] = useState<Patient[]>([]);


  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/patients');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };
    fetchPacientes();
  }, []);


  
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-black text-3xl font-bold mb-4">Asistencia</h2>

        <div className="flex items-center bg-white rounded-full shadow-md p-4 w-full mb-6">
          <button className="p-2">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <input
            type="text"
            className="ml-4 flex-1 bg-transparent outline-none text-gray-700"
            placeholder="Buscar pacientes"
          />
          <button className="p-2">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l5-5m-5 5a7 7 0 1110 0 7 7 0 01-10 0z"></path>
            </svg>
          </button>
        </div>

      
        <div className="overflow-y-auto max-h-96 space-y-4 pr-2">
        
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <div
                key={paciente.id}
                className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
              >
              <div>
                  <p className="font-semibold text-gray-600 text-lg">Nombre : {paciente.firstName} {paciente.lastName}</p>
                  <p className="text-gray-600">RUT: {paciente.rut}</p>
                 
                </div>
                <Link to={`/registro/${paciente.id}`}>
        <button className="bg-green-300 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">
          Ver Registro de Asistencia
        </button>
      </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay pacientes disponibles.</p>
          )}
        </div>
      </div>


      <div className="w-full flex justify-center mt-8">
        <Link
          to="/dashboardProfessional"
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

export default Attendance;
