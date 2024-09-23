import { useEffect, useState } from 'react'; 
import DefaultLayout from '../components/admin/layout/DefaultLayout';

const Mensajes = () => {
  const [mensajes, setMensajes] = useState([]); 
  const [error, setError] = useState(null); 

  const fetchMensajes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mensajes'); 
      if (!response.ok) {
        throw new Error('Error al obtener los mensajes');
      }
      
      const data = await response.json();
      setMensajes(data); 
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchMensajes(); 
  }, []);

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Mensajes</h2>

        {error && <p className="text-red-500">{error}</p>} 

        <div className="space-y-4">
          {mensajes.length > 0 ? (
            mensajes.map((mensaje: any, index: number) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-2">{`Mensaje ${index + 1}`}</h3>
                <p className="text-gray-600">{mensaje.mensajes}</p> 
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay mensajes disponibles.</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Mensajes;
