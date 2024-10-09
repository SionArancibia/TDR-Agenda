
import express from "express";
import { blockProfessionalTime, getAvailableAppointments } from "../controllers/professionals.controller";

const router = express.Router();

router.post('/professional/block', blockProfessionalTime);
router.get('/professional/appointments/available', getAvailableAppointments);

export default router;