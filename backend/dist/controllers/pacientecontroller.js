"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPacientes = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getPacientes = async (req, res) => {
    console.log('Entrando a getPacientes');  
    try {
        const pacientes = await prisma.paciente.findMany();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error('Error al obtener pacientes:', error); 
        res.status(500).json({ error: "Error obteniendo los pacientes" });
    }
};
exports.getPacientes = getPacientes;
