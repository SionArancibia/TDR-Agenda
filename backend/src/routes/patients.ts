import express from 'express';
import { getPacientes } from '../controllers/patients.controller'; 

const router = express.Router();

router.get('/patients', getPacientes);

export default router;
