import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, rut, contrasena, confirmPassword, gender, role, domicilio, edad, telefono } = req.body;
    const file = req.file; // Archivo subido

    // Validar campos
    if (!nombres || !apellidos || !rut || !contrasena || !confirmPassword || !gender || !role || !domicilio || !edad || !telefono) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (contrasena !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Verificar si el RUT ya existe
    const existingUser = await prisma.usuario.findUnique({ where: { rut } });
    if (existingUser) {
      return res.status(400).json({ error: "RUT already exists" });
    }

    // Hash de la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(contrasena, salt);

    // Crear nuevo usuario
    const newUser = await prisma.usuario.create({
      data: {
        nombres,
        apellidos,
        rut,
        contrasena: hashedPassword,
        gender,
        role,
        domicilio,
        edad,
        telefono,
      },
    });

    if (newUser) {
      generateToken(String(newUser.id), newUser.role, res);
      res.status(201).json({
        id: newUser.id,
        nombres: newUser.nombres,
        apellidos: newUser.apellidos,
        rut: newUser.rut,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { rut, contrasena } = req.body;

    const user = await prisma.usuario.findUnique({ where: { rut } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(contrasena, user.contrasena);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(String(user.id), user.role, res);

    res.status(200).json({
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      rut: user.rut,
      role: user.role,
    });
  } catch (error: any) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id: req.user.id } });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      rut: user.rut,
      role: user.role,
      gender: user.gender,
      telefono: user.telefono,
    });
  } catch (error: any) {
    console.log("Error in getMe controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
