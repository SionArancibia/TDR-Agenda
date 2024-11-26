import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { RequestType } from '@prisma/client';  // Importa el enum Role desde Prisma

// Crear una nueva solicitud de registro
export const createRegistrationRequest = async (req: Request, res: Response) => {
  const { rut, email, password, document } = req.body;

  // Validar que los datos necesarios estén presentes
  if (!rut || !password || !email || !document) {
    return res.status(400).json({ error: 'Faltan datos: rut, email, password, o document.' });
  }

  try {
    // Crear primero la solicitud (Request) para obtener un id
    const newRequest = await prisma.request.create({
      data: {
        validated: false, // La solicitud no está validada al principio
        requestType: RequestType.REGISTRATION_REQUEST, // Se asigna el tipo de solicitud
      },
    });

    // Crear la entrada en RegistrationRequest usando el requestId obtenido
    const newRegistrationRequest = await prisma.registrationRequest.create({
      data: {
        rut,
        email,
        password,
        document, // Almacena el documento como base64
        requestId: newRequest.id, // Relacionamos el requestId de la solicitud creada
      },
    });

    // Responder con éxito y devolver los detalles de la nueva solicitud
    res.status(201).json({
      message: 'Solicitud de registro enviada exitosamente'
    });
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
    const { requestId } = req.body;

    console.log("rquestid validated?, ", requestId)
  
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