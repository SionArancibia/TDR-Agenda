import { Request, Response } from "express";
import prisma from "../db/prisma";

// Crear un nuevo horario para un profesional
export const createSchedule = async (req: Request, res: Response) => {
  const { professionalId, day, startTime, endTime } = req.body;

  console.log(req.body);

  try {
    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });
    
    if (!professional) {
      return res.status(404).json({ error: 'Profesional no encontrado.' });
    }

    const schedule = await prisma.schedule.create({
      data: {
        professionalId,
        day,
        startTime,
        endTime,
      },
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error al crear el horario:', error);
    res.status(500).json({ error: 'Error al crear el horario' });
  }
};

// Obtener todos los horarios de un profesional
export const getSchedules = async (req: Request, res: Response) => {
  const { professionalId } = req.params;

  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        professionalId: String(professionalId),
      },
    });

    res.status(200).json(schedules);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
};

// Actualizar un horario específico
export const updateSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { day, startTime, endTime } = req.body;

  try {
    const schedule = await prisma.schedule.update({
      where: { id },
      data: {
        day,
        startTime,
        endTime,
      },
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error al actualizar el horario:', error);
    res.status(500).json({ error: 'Error al actualizar el horario.' });
  }
};

// Eliminar un horario específico
export const deleteSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.schedule.delete({
      where: { id },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar el horario:', error);
    res.status(500).json({ error: 'Error al eliminar el horario' });
  }
};
