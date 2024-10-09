import { Request, Response } from "express";
import prisma from "../db/prisma";

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
          serviceTypeId: String(serviceTypeId),
          available: true,
          canceled: false,
        },
        include: {
          professional: true,
          serviceType: true,
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
  