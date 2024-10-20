
import express from "express";
import { blockProfessionalTime, getAvailableAppointments, getAppointmentsByDate  } from "../controllers/professionals.controller";

const router = express.Router();

router.post('/block', blockProfessionalTime);
router.get('/appointments/available', getAvailableAppointments);
router.get('/appointments/byDate', getAppointmentsByDate);

export default router;