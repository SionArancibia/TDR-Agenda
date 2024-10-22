import { Request, Response } from 'express';
import prisma from '../db/prisma';

// Crear una nueva categoría
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await prisma.serviceCategory.create({
      data: {
        name,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.serviceCategory.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo las categorías' });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo la categoría' });
  }
};

// Actualizar una categoría por ID
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.serviceCategory.update({
      where: { id },
      data: { name },
    });

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando la categoría' });
  }
};

// Eliminar una categoría por ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.serviceCategory.delete({
      where: { id },
    });

    res.status(204).send(); // Respuesta sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando la categoría' });
  }
};
