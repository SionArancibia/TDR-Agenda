import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import useAgenda from '../../hooks/useAgenda';
import { useAuthContext } from '../../context/AuthContext';
import MonthCard from '../../components/professional/MonthCard';
import NavigationButton from '../../components/professional/NavigationButton';
import CancelAppointmentModal from '../../components/professional/CancelAppointmentModal';


// Definir la interfaz de una cita
export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  attended: boolean;
  homeCare: boolean;
  communityCenter: {
    id: string;
    name: string;
  };
  date: string; // You can use Date if you prefer to handle dates as Date objects
  observations: string;
  serviceType: {
    id: string;
    name: string;
  };
  canceled: boolean;
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
const Agenda: React.FC = () => {
  const { authUser } = useAuthContext(); // Desestructurar para obtener el usuario
  const { getAppointments, createAppointmentRequest } = useAgenda(); // Desestructurar para obtener la función getCitas
  const [searchTerm, setSearchTerm] = useState('');
  const [professionalRut, setProfessionalRut] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]); // Estado para almacenar las citas
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Año actual
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Mes actual
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [displayedMonths, setDisplayedMonths] = useState(getMonthsToDisplay(selectedYear, selectedMonth)); // Meses a mostrar
  const [month, setMonth] = useState((selectedMonth + 1).toString());
  const [year, setYear] = useState(selectedYear.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Obtener el rut del usuario aut
  useEffect(() => {
    if (authUser !== null) {
      setProfessionalRut(authUser.rut);
    }
  }, [authUser]);

  //Realizar la petición de las citas al cargar el componente
  useEffect(() => {
    if (professionalRut) {
      fetchAppointments();
    }
  }, [professionalRut, selectedMonth, selectedYear]);


  // Función para obtener las citas
  const fetchAppointments = async () => {
    if (!professionalRut || !month || !year) {
      //toast.error('Faltan parámetros requeridos');
      return;
    }
    try {
      const appointmentData = await getAppointments(professionalRut, month, year);
      setAppointments(appointmentData || []); // Establecer las citas obtenidas en el estado
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); // En caso de error, establecer appointments como un arreglo vacío
      toast.error('Error al obtener las citas');
    }
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDetailsClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (cancelReason: string) => {
    if (!selectedAppointment) return;

    try {
      await createAppointmentRequest({
        appointmentId: selectedAppointment.id,
        cancelReason,
      });
      toast.success('Cancellation request sent');
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment request:', error);
      toast.error('Error creating appointment request');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-start py-6 px-4 bg-gray-50"> {/* Ajustar padding-top */}
      {/* Barra de búsqueda */}
      <div className="w-full max-w-md bg-white p-2 rounded-lg shadow-md mb-4"> {/* Ajustar padding y margen */}
        <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
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
            setMonth={setMonth}
            setYear={setYear}
          />
        ))}
      </div>
      <NavigationButton direction="right" onClick={handleNextMonth} />
    </div>

      {/* Mostrar el año debajo */}
      <div className="text-center text-gray-500 mb-4">
        {selectedYear}
      </div>

      {/* Lista de appointments */}
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{appointment.attended ? 'Attended' : 'Not Attended'}</h3>
              <p>{new Date(appointment.date).toLocaleString()} - {appointment.communityCenter?.name}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleDetailsClick(appointment)}
                className="bg-green-400 text-white px-4 py-2 rounded-full"
              >
                Details
              </button>
              <button
                onClick={() => handleCancelClick(appointment)}
                className="bg-red-400 text-white px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Atrás */}
      <div className="w-full flex justify-center mt-8">
        <Link to="/dashboardProfessional" className="flex items-center text-white bg-red-400 px-4 py-2 rounded-full shadow-md hover:bg-pink-200">
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
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Appointment Details</h3>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">ID:</label>
              <p className="text-gray-900">{selectedAppointment.id}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Date:</label>
              <p className="text-gray-900">{new Date(selectedAppointment.date).toLocaleString()}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Observations:</label>
              <p className="text-gray-900">{selectedAppointment.observations}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Home Care:</label>
              <p className="text-gray-900">{selectedAppointment.homeCare ? 'Yes' : 'No'}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Community Center:</label>
              <p className="text-gray-900">{selectedAppointment.communityCenter?.name}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Attended:</label>
              <p className="text-gray-900">{selectedAppointment.attended ? 'Yes' : 'No'}</p>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold">Canceled:</label>
              <p className="text-gray-900">{selectedAppointment.canceled ? 'Yes' : 'No'}</p>
            </div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
  
        {/* Modal de cancelación */}   
      <CancelAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

    </div>
  );
};

export default Agenda;
