import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getAppointments = async (req: Request, res: Response) => {
  const { rut, mes, año } = req.query;

  if (!rut || !mes || !año) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    // Paso 1: Obtener el usuario usando el rut
    const user = await prisma.user.findUnique({
      where: {
        rut: rut as string,
      },
      select: {
        id: true,
        professional: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user || !user.professional) {
      return res.status(404).json({ error: "Profesional no encontrado" });
    }

    // Paso 2: Obtener las citas del profesional, filtrando por mes y año
    const mesInt = parseInt(mes as string);
    const añoInt = parseInt(año as string);

    const citas = await prisma.appointment.findMany({
      where: {
        professionalId: user.professional.id,
        date: {
          gte: new Date(añoInt, mesInt - 1, 1),
          lt: new Date(añoInt, mesInt, 1),
        },
      },
    });

    res.json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las citas" });
  }
};