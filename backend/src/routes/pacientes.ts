import express from 'express';
import { getPacientes } from '../controllers/pacientecontroller'; 

const router = express.Router();

router.get('/pacientes', getPacientes);

export default router;
