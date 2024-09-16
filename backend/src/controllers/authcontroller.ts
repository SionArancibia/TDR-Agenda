import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { nombres, apellidos, rut, domicilio, edad, telefono, username, contrasena, confirmPassword, gender, role } = req.body;

        if (!nombres || !apellidos || !rut || !domicilio || !edad || !telefono || !username || !contrasena || !confirmPassword || !gender || !role) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        if (contrasena !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const usuario = await prisma.usuario.findUnique({ where: { username } });

        if (usuario) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(contrasena, salt);

        const newUser = await prisma.usuario.create({
            data: {
                nombres,
                apellidos,
                rut,
                domicilio,
                edad,
                telefono,
                username,
                contrasena: hashedPassword,
                gender,
                role,
            },
        });

        if (newUser) {
            generateToken(newUser.id, newUser.role, res);

            res.status(201).json({
                id: newUser.id,
                nombres: newUser.nombres,
                username: newUser.username,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error: any) {
        res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, contrasena } = req.body;

        if (!username || !contrasena) {
            return res.status(400).json({ error: "Please provide both username and password" });
        }

        const usuario = await prisma.usuario.findUnique({ where: { username } });


		if (!usuario) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(contrasena, usuario.contrasena);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		generateToken(usuario.id, usuario.role, res);

		res.status(200).json({
			id: usuario.id,
			nombres: usuario.nombres,
			username: usuario.username,
			role: usuario.role,
		});
		
	} catch (error: any) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
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
		const usuario = await prisma.usuario.findUnique({ where: { id: req.user.id } });

		if (!usuario) {
			return res.status(404).json({ error: "usuario not found" });
		}

		res.status(200).json({
			id: usuario.id,
			nombres: usuario.nombres,
			username: usuario.username,
			role: usuario.role,
			gender: usuario.gender,
		});
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getCitas = async (req: Request, res: Response) => {
	const { profesionalId, pacienteId, mes, año } = req.query;

	if (!profesionalId || !mes || !año) {
	return res.status(400).json({ error: "Faltan parámetros requeridos" });
	}

	try {
	const citas = await prisma.citas.findMany({
		where: {
		profesionalId: profesionalId as string,
		fecha: {
			gte: new Date(`${año}-${mes}-01`),
			lt: new Date(`${año}-${parseInt(mes as string) + 1}-01`),
		},
		},
	});

	res.status(200).json(citas);
	} catch (error: any) {
	console.log("Error en el controlador getCitas", error.message);
	res.status(500).json({ error: "Error Interno del Servidor" });
	}
};