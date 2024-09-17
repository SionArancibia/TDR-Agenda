import { Request, Response } from 'express';
import prisma from '../db/prisma';  

export const getPacientes = async (req: Request, res: Response) => {
  try {
    const pacientes = await prisma.paciente.findMany();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los pacientes' });
  }
};
