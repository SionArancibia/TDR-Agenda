import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../db/prisma';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

export const passwordRecovery = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un token de recuperación
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 3600000); // 1 hora

    // Guardar el token y la fecha de expiración en la base de datos
    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: tokenExpires,
      },
    });

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Recibimos una solicitud para restablecer tu contraseña. Utiliza el siguiente enlace para restablecer tu contraseña: \n\nhttp://${req.hostname}:5173/resetPassword/${token}\n\nSi no solicitaste este cambio, ignora este correo.`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Solicitud de recuperación de contraseña enviada con éxito' });
  } catch (error) {
    console.error('Error en la solicitud de recuperación de contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    // Buscar al usuario por el token de recuperación
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    // Verificar que la nueva contraseña no sea igual a la anterior
    const isSamePassword = await bcryptjs.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ error: 'La nueva contraseña no puede ser la misma que la anterior' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Actualizar la contraseña del usuario y eliminar el token de recuperación
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
};