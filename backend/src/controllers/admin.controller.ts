import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createUsers = async (req: Request, res: Response) => {};

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