"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsers = exports.deleteUsers = exports.getUsers = exports.getUserById = exports.createUsers = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const createUsers = async (req, res) => {
    //console.log(req.body);
    try {
        const { rut, nombres, apellidos, domicilio, edad, telefono, contrasena, confirmarContrasena, gender, role } = req.body;
        if (!rut ||
            !nombres ||
            !apellidos ||
            !domicilio ||
            !edad ||
            !telefono ||
            !contrasena ||
            !confirmarContrasena ||
            !gender ||
            !role) {
            return res.status(400).json({ error: "Por favor completa todos los campos" });
        }
        if (contrasena !== confirmarContrasena) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" });
        }
        const existingUser = await prisma_1.default.usuario.findUnique({ where: { rut } });
        if (existingUser) {
            return res.status(400).json({ error: "El RUT ya está registrado" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(contrasena, salt);
        const newUser = await prisma_1.default.usuario.create({
            data: {
                rut,
                nombres,
                apellidos,
                domicilio,
                edad: edad,
                telefono: telefono,
                contrasena: hashedPassword,
                gender,
                role,
            },
        });
        if (newUser) {
            (0, generateToken_1.default)(newUser.id, newUser.role, res);
            return res.status(201).json({
                id: newUser.id,
                rut: newUser.rut,
                nombres: newUser.nombres,
                apellidos: newUser.apellidos,
                role: newUser.role
            });
        }
        else {
            return res.status(400).json({ error: "Datos de usuario no válidos" });
        }
    }
    catch (error) {
        console.error("Error en el controlador de registro:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.createUsers = createUsers;
//------------------------------------------------------------------------------------------------
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma_1.default.usuario.findUnique({
            where: { id: id },
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};
exports.getUserById = getUserById;
//------------------------------------------------------------------------------------------------
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.usuario.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
exports.getUsers = getUsers;
//------------------------------------------------------------------------------------------------
const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma_1.default.usuario.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: 'Usuario eliminado correctamente', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
exports.deleteUsers = deleteUsers;
//------------------------------------------------------------------------------------------------
const UpdateUsers = async (req, res) => {
    const { id } = req.params;
    const { rut, nombres, apellidos, domicilio, edad, role, telefono, gender } = req.body;
    try {
        const updatedUser = await prisma_1.default.usuario.update({
            where: { id: id },
            data: {
                rut: rut,
                nombres: nombres,
                apellidos: apellidos,
                domicilio: domicilio,
                edad: parseInt(edad),
                role: role,
                telefono: parseInt(telefono),
                gender: gender,
            },
        });
        res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
exports.UpdateUsers = UpdateUsers;
