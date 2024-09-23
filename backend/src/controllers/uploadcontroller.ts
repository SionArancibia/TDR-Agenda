import { Request, Response } from 'express';
import prisma from '../db/prisma'; 
import { upload } from '../middleware/fileUpload'; 


export const uploadFile = async (req: Request, res: Response) => {
  const { rut, password } = req.body;

  if (!rut || !password || !req.file) {
    return res.status(400).json({ error: 'Faltan datos o el archivo no ha sido enviado' });
  }

  try {
    
    const newUser = await prisma.usuario.create({
      data: {
        rut: rut,
        contrasena: password, 
            // @ts-ignore
        filePath: req.file.path ,
      },
    });

    res.status(200).json({
      message: 'Usuario creado con éxito',
      file: req.file,
    });
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};
