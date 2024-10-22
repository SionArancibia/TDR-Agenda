import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { RequestType } from '@prisma/client';  // Importa el enum Role desde Prisma

// Crear una nueva solicitud de registro
export const createRegistrationRequest = async (req: Request, res: Response) => {
    const {RegistrationRequest} = req.body;
  
    try {
      const newRequest = await prisma.request.create({
        data: {
          validated: false, // Una solicitud nunca parte validada, esto cambia cuando un admin lo admite.
          requestType: RequestType.REGISTRATION_REQUEST,
          RegistrationRequest: {
            create: RegistrationRequest, // seguir el modelo de RegistrationRequest en prisma
          },
        },
      });
  
      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Error al crear la solicitud de registro:', error);
      res.status(500).json({ error: 'Error al crear la solicitud de registro' });
    }
};

// Obtener todas las solicitudes de registro
export const getRegistrationRequests = async (req: Request, res: Response) => {
    try {
      const requests = await prisma.request.findMany({
        include: {
          RegistrationRequest: true, 
        },
      });
  
      res.status(200).json(requests);
    } catch (error) {
      console.error('Error en getRegistrationRequests: ', error);
      res.status(500).json({ error: 'Error al obtener las solicitudes de registro' });
    }
  };
  
  // Validar una solicitud de registro
export const validateRegistrationRequest = async (req: Request, res: Response) => {
    const { requestId } = req.params;
  
    try {
      // Actualizar la solicitud para marcarla como validada
      const updatedRequest = await prisma.request.update({
        where: { id: requestId },
        data: { validated: true },
      });
  
      res.status(200).json(updatedRequest);
    } catch (error) {
      console.error('Error en validateRegistrationRequest: ', error);
      res.status(500).json({ error: 'Error al validar la solicitud de registro' });
    }
};

export const cancelAppointmentRequest = async (req: Request, res: Response) => {
  const { appointmentId, cancelReason } = req.body;

  try {
    const newRequest = await prisma.request.create({
      data: {
        validated: false,
        requestType: "APPOINTMENT_REQUEST",
        CancelAppointmentRequest: {
          create: {
            cancelReason,
            appointment: {
              connect: { id: appointmentId },
            },
          },
        },
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error en createAppointmentRequest:', error);
    res.status(500).json({ error: 'Error en createAppointmentRequest' });
  }
};