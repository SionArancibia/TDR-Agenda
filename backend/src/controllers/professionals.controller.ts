import { Request, Response } from "express";
import prisma from "../db/prisma";
import { Appointment } from "@prisma/client";
import { toZonedTime, fromZonedTime} from "date-fns-tz";



// Obtener todos los profesionales
export const getAllProfessionals = async (_req: Request, res: Response) => {
  try {
    const professionals = await prisma.professional.findMany({
      include: { user: true, schedules: true }, // Incluye datos del usuario y horarios
    });
    res.status(200).json(professionals);
  } catch (error) {
    console.error('Error al obtener los profesionales:', error);
    res.status(500).json({ error: 'Error al obtener los profesionales.' });
  }
};

// Obtener un profesional por ID
export const getProfessionalById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const professional = await prisma.professional.findUnique({
      where: { id },
      include: { user: true, schedules: true },
    });

    if (!professional) {
      return res.status(404).json({ error: 'Profesional no encontrado.' });
    }

    res.status(200).json(professional);
  } catch (error) {
    console.error('Error al obtener el profesional:', error);
    res.status(500).json({ error: 'Error al obtener el profesional.' });
  }
};

// Actualizar un profesional
export const updateProfessional = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { area, specialty } = req.body;

  try {
    const professional = await prisma.professional.update({
      where: { id },
      data: { area, specialty },
    });

    res.status(200).json(professional);
  } catch (error) {
    console.error('Error al actualizar el profesional:', error);
    res.status(500).json({ error: 'Error al actualizar el profesional.' });
  }
};

// Eliminar un profesional
export const deleteProfessional = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.professional.delete({
      where: { id },
    });
    res.status(204).send(); // Respuesta sin contenido al eliminar
  } catch (error) {
    console.error('Error al eliminar el profesional:', error);
    res.status(500).json({ error: 'Error al eliminar el profesional.' });
  }
};

// Generar citas disponibles para un profesional
export const generateAvailableAppointments = async (req: Request, res: Response) => {
  const { professionalId, duration, date } = req.body;

  try {
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: 'Fecha inválida.' });
    }
    
    const timeZone = 'America/Santiago';
    const zonedDate = toZonedTime(selectedDate, timeZone);
    zonedDate.setHours(0, 0, 0, 0);
    const dayName = zonedDate.toLocaleString('en-US', { weekday: 'long', timeZone });

    const [blocks, schedule] = await Promise.all([
      prisma.professionalBlock.findMany({
        where: { professionalId },
        select: { startDate: true, endDate: true },
      }),
      prisma.schedule.findFirst({
        where: { professionalId, day: dayName },
      }),
    ]);

    if (!schedule) {
      return res.status(404).json({ error: `No hay horario disponible para ${dayName}.` });
    }

    const [startHours, startMinutes] = schedule.startTime.split(':').map(Number);
    const [endHours, endMinutes] = schedule.endTime.split(':').map(Number);

    const startHour = new Date(zonedDate);
    startHour.setHours(startHours, startMinutes, 0, 0);

    const endHour = new Date(zonedDate);
    endHour.setHours(endHours, endMinutes, 0, 0);

    const availableAppointments: Omit<Appointment, 'id'>[] = [];

    while (startHour <= endHour) {
      const newAppointmentDate = new Date(startHour);
      const newAppointmentDateUTC = fromZonedTime(newAppointmentDate, timeZone);

      const isBlocked = blocks.some(block =>
        newAppointmentDateUTC >= block.startDate && newAppointmentDateUTC < block.endDate
      );

      if (!isBlocked) {
        availableAppointments.push({
          date: newAppointmentDate, // Esta hora se guardará en UTC
          attended: false,
          observations: null,
          homeCare: false,
          available: true,
          canceled: false,
          cancellationReason: null,
          patientId: null,
          professionalId,
          serviceId: null,
          communityCenterId: null,
        });
      }

      startHour.setMinutes(startHour.getMinutes() + duration);
    }

    const createdAppointments = await prisma.$transaction(
      availableAppointments.map(appointment => 
        prisma.appointment.create({ data: appointment })
      )
    );

    // Convertir las citas a la zona horaria para enviarlas al frontend
    const appointmentsToSend = createdAppointments.map(appointment => {
      const localDate = toZonedTime(appointment.date, timeZone);
      return {
        ...appointment,
        date: localDate.toISOString(), // O formatear como prefieras para el frontend
      };
    });

    res.status(201).json(appointmentsToSend);
  } catch (error) {
    console.error('Error al generar citas disponibles:', error);
    res.status(500).json({ error: 'Error al generar citas disponibles.' });
  }
};



export const blockProfessionalTime = async (req: Request, res: Response) => {
    const { professionalId, startDate, endDate, reason } = req.body;
  
    try {
      const block = await prisma.professionalBlock.create({
        data: {
          professionalId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          reason,
        },
      });
  
      res.status(201).json(block);
    } catch (error) {
      console.error('Error al bloquear el periodo:', error);
      res.status(500).json({ error: 'Error al bloquear el periodo' });
    }
};

export const getAvailableAppointments = async (req: Request, res: Response) => {
    const { professionalId, service } = req.query;
  
    try {
      // Obtener todos los bloques de tiempo para el profesional
      const blocks = await prisma.professionalBlock.findMany({
        where: {
          professionalId: String(professionalId),
        },
        select: {
          startDate: true,
          endDate: true,
        },
      });
  
      // Obtener todas las citas del profesional que están disponibles y que no han sido canceladas
      const allAvailableAppointments = await prisma.appointment.findMany({
        where: {
          professionalId: String(professionalId),
          serviceId: String(service),
          available: true,
          canceled: false,
        },
        include: {
          professional: true,
          service: true,
          patient: true,
        },
      });
  
      // Filtrar citas que no caen dentro de los bloques
      const availableAppointments = allAvailableAppointments.filter(appointment => {
        return !blocks.some(block => 
          appointment.date >= block.startDate && appointment.date <= block.endDate
        );
      });
  
      res.status(200).json(availableAppointments);
    } catch (error) {
      console.error('Error al obtener citas disponibles:', error);
      res.status(500).json({ error: 'Error al obtener citas disponibles' });
    }
};
  