"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = async (req, res) => {
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
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { rut, contrasena } = req.body;
        const user = await prisma_1.default.usuario.findUnique({
            where: { rut },
        });
        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(contrasena, user.contrasena);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }
        (0, generateToken_1.default)(user.id, user.role, res);
        res.status(200).json({
            id: user.id,
            rut: user.rut,
            nombres: user.nombres,
            role: user.role,
        });
        console.log("Inicio de sesión exitoso, respuesta enviada");
    }
    catch (error) {
        console.log("Error en el controlador de inicio de sesión", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.logout = logout;
const getMe = async (req, res) => {
    try {
        const user = await prisma_1.default.usuario.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({
            id: user.id,
            rut: user.rut,
            nombres: user.nombres,
            role: user.role,
            gender: user.gender,
        });
    }
    catch (error) {
        console.log("Error en el controlador de obtener usuario", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.getMe = getMe;
