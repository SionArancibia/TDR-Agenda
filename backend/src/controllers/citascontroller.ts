import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getCitas = async (req: Request, res: Response) => {
  const { rut, mes, año } = req.query;

  if (!rut || !mes || !año) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    // Paso 1: Obtener el rut del usuario directamente
    const usuario = await prisma.usuario.findUnique({
      where: {
        rut: rut as string, // Ahora estamos usando `rut` en lugar de `username`
      },
      select: {
        rut: true, // Seleccionamos el `rut` que ya recibimos
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Paso 2: Obtener el id del profesional usando el rut del usuario
    const profesional = await prisma.profesional.findFirst({
      where: {
        rut: usuario.rut, // Ya tenemos el rut del usuario
      },
      select: {
        id: true,
      },
    });

    if (!profesional) {
      return res.status(404).json({ error: "Profesional no encontrado" });
    }

    try {
      const mesInt = parseInt(mes as string);
      const añoInt = parseInt(año as string);

      // Validar que el mes y año sean válidos
      if (isNaN(mesInt) || isNaN(añoInt) || mesInt < 1 || mesInt > 12 || añoInt < 1900 || añoInt > 2100) {
        return res.status(400).json({ error: "Mes o año inválidos" });
      }

      const fechaInicio = new Date(añoInt, mesInt - 1, 1); // 1 de mes
      const fechaFin = new Date(añoInt, mesInt, 0); // último día del mes

      // Paso 3: Obtener las citas de los pacientes asociados a ese profesional, filtrando por mes y año
      const citas = await prisma.citas.findMany({
        where: {
          profesionalId: profesional.id,
          fecha: {
            gte: fechaInicio,
            lte: fechaFin,
          },
        },
      });

      res.status(200).json(citas);
    } catch (error: any) {
      console.log("Error en el controlador getCitas", error.message);
      res.status(500).json({ error: "Error Interno del Servidor" });
    }

  } catch (error: any) {
    console.log("Error en el controlador getCitas", error.message);
    res.status(500).json({ error: "Error Interno del Servidor" });
  }
};
