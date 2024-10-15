import { Request, Response } from "express";
import prisma from "../db/prisma";

// Crear una cita
export const createAppointment = async (req: Request, res: Response) => {
  const { date, patientId, professionalId, serviceTypeId, communityCenterId, homeCare } = req.body;

  try {
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        patientId,
        professionalId,
        serviceTypeId,
        communityCenterId,
        homeCare,
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
          serviceType: true,
          communityCenter: true,
        },
      });
    } else {
     
      appointments = await prisma.appointment.findMany({
        include: {
          patient: true,
          professional: true,
          serviceType: true,
          communityCenter: true,
        },
      });
    }

    res.status(200).json(appointments);
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
        serviceType: true,
        communityCenter: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.status(200).json(appointment);
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
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
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