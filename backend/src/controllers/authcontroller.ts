import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, username, password, confirmPassword, gender, role} = req.body;

		if (!fullName || !username || !password || !confirmPassword || !gender ||!role) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await prisma.user.findUnique({ where: { username } });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = await prisma.user.create({
			data: {
				fullName,
				username,
				password: hashedPassword,
				gender,
                role,
			},
		});

		if (newUser) {
			generateToken(newUser.id, newUser.role, res);

			res.status(201).json({
				id: newUser.id,
				fullName: newUser.fullName,
				username: newUser.username,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error: any) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		generateToken(user.id, user.role, res);

		res.status(200).json({
			id: user.id,
			fullName: user.fullName,
			username: user.username,
			role: user.role,
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
		const user = await prisma.user.findUnique({ where: { id: req.user.id } });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			id: user.id,
			fullName: user.fullName,
			username: user.username,
			role: user.role,
			gender: user.gender,
		});
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getCitas = async (req: Request, res: Response) => {
	const { idProfesional, idPaciente, mes, año } = req.query;

	if (!idProfesional || !idPaciente || !mes || !año) {
	return res.status(400).json({ error: "Faltan parámetros requeridos" });
	}

	try {
	const citas = await prisma.citas.findMany({
		where: {
		idProfesional: parseInt(idProfesional as string),
		idPaciente: parseInt(idPaciente as string),
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