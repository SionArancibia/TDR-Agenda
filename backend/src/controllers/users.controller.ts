import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const createUser = async (req: Request, res: Response) => {
	try {
		const {
			rut,
			firstName,
			lastName,
			address,
			age,
			email,
			phoneNumber,
			password,
			confirmPassword,
			gender,
			role
		} = req.body;

		if (
			!rut ||
			!email ||
			!firstName ||
			!lastName ||
			!address ||
			!age ||
			!phoneNumber ||
			!password ||
			!confirmPassword ||
			!gender ||
			!role
		) {
			return res.status(400).json({ error: "Por favor completa todos los campos" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Las contraseñas no coinciden" });
		}

		const existingUser = await prisma.user.findUnique({ where: { rut } });

		if (existingUser) {
			return res.status(400).json({ error: "El RUT ya está registrado" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = await prisma.user.create({
			data: {
				rut,
				firstName,
				lastName,
				address,
				email,
				age: age,
				phoneNumber: phoneNumber,
				password: hashedPassword,
				gender,
				role,
			},
		});

		if (newUser) {
			generateToken(newUser.id, newUser.role, res);

			return res.status(201).json({
				id: newUser.id,
				rut: newUser.rut,
				role: newUser.role
			});

		} else {
			return res.status(400).json({ error: "Datos de usuario no válidos" });
		}

	} catch (error: any) {
		console.error("Error en el controlador de registro:", error.message);
		return res.status(500).json({ error: "Error interno del servidor" });
	}
};

//------------------------------------------------------------------------------------------------

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

//------------------------------------------------------------------------------------------------

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

//------------------------------------------------------------------------------------------------

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Usuario eliminado correctamente', user });

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

//------------------------------------------------------------------------------------------------

export const UpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rut, firstName, lastName, address, age, role, phoneNumber, gender } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                rut: rut,
                firstName: firstName,
                lastName: lastName,
                address: address,
                age: parseInt(age),
                role: role,
                phoneNumber: parseInt(phoneNumber),
                gender: gender,
            },
        });

        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};