import express from "express";
import { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointments.controller';

import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.get("/appointments", protectRoute, authorizeRole(['admin', 'professional']), getAppointments);
router.get('/appointments/:id', protectRoute, authorizeRole(['admin', 'professional']), getAppointmentById);
router.post('/appointments', protectRoute, authorizeRole(['admin', 'professional']), createAppointment);
router.put('/appointments/:id', protectRoute, authorizeRole(['admin', 'professional']), updateAppointment);
router.delete('/appointments/:id', protectRoute, authorizeRole(['admin', 'professional']), deleteAppointment);

export default router;
