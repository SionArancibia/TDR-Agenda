import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const createUsers = async (req: Request, res: Response) => {
	//console.log(req.body);
	try {
		const {
			rut,
			nombres,
			apellidos,
			domicilio,
			edad,
			telefono,
			contrasena,
			confirmarContrasena,
			gender,
			role
		} = req.body;

		if (
			!rut ||
			!nombres ||
			!apellidos ||
			!domicilio ||
			!edad ||
			!telefono ||
			!contrasena ||
			!confirmarContrasena ||
			!gender ||
			!role
		) {
			return res.status(400).json({ error: "Por favor completa todos los campos" });
		}

		if (contrasena !== confirmarContrasena) {
			return res.status(400).json({ error: "Las contraseñas no coinciden" });
		}

		const existingUser = await prisma.usuario.findUnique({ where: { rut } });

		if (existingUser) {
			return res.status(400).json({ error: "El RUT ya está registrado" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(contrasena, salt);

		const newUser = await prisma.usuario.create({
			data: {
				rut,
				nombres,
				apellidos,
				domicilio,
				edad: edad,
				telefono: telefono,
				contrasena: hashedPassword,
				gender,
				role,
			},
		});

		if (newUser) {
			generateToken(newUser.id, newUser.role, res);

			return res.status(201).json({
				id: newUser.id,
				rut: newUser.rut,
				nombres: newUser.nombres,
				apellidos: newUser.apellidos,
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
        const user = await prisma.usuario.findUnique({
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
        const users = await prisma.usuario.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

//------------------------------------------------------------------------------------------------

export const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.usuario.delete({
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

export const UpdateUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rut, nombres, apellidos, domicilio, edad, role, telefono, gender } = req.body;

    try {
        const updatedUser = await prisma.usuario.update({
            where: { id: id },
            data: {
                rut: rut,
                nombres: nombres,
                apellidos: apellidos,
                domicilio: domicilio,
                edad: parseInt(edad),
                role: role,
                telefono: parseInt(telefono),
                gender: gender,
            },
        });
        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};