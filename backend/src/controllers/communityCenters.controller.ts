import { Request, Response } from "express";
import prisma from "../db/prisma";

// Crear un nuevo centro comunitario
export const createCommunityCenter = async (req: Request, res: Response) => {
  try {
    const { name, address, phoneNumber, managerName } = req.body;

    const communityCenter = await prisma.communityCenter.create({
      data: { name, address, phoneNumber, managerName },
    });

    res.status(201).json(communityCenter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando centro comunitario' });
  }
};

// Obtener todos los centros comunitarios
export const getAllCommunityCenters = async (req: Request, res: Response) => {
  try {
    const communityCenters = await prisma.communityCenter.findMany();
    res.json(communityCenters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los centros comunitarios' });
  }
};

// Obtener un centro comunitario por ID
export const getCommunityCenterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const communityCenter = await prisma.communityCenter.findUnique({
      where: { id },
    });

    if (!communityCenter) {
      return res.status(404).json({ message: 'No se encontro el centro comunitario' });
    }

    res.json(communityCenter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo el centro comunitario' });
  }
};

// Actualizar un centro comunitario por ID
export const updateCommunityCenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, phoneNumber, managerName } = req.body;

    const communityCenter = await prisma.communityCenter.update({
      where: { id },
      data: { name, address, phoneNumber, managerName },
    });

    res.json(communityCenter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando el centro comunitario' });
  }
};

// Eliminar un centro comunitario por ID
export const deleteCommunityCenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.communityCenter.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el centro comunitario' });
  }
};
