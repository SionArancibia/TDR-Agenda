import { Request, Response } from "express";
import prisma from "../db/prisma";
import { Appointment } from "@prisma/client";
import {getDayName, toLocalTime, toUTC} from "../utils/dateUtils";
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
  const { professionalId, duration } = req.body;
  const timeZone = 'America/Santiago';

  try {
    // Obtener el horario general para todo el año
    const schedules = await prisma.schedule.findMany({
      where: { professionalId },
    });

    if (!schedules.length) {
      return res.status(404).json({ error: `No hay horarios disponibles para el profesional.` });
    }

    const availableAppointments: Omit<Appointment, 'id'>[] = [];

    // Iterar sobre cada día del año
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(new Date().getFullYear(), month, day);
        if (date.getMonth() !== month) continue; // Verificar si el día es válido para el mes

        const dayName = getDayName(date, timeZone);
        const schedule = schedules.find(schedule => schedule.day === dayName);

        if (!schedule) continue; // Si no hay horario para este día, continuar

        const [startHours, startMinutes] = schedule.startTime.split(':').map(Number);
        const [endHours, endMinutes] = schedule.endTime.split(':').map(Number);

        const startHour = new Date(date);
        startHour.setHours(startHours, startMinutes, 0, 0);

        const endHour = new Date(date);
        endHour.setHours(endHours, endMinutes, 0, 0);

        // Generar citas dentro del rango horario
        while (startHour < endHour) {
          const newAppointmentDateUTC = new Date(startHour);
          const isBlocked = await prisma.professionalBlock.findFirst({
            where: {
              professionalId,
              startDate: { lte: newAppointmentDateUTC },
              endDate: { gte: newAppointmentDateUTC },
            },
          });

          if (!isBlocked) {
            availableAppointments.push({
              date: newAppointmentDateUTC,
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
      }
    }

    const createdAppointments = await prisma.$transaction(
      availableAppointments.map(appointment =>
        prisma.appointment.create({ data: appointment })
      )
    );

    const appointmentsToSend = createdAppointments.map(appointment => ({
      ...appointment,
      date: toLocalTime(appointment.date, timeZone),
    }));

    res.status(201).json(appointmentsToSend);
  } catch (error) {
    console.error('Error al generar citas disponibles:', error);
    res.status(500).json({ error: 'Error al generar citas disponibles.' });
  }
};

// Obtener citas disponibles
export const getAvailableAppointments = async (req: Request, res: Response) => {
    const { professionalId, serviceTypeId } = req.query;
  
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
          serviceId: String(serviceTypeId),
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

// Obtener todas las citas de un profesional
export const getAllAppointments = async (req: Request, res: Response) => {
  const { professionalId } = req.query;
  const timeZone = 'America/Santiago';

  try {
    // Obtener bloques de tiempo del profesional
    const blocks = await prisma.professionalBlock.findMany({
      where: { professionalId: String(professionalId) },
      select: { startDate: true, endDate: true },
    });

    // Obtener todas las citas del profesional
    const allAppointments = await prisma.appointment.findMany({
      where: {
        professionalId: String(professionalId),
      },
      include: { professional: true, service: true, patient: true },
    });

    // Filtrar citas que no están dentro de los bloques de tiempo
    const filteredAppointments = allAppointments.filter(appointment => 
      !blocks.some(block => 
        appointment.date >= block.startDate && appointment.date <= block.endDate
      )
    );

    // Mapear citas para formatear la fecha
    const appointmentsToSend = filteredAppointments.map(appointment => ({
      ...appointment,
      date: toLocalTime(appointment.date, timeZone).toISOString(),
    }));

    res.status(200).json(appointmentsToSend);
  } catch (error) {
    console.error('Error al obtener todas las citas:', error);
    res.status(500).json({ error: 'Error al obtener todas las citas' });
  }
};
  
export const getAppointmentsByDate = async (req: Request, res: Response) => {
  const { professionalRut, month, year } = req.query;

  if (!professionalRut || !month || !year) {
    return res.status(400).json({ error: "Faltan parámetros de consulta" });
  }

  try {
    // Buscar al usuario con el RUT proporcionado
    const user = await prisma.user.findUnique({
      where: {
        rut: String(professionalRut),
      },
      include: {
        professional: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.professional) {
      return res.status(404).json({ error: "El usuario no está relacionado con un profesional" });
    }

    const professionalId = user.professional.id;

    // Calcular las fechas de inicio y fin correctamente
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 1);

    // Buscar todas las citas del profesional y filtrar por mes y año
    const appointments = await prisma.appointment.findMany({
      where: {
        professionalId: professionalId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        patient: true,
        service: true,
        communityCenter: true,
      },
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener citas por fecha:', error);
    res.status(500).json({ error: 'Error al obtener citas por fecha' });
  }
};