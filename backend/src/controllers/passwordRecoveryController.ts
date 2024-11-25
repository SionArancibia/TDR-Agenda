import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../db/prisma';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import path from "path"

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


// -----------------------------Reset password mobile--------------------------------------------------

// POST    /reset-password     ->  /reset-password-mobile
export const resetPasswordMobile = async (req: Request, res: Response) => {
    const { rut, email } = req.body;
  
    // Busca al usuario por su RUT
    const user = await prisma.user.findUnique({ where: { rut } });
  
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  
    // Genera un token JWT con el RUT del usuario
    const token = jwt.sign({ rut: user.rut }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Token válido por 1 hora
    });
  
    // Crea el enlace con el token
    const resetLink = `http://localhost:5173/change-password-mobile/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Correo desde el cual se enviará el mail
        pass: process.env.EMAIL_PASS, // Contraseña del correo
      },
    });

  
    // Configura los detalles del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para cambiar tu contraseña: ${resetLink}`,
    };
  
    // Envía el correo 
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error al enviar el correo' });
      }
      res.status(200).json({ message: 'Correo enviado correctamente' });
    });
};

// ----------------------------------------------------------------------------------------------------------------------------------------
// GET  /change-password       -> /change-password-mobile

export const changePasswordMobile = async (req: Request, res: Response) => {
    const { token } = req.params;

    if (typeof token !== 'string') {
      return res.status(400).send("El token es requerido y debe ser una cadena válida.");
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      console.log(path.join(__dirname, '..', 'components', 'ChangePassword.html'));
      res.sendFile(path.join(__dirname, '..', 'components', 'ChangePassword.html'));
    } catch (error) {
      console.error(error);
      res.status(400).send("Token inválido o expirado");
    }
};
  
  
// ----------------------------------------------------------------------------------------------------------------------------------------
// POST /change-password       -> /change-password-mobile
interface JwtPayload {
  rut: string;
}

export const postChangePasswordMobile = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  //console.error(req.body);
  if (!token) {
    return res.status(400).json({ message: 'El token no fue proporcionado.' });
  }
  
  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  
    // Actualiza la contraseña del usuario
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    if (!decoded.rut) {
      return res.status(400).json({ message: 'El token no contiene un RUT válido.' });
    }

    await prisma.user.update({
      where: { rut: decoded.rut },
      data: { password: hashedPassword },
    });
  
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
};
  
  // ----------------------------------------------------------------------------------------------------------------------------------------
  