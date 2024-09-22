"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCitas = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getCitas = async (req, res) => {
    const { rut, mes, año } = req.query;
    if (!rut || !mes || !año) {
        return res.status(400).json({ error: "Faltan parámetros requeridos" });
    }
    try {
        // Paso 1: Obtener el id del profesional usando el rut
        const profesional = await prisma_1.default.profesional.findUnique({
            where: {
                rut: rut,
            },
            select: {
                id: true,
            },
        });
        if (!profesional) {
            return res.status(404).json({ error: "Profesional no encontrado" });
        }
        // Paso 2: Obtener las citas del profesional, filtrando por mes y año
        const mesInt = parseInt(mes);
        const añoInt = parseInt(año);
        // Validar que el mes y año sean válidos
        if (isNaN(mesInt) || isNaN(añoInt) || mesInt < 1 || mesInt > 12 || añoInt < 1900 || añoInt > 2100) {
            return res.status(400).json({ error: "Mes o año inválidos" });
        }
        const fechaInicio = new Date(añoInt, mesInt - 1, 1); // 1 de mes
        const fechaFin = new Date(añoInt, mesInt, 1); // 1 del mes siguiente
        const citas = await prisma_1.default.citas.findMany({
            where: {
                profesionalId: profesional.id,
                fecha: {
                    gte: fechaInicio,
                    lt: fechaFin,
                },
            },
        });
        res.status(200).json(citas);
    }
    catch (error) {
        console.log("Error en el controlador getCitas", error.message);
        res.status(500).json({ error: "Error Interno del Servidor" });
    }
};
exports.getCitas = getCitas;
