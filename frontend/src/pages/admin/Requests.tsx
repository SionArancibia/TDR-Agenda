// src/components/RegistrationRequestsTable.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../../utils/axios';
import { toast } from 'sonner';

interface RegistrationRequest {
  id: string;
  rut: string;
  password: string;
  document: string;
  createdAt: string;
}

interface Request {
  id: string;
  validated: boolean;
  RegistrationRequest: RegistrationRequest; 
}

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      await api.get('requests/getRegistrationRequests')
        .then(response => {
          setRequests(response.data); 
          console.log(response.data); 
        })
        .catch(error => {
          console.log(error.response.data);
          toast.error(error.response.data.error);
        });
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Solicitudes de Registro</h1>
      <table>
        <thead>
          <tr>
            <th>ID de Solicitud</th>
            <th>RUT</th>
            <th>Documento</th>
            <th>Validado</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.RegistrationRequest.rut}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
