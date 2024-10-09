import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

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
        const user = await prisma.user.findUnique({ where: { id: req.user?.id } });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({
          id: user.id,
          rut: user.rut,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          age: user.age,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          role: user.role,
          email: user.email,
        });

    } catch (error: any) {
        console.log("Error en el controlador de obtener usuario", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};