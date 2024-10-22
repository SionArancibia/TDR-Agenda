import { Request, Response } from 'express';
import prisma from '../db/prisma';

// Obtener todos los bloqueos de agenda
export const getAllProfessionalBlocks = async (req: Request, res: Response) => {
  try {
    const blocks = await prisma.professionalBlock.findMany();
    res.status(200).json(blocks);
  } catch (error) {
    console.error('Error al obtener los bloques de tiempo:', error);
    res.status(500).json({ error: 'Error al obtener los bloques de tiempo' });
  }
};

// Obtener un bloqueo por ID
export const getProfessionalBlockById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const block = await prisma.professionalBlock.findUnique({
      where: { id },
    });

    if (!block) {
      return res.status(404).json({ error: 'Bloque de tiempo no encontrado.' });
    }

    res.status(200).json(block);
  } catch (error) {
    console.error('Error al obtener el bloque de tiempo:', error);
    res.status(500).json({ error: 'Error al obtener el bloque de tiempo' });
  }
};

export const getProfessionalBlocksByProfessionalId = async (req: Request, res: Response) => {
    const { professionalId } = req.params; // Obtener el ID del profesional desde los parámetros de la ruta
  
    try {
      // Obtener los bloques de tiempo del profesional
      const blocks = await prisma.professionalBlock.findMany({
        where: {
          professionalId: String(professionalId), // Filtrar por el ID del profesional
        },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          reason: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      if (!blocks.length) {
        return res.status(404).json({ error: 'No se encontraron bloqueos para este profesional.' });
      }
  
      res.status(200).json(blocks); // Devolver los bloqueos encontrados
    } catch (error) {
      console.error('Error al obtener los bloqueos del profesional:', error);
      res.status(500).json({ error: 'Error al obtener los bloqueos del profesional' });
    }
};

// Eliminar un bloqueo por ID
export const deleteProfessionalBlock = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const block = await prisma.professionalBlock.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Bloqueo eliminado exitosamente.', block });
  } catch (error) {
    console.error('Error al eliminar el bloqueo:', error);
    res.status(500).json({ error: 'Error al eliminar el bloqueo' });
  }
};

// Bloquear un periodo de tiempo en la agenda de un profesional.
export const blockProfessionalTime = async (req: Request, res: Response) => {
    const { professionalId, startDate, endDate, reason } = req.body;
  
    try {
      // Verificar si el profesional existe
      const professionalExists = await prisma.professional.findUnique({
        where: { id: professionalId },
      });
  
      if (!professionalExists) {
        return res.status(404).json({ error: 'Profesional no encontrado.' });
      }
  
      // Crear el bloque de tiempo
      const block = await prisma.professionalBlock.create({
        data: {
          professionalId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          reason,
        },
      });
  
      res.status(201).json(block);
    } catch (error) {
      console.error('Error al bloquear el periodo:', error);
      res.status(500).json({ error: 'Error al bloquear el periodo' });
    }
};