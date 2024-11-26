import { Request, Response } from 'express';
import prisma from '../db/prisma';  

export const getPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await prisma.patient.findMany();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los pacientes' });
  }
};

export const getPatientByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params; // userId extraído de los parámetros de la solicitud

  try {
    // Buscar al paciente por userId
    const patient = await prisma.patient.findUnique({
      where: {
        userId: String(userId), // Aseguramos que el userId sea un string
      },
      include: {
        user: true, // Incluye información del usuario asociado
        appointments: true, // Incluye citas asociadas
        requests: true, // Incluye solicitudes asociadas (si las tienes configuradas)
      },
    });

    // Verificar si se encontró el paciente
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Responder con los datos del paciente
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};