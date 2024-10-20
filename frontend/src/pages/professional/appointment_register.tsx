import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface Appointment {
  id: string;
  date: string;
  attended: boolean;
  observations: string;
}

const RegistroAsistencia = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthFilter, setMonthFilter] = useState<number>(new Date().getMonth() + 1);
  
  const formatMonth = (month: number) => month.toString().padStart(2, '0');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/appointments?id=${patientId}&month=${monthFilter}`);
        if (!response.ok) {
          throw new Error('Error al obtener las citas');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); 
        setAppointments(data); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId, monthFilter]);

  const handleMonthFilter = (month: number) => {
    setMonthFilter(month);
  };

  // Agrupar citas por fechas
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentMonth = appointmentDate.getMonth() + 1;

    if (appointmentMonth === monthFilter) {
      const date = appointmentDate.toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
    }
  
    return acc;
  }, {} as Record<string, Appointment[]>);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Registro de Asistencia</h2>

      
      <div className="flex justify-center mb-8 space-x-4">
        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthFilter(index + 1)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              monthFilter === index + 1
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-green-300'
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      
      {appointments.length > 0 ? (
        <div className="flex space-x-8 justify-center p-4">
          
          {Object.keys(groupedAppointments).map((date, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
            
              <div className="text-center font-bold mb-2">{date}</div>
        
              {groupedAppointments[date].map((appointment) => (
                <div
                  key={appointment.id}
                  className={`px-4 py-2 rounded-md shadow-md w-48 text-center ${
                    appointment.attended ? 'bg-green-300' : 'bg-red-400'
                  }`}
                >
                  <p className="font-medium">
                    {new Date(appointment.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm">
                    {appointment.attended ? 'Presente' : 'Ausente'}
                  </p>
                  <p className="text-xs text-gray-700">{appointment.observations}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay citas para mostrar en este mes.</p>
      )}
    </div>
  );
};

export default RegistroAsistencia;
