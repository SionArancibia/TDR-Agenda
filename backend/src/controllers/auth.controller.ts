import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const login = async (req: Request, res: Response) => {
  try {
    const { rut, password } = req.body;
        if (!rut || !password) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const user = await prisma.user.findUnique({
          where: { rut },
        });

        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        generateToken(user.id, user.role, res);

        res.status(200).json({
            id: user.id,
            rut: user.rut,
            role: user.role,
        });
		
        console.log("Inicio de sesión exitoso, respuesta enviada");

    } catch (error: any) {
        console.log("Error en el controlador de inicio de sesión", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });

	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: {
        professional: true, // Incluir la relación con el modelo Professional
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};




////////////////////////////////////////////////

export const loginMobile = async (req: Request, res: Response) => {
  const { rut, password } = req.body;
  console.log(rut)
  if (!rut || !password) {
    return res.status(400).json({ message: 'RUT y contraseña son requeridos' });
  }

  try {  const user = await prisma.user.findUnique({
    where: { rut },
  });

  if (!user) {
    return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
  }

  const token = jwt.sign({ rut: user.rut, id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  const patient = await prisma.patient.findUnique({
    where: {
      userId: String(user.id), // Aseguramos que el userId sea un string
    },
    include: {
      user: true, // Incluye información del usuario asociado
      appointments: true, // Incluye citas asociadas
      requests: true, // Incluye solicitudes asociadas (si las tienes configuradas)
    },
  });

  // Verificar si se encontró el paciente
  if (!patient) {
    return res.status(404).json({ error: 'Paciente no encontrado' });
  }

  const patientId = patient.id

  res.json({ token, patientId });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}
