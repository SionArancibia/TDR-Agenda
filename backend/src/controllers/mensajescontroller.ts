

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerMensajes = async (req: Request, res: Response) => {
  try {
    const mensajes = await prisma.administrador.findMany({
      select: {
        mensajes: true,
      },
    });
    res.status(200).json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};
