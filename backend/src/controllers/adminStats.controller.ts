import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    // Total de reservas
    const totalReservations = await prisma.appointment.count();

    // Total de asistencias
    const totalAttendances = await prisma.appointment.count({
      where: { attended: true },
    });

    // Estadísticas de centros comunitarios
    const communityCenterStats = await prisma.communityCenter.findMany({
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    // Estadísticas de servicios más visitados
    const serviceStats = await prisma.service.findMany({
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    // Horarios más concurridos
    const scheduleStats = await prisma.appointment.groupBy({
      by: ['date'],
      _count: {
        date: true,
      },
      orderBy: {
        _count: {
          date: 'desc',
        },
      },
    });

    res.status(200).json({
      totalReservations,
      totalAttendances,
      communityCenterStats,
      serviceStats,
      scheduleStats,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Error fetching admin stats' });
  }
};