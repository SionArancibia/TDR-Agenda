
import express from "express";
import { blockProfessionalTime, getAvailableAppointments } from "../controllers/professionals.controller";

const router = express.Router();

router.post('/block', blockProfessionalTime);
router.get('/appointments/available', getAvailableAppointments);

export default router;