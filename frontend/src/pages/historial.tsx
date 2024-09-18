  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';


  interface Paciente {
    id: string;
    nombre: string;
    rut: string;
    domicilio: string;
  }

  const Historial: React.FC = () => {
  
    const [pacientes, setPacientes] = useState<Paciente[]>([]);


    useEffect(() => {
      const fetchPacientes = async () => {
        try {
        
          const response = await fetch('/api/pacientes');
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
          <h2 className="text-black text-3xl font-bold mb-4">Historial</h2>

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
                    <p className="font-semibold text-gray-600 text-lg">{paciente.nombre}</p>
                    <p className="text-gray-600">RUT: {paciente.rut}</p>
                    <p className="text-gray-600">Ubicación: {paciente.domicilio}</p>
                  </div>
                  <button className="bg-green-300 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">
                    Ver historial
                  </button>  
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay pacientes disponibles.</p>
            )}
          </div>
        </div>


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
    );
  };

  export default Historial;