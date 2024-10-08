import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
	const { rut, firstName, lastName, address, age, email, phoneNumber, password, gender, role } = req.body;
  
	try {
	  const existingUser = await prisma.user.findUnique({ where: { rut } });
  
	  if (existingUser) {
		return res.status(400).json({ message: "El usuario ya existe" });
	  }
  
	  const hashedPassword = await bcryptjs.hash(password, 10);
  
	  const newUser = await prisma.user.create({
		data: {
		  rut,
		  firstName,
		  lastName,
		  address,
		  age,
		  email, // Asegurarse de que email está definido
		  phoneNumber,
		  password: hashedPassword,
		  gender,
		  role
		}
	  });
  
	  const token = generateToken(newUser.id, newUser.role, res);
  
	  res.status(201).json({ token });
	} catch (error) {
	  res.status(500).json({ message: "Error al crear el usuario" });
	}
  };

export const login = async (req: Request, res: Response) => {
  try {
    const { rut, password } = req.body;

    if (!rut || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const user = await prisma.user.findUnique({ where: { rut } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(user.id, user.role, res);

    res.status(200).json({
      id: user.id,
      rut: user.rut,
      firstName: user.firstName,
      role: user.role,
    });
    console.log("Inicio de sesión exitoso, respuesta enviada");
  } catch (error: any) {
    console.log("Error en el controlador de inicio de sesión", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      id: user.id,
      rut: user.rut,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      age: user.age,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.role,
	  email: user.email,
    });
  } catch (error: any) {
    console.log("Error en el controlador de obtener usuario", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};