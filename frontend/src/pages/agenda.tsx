import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import useAgenda from '../hooks/useAgenda';
import { useAuthContext } from '../context/AuthContext';
// Definir la interfaz de una cita
interface Appointment {
  id: number;
  name: string;
  rut: string;
  fecha: string;
  hora: string;
  tipoServicio: string;
  centroComunitario: string;
  reducedMobility: boolean;
  chronicDisease: boolean;
  attendance: boolean;
}

const meses = [
  { nombre: "Enero", valor: "01" },
  { nombre: "Febrero", valor: "02" },
  { nombre: "Marzo", valor: "03" },
  { nombre: "Abril", valor: "04" },
  { nombre: "Mayo", valor: "05" },
  { nombre: "Junio", valor: "06" },
  { nombre: "Julio", valor: "07" },
  { nombre: "Agosto", valor: "08" },
  { nombre: "Septiembre", valor: "09" },
  { nombre: "Octubre", valor: "10" },
  { nombre: "Noviembre", valor: "11" },
  { nombre: "Diciembre", valor: "12" },
];

// Formulario de la agenda
const AgendaForm = () => {
  const { authUser } = useAuthContext(); // Desestructurar para obtener el usuario
  const { getCitas } = useAgenda(); // Desestructurar para obtener la función getCitas
  const [rut, setRut] = useState('');
  const [mes, setMes] = useState('');
  const [año, setAño] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());


  // Actualizar profesionalId cuando authUser cambie
  useEffect(() => {
    if (authUser !== null) {
      setRut(authUser.rut);
      console.log(authUser);
    }
  }, [authUser]);

  // para que se actualice la lista de citas cuando se cambie de mes o año
  useEffect(() => {
    if (mes && año) {
      fetchAppointments();
    }
  }, [mes, año]);

  const fetchAppointments = async () => {
    if ( !mes || !año) {
      toast.error('Faltan parámetros requeridos');
      return;
    }
    try {
      const citasData = await getCitas(rut, selectedMonth.toString(), selectedYear.toString());
      setAppointments(citasData || []); // Asegurarse de que citasData sea un arreglo
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); // En caso de error, establecer appointments como un arreglo vacío
      toast.error('Error al obtener las citas');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleDetailsClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(false);
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
  };

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(false);
    toast('Cita cancelada');
  };

  // Cambiar el mes de la agenda, con un offset de -1 o 1
  const handleMonthChange = (offset: number) => {
    const newMonth = parseInt(mes) + offset;
    if (newMonth > 12) {
      setMes('1');
      setAño((prevAño) => (parseInt(prevAño) + 1).toString());
    } else if (newMonth < 1) {
      setMes('12');
      setAño((prevAño) => (parseInt(prevAño) - 1).toString());
    } else {
      setMes(newMonth.toString());
    }
    fetchAppointments(); // Llamar a fetchAppointments después de actualizar el mes y año
  };

  // Genera un arreglo de los meses a mostrar, simulando una cuadrícula de 4 meses.
  const getMonthsToDisplay = () => {
    const months = [];
    for (let i = 0; i < 4; i++) {
      const month = (selectedMonth + i - 1) % 12 + 1; // 1-12
      months.push(new Date(selectedYear, month - 1).toLocaleString('es-ES', { month: 'long' }));
    } //toLocaleString convierte la fecha en un string con el mes en palabras
    return months;
  };



  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100 p-4">
      {/* Barra de búsqueda */}
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

      {/* Título */}
      <h2 className="text-2xl text-black font-bold mb-4 text-center">Horas agendadas</h2>

      {/* Selector de meses con navegación */}
      <div className="flex justify-center items-center space-x-4 mb-2">
        <button
          onClick={() => handleMonthChange(-1)} // Retroceder un mes
          className="px-4 py-2 rounded-full bg-green-400 hover:bg-green-500 text-white"
        >
          &#8592; {/* Flecha izquierda */}
        </button>

        {/* Vista en cuadrícula de 4 meses */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          {getMonthsToDisplay().map((month, index) => ( // Muestra los meses en la cuadrícula
            <div
              key={index} // Key para React
              onClick={() => setSelectedMonth((selectedMonth + index - 1) % 12 + 1)} // Cambiar mes, index es el offset del mes
              className={`p-4 border border-gray-300 rounded-lg text-center font-semibold text-lg shadow-md cursor-pointer
                ${selectedMonth === index + 1 ? 'bg-green-500 text-white' : 'bg-green-400 text-white hover:bg-green-500'}`}
            >
              {month}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleMonthChange(1)} // Avanzar un mes
          className="px-4 py-2 rounded-full bg-green-400 hover:bg-green-500 text-white"
        >
          &#8594; {/* Flecha derecha */}
        </button>
      </div>

      {/* Mostrar el año debajo */}
      <div className="text-center text-gray-500 mb-4">
        {selectedYear}
      </div>

      {/* Lista de citas */}
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{appointment.name}</h3>
              <p>{appointment.fecha} - {appointment.hora}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleDetailsClick(appointment)}
                className="bg-green-400 text-white px-4 py-2 rounded-full"
              >
                Detalles
              </button>
              <button
                onClick={() => handleEditClick(appointment)}
                className="bg-green-400 text-white px-4 py-2 rounded-full"
              >
                Editar
              </button>
              <button
                onClick={() => handleCancelClick(appointment)}
                className="bg-red-400 text-white px-4 py-2 rounded-full"
                >
                  Cancelar
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Botón Atrás */}
      <div className="w-full flex justify-center mt-8">
        <Link to="/" className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200">
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

      {/* Modal de detalles o edición */}
      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            {isEditing ? (
              <div>
                <h3 className="text-lg font-bold">Editar Cita</h3>
                <form>
                  <label className="block mb-2">
                    Nombre:
                    <input
                      type="text"
                      value={selectedAppointment.name}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </label>
                  <label className="block mb-2">
                    RUT:
                    <input
                      type="text"
                      value={selectedAppointment.rut}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </label>
                  <label className="block mb-2">
                    Hora:
                    <input
                      type="text"
                      value={selectedAppointment.hora}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </label>
                  <label className="block mb-2">
                    Asistencia:
                    <input
                      type="checkbox"
                      checked={selectedAppointment.attendance}
                      className="border border-gray-300 rounded p-2"
                    />
                  </label>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Detalles de la Cita</h3>
                <p>Nombre: {selectedAppointment.name}</p>
                <p>RUT: {selectedAppointment.rut}</p>
                <p>Fecha: {selectedAppointment.fecha}</p>
                <p>Hora: {selectedAppointment.hora}</p>
                <p>Movilidad Reducida: {selectedAppointment.reducedMobility ? 'Sí' : 'No'}</p>
                <p>Enfermedad Crónica: {selectedAppointment.chronicDisease ? 'Sí' : 'No'}</p>
                <p>Asistencia: {selectedAppointment.attendance ? 'Sí' : 'No'}</p>
              </div>
            )}
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
        <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rut:</label>
            <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} required />
          </div>
          <div>
            <label>Mes:</label>
            <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} required />
          </div>
          <div>
            <label>Año:</label>
            <input type="text" value={año} onChange={(e) => setAño(e.target.value)} required />
          </div>
          <button type="submit">Obtener Citas</button>
        </form>

        <div>
          <h2>Citas</h2>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.fecha}: {appointment.tipoServicio} en {appointment.centroComunitario}
                  <button onClick={() => handleDetailsClick(appointment)}>Detalles</button>
                  <button onClick={() => handleEditClick(appointment)}>Editar</button>
                  <button onClick={() => handleCancelClick(appointment)}>Cancelar</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay citas disponibles.</p>
          )}
        </div>

        <div>
          <button onClick={() => handleMonthChange(-1)}>Mes Anterior</button>
          <button onClick={() => handleMonthChange(1)}>Mes Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default AgendaForm;
