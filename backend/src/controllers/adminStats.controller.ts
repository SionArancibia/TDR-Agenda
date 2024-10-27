import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalReservations = await prisma.appointment.count();
    const totalAttendances = await prisma.appointment.count({
      where: { attended: true },
    });

    const communityCenterStats = await prisma.communityCenter.findMany({
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    const serviceStats = await prisma.service.findMany({
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

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