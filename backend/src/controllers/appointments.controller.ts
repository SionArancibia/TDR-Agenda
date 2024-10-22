import { Request, Response } from "express";
import prisma from "../db/prisma";
import { toZonedTime, fromZonedTime} from "date-fns-tz";

// Crear una cita
export const createAppointment = async (req: Request, res: Response) => {
  const { date, patientId, professionalId, serviceId, communityCenterId, homeCare } = req.body;

  try {
    const blocks = await prisma.professionalBlock.findMany({
      where: { professionalId: String(professionalId) },
      select: { startDate: true, endDate: true },
    });
    const utcDate = fromZonedTime(date, 'America/Santiago'); 

    // Verificar si la fecha de la cita está dentro de los bloques de tiempo
    const isBlocked = blocks.some(block => {
      const blockStart = new Date(block.startDate).getTime();
      const blockEnd = new Date(block.endDate).getTime();
      return utcDate.getTime() >= blockStart && utcDate.getTime() <= blockEnd;
    });

    if (isBlocked) {
      return res.status(400).json({ error: 'No se pudo crear la cita, pues existe un bloqueo de horario para esa fecha.' });
    }

    // Crear la cita si no está bloqueada
    const appointment = await prisma.appointment.create({
      data: {
        date: utcDate,
        patientId,
        professionalId,
        serviceId,
        communityCenterId,
        homeCare: false,
        available: true,
        attended: false,
        canceled: false,
      },
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Obtener todas las citas
export const getAppointments = async (req: Request, res: Response) => {
  const { patientId, month } = req.query;

  try {
    let appointments;

 
    if (patientId && month) {
      const year = new Date().getFullYear(); 
      appointments = await prisma.appointment.findMany({
        where: {
          patientId: String(patientId),
          date: {
            gte: new Date(`${year}-${month}-01`), 
            lt: new Date(`${year}-${Number(month) + 1}-01`)  
          }
        },
        include: {
          patient: true,
          professional: true,
          service: true,
          communityCenter: true,
        },
      });
    } else {
     
      appointments = await prisma.appointment.findMany({
        include: {
          patient: true,
          professional: true,
          service: true,
          communityCenter: true,
        },
      });
    }
    const formattedAppointments = appointments.map((appointment) => ({
      ...appointment,
      date: toZonedTime(appointment.date, 'America/Santiago'), // Convertir UTC a la zona local
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        professional: true,
        service: true,
        communityCenter: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    const formattedAppointment = {
      ...appointment,
      date: toZonedTime(appointment.date, 'America/Santiago'),
    };

    res.status(200).json(formattedAppointment);

  } catch (error) {
    console.error('Error al obtener la cita:', error);
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
};

// Actualizar una cita
export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, attended, observations, homeCare, available, canceled, cancellationReason } = req.body;

  try {
    const utcDate = date ? fromZonedTime(date, 'America/Santiago') : undefined;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        date: utcDate,
        attended,
        observations,
        homeCare,
        available,
        canceled,
        cancellationReason,
      },
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

// Eliminar una cita
export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.appointment.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};