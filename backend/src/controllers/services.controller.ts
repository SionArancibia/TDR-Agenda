import { Request, Response } from 'express';
import prisma from '../db/prisma';

// Crear un nuevo servicio
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryId, isActive } = req.body;

    // Verificar que categoryId exista en ServiceCategory
    const category = await prisma.serviceCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        categoryId,
        isActive: isActive ?? true, // Activo por defecto si no se envía
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el servicio' });
  }
};

// Obtener todos los servicios
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true,
      },
    });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los servicios' });
  }
};


// Obtener un servicio por ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo servicio' });
  }
};

// Actualizar un servicio por ID
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId, isActive } = req.body; 

    const service = await prisma.service.update({
      where: { id },
      data: { name, description, categoryId, isActive },
    });

    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando servicio' });
  }
};
// Eliminar un servicio por ID
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id },
    });

    res.status(204).send(); // Respuesta sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando servicio' });
  }
};
