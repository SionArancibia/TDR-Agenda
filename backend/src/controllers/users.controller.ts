import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";
import { Role } from '@prisma/client';  // Importa el enum Role desde Prisma

export const createUser = async (req: Request, res: Response) => {
	try {
		const {
			rut,
			firstName,
			lastName,
			address,
			age,
			email,
			phoneNumber,
			password,
			confirmPassword,
			gender,
			role,
			// Campos adicionales para roles específicos
			area,       // Para profesionales
			specialty,  // Para profesionales
			attendanceRecord, // Para pacientes
			reducedMobility,   // Para pacientes
			medicalRecord      // Para pacientes
		} = req.body;

		// Validaciones de entrada
		if (
			!rut ||
			!email ||
			!firstName ||
			!lastName ||
			!address ||
			!age ||
			!phoneNumber ||
			!password ||
			!confirmPassword ||
			!gender ||
			!role
		) {
			return res.status(400).json({ error: "Por favor completa todos los campos" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Las contraseñas no coinciden" });
		}

		const existingUser = await prisma.user.findUnique({ where: { rut } });

		if (existingUser) {
			return res.status(400).json({ error: "El RUT ya está registrado" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Crear el nuevo usuario
		const newUser = await prisma.user.create({
			data: {
				rut,
				firstName,
				lastName,
				address,
				email,
				age,
				phoneNumber,
				password: hashedPassword,
				gender,
				role,
			},
		});

		if (newUser) {
			// Crear un registro específico basado en el rol
			if (role === Role.professional) {
				await prisma.professional.create({
					data: {
						area: area || null,
						specialty: specialty || null,
						userId: newUser.id,
					},
				});
			} else if (role === Role.admin) {
				await prisma.administrator.create({
					data: {
						userId: newUser.id,
					},
				});
			} else if (role === Role.patient) {
				await prisma.patient.create({
					data: {
						attendanceRecord: attendanceRecord || null,
						reducedMobility: reducedMobility ?? false,
						medicalRecord: medicalRecord || null,
						userId: newUser.id,
					},
				});
			}

			return res.status(201).json({
				id: newUser.id,
				rut: newUser.rut,
				role: newUser.role
			});
		} else {
			return res.status(400).json({ error: "Datos de usuario no válidos" });
		}

	} catch (error: any) {
		console.error("Error en el controlador de registro:", error.message);
		return res.status(500).json({ error: "Error interno del servidor" });
	}
};


//------------------------------------------------------------------------------------------------

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

//------------------------------------------------------------------------------------------------

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

//------------------------------------------------------------------------------------------------

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Usuario eliminado correctamente', user });

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

//------------------------------------------------------------------------------------------------

export const UpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rut, firstName, lastName, address, age, role, phoneNumber, gender } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                rut: rut,
                firstName: firstName,
                lastName: lastName,
                address: address,
                age: parseInt(age),
                role: role,
                phoneNumber: parseInt(phoneNumber),
                gender: gender,
            },
        });

        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};


export const getUsersByRole = async (req: Request, res: Response) => {
	const { role } = req.params; 
  
	// Verifica si el rol recibido es válido dentro de los valores del enum Role
	if (!Object.values(Role).includes(role as Role)) {
	  return res.status(400).json({ error: 'Rol no válido' });
	}
  
	try {
	  const users = await prisma.user.findMany({
		where: {
		  role: role as Role,  // Se asegura que el role sea del tipo Role
		},
	  });
  
	  if (users.length === 0) {
		return res.status(404).json({ message: 'No se encontraron usuarios con este rol' });
	  }
  
	  res.status(200).json(users);
	} catch (error) {
	  console.error('Error al obtener usuarios por rol:', error);
	  res.status(500).json({ error: 'Error interno del servidor al obtener usuarios por rol' });
	}
};