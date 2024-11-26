import express from 'express';
import { getPacientes, getPatientByUserId } from '../controllers/patients.controller'; 

const router = express.Router();

router.get('/patients', getPacientes);
router.get('/getByUserId/:id', getPatientByUserId);

export default router;
