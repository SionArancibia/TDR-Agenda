import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.usuario.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

export const createUsers = async (req: Request, res: Response) => {};
export const deleteUsers = async (req: Request, res: Response) => {};
export const UpdateUsers = async (req: Request, res: Response) => {};