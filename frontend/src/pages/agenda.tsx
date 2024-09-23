import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import useAgenda from '../hooks/useAgenda';
import { useAuthContext } from '../context/AuthContext';
import MonthCard from '../components/MonthCard';
import NavigationButton from '../components/NavigationButton';

// Definir la interfaz de una cita
export interface Appointment {
  id: string;
  pacienteId: string;
  profesionalId: string;
  asiste: boolean;
  atencionDomiciliaria: boolean;
  centroComunitario: string;
  fecha: string; // Puedes usar Date si prefieres manejar fechas como objetos Date
  observaciones: string;
  tipoServicio: string;
}

  // Genera un arreglo de los meses a mostrar, simulando una cuadrícula de 4 meses.
  const getMonthsToDisplay = (year: number, month: number) => {
    const months = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date(year, month + i); // Crear una nueva fecha con el año y mes actual + i, +i es para avanzar al siguiente mes
      const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric'}); 
      months.push(monthName);
    }
    return months;
  };


// Formulario de la agenda
const AgendaForm = () => {
  const { authUser } = useAuthContext(); // Desestructurar para obtener el usuario
  const { getCitas } = useAgenda(); // Desestructurar para obtener la función getCitas
  const [rut, setRut] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Mes actual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual
  const [displayedMonths, setDisplayedMonths] = useState(getMonthsToDisplay(selectedYear, selectedMonth)); // Meses a mostrar
  const [mes, setMes] = useState((selectedMonth + 1).toString());
  const [año, setAño] = useState(selectedYear.toString());

  // Obtener el rut del usuario aut
  useEffect(() => {
    if (authUser !== null) {
      setRut(authUser.rut);
    }
  }, [authUser]);

  // para que se actualice la lista de citas cuando se cambie de mes o año
  useEffect(() => {
    if (mes && año) { // Solo llamar a fetchAppointments si mes y año están definidos
      fetchAppointments();
    }
  }, [mes, año]);

  // Función para obtener las citas
  const fetchAppointments = async () => {
    if (!rut || !mes || !año) {
      toast.error('Faltan parámetros requeridos');
      return;
    }
    try {
      const citasData = await getCitas(rut, mes, año);
      setAppointments(citasData || []); // Establecer las citas obtenidas en el estado
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); // En caso de error, establecer appointments como un arreglo vacío
      toast.error('Error al obtener las citas');
    }
  };

  const handleDetailsClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    toast('Cita cancelada');
  };

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    setDisplayedMonths(getMonthsToDisplay(newYear, newMonth));
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    handleMonthChange(newYear, newMonth);
  };

  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    handleMonthChange(newYear, newMonth);
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
    <div className='flex justify-center items-center space-x-4 mb-2'>
      <NavigationButton direction="left" onClick={handlePreviousMonth} />
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
        {displayedMonths.map((month, index) => (
          <MonthCard
            key={index}
            month={month}
            index={index}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            handleMonthChange={handleMonthChange}
            setMes={setMes}
            setAño={setAño}
          />
        ))}
      </div>
      <NavigationButton direction="right" onClick={handleNextMonth} />
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
              <h3 className="text-lg font-bold">{appointment.asiste}</h3>
              <p>{appointment.fecha} - {appointment.centroComunitario}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleDetailsClick(appointment)}
                className="bg-green-400 text-white px-4 py-2 rounded-full"
              >
                Detalles
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
      {selectedAppointment && ( // Si selectedAppointment es verdadero, mostrar el modal
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            {
              <div>
                <h3 className="text-lg font-bold">Detalles de la Cita</h3>
                <p>Id: {selectedAppointment.id}</p>
                <p>Fecha: {selectedAppointment.fecha}</p>
                <p>Observaciones: {selectedAppointment.observaciones}</p>
                <p>Atencion Domiciliaria: {selectedAppointment.atencionDomiciliaria ? 'Sí' : 'No'}</p>
                <p>Centro Comunitario: {selectedAppointment.centroComunitario}</p>
                <p>Asistencia: {selectedAppointment.asiste ? 'Sí' : 'No'}</p>
              </div>
            }
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaForm;
