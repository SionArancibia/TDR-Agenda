import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Agenda_P: React.FC = () => {



  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100">

      
      <div className="w-full max-w-4xl mb-8 mx-auto">
        <div className="flex items-center bg-white rounded-full shadow-md p-4">
          <button className="p-2">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l5-5m-5 5a7 7 0 1110 0 7 7 0 01-10 0z" />
            </svg>
          </button>
        </div>
      </div>


      <h2 className="text-2xl text-black font-bold mb-4 text-center">Horas agendadas</h2>


  


      
      <div className="w-full flex justify-center mb-8">
        <Link to="/" className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200 w-auto">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
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

export default Agenda_P;
