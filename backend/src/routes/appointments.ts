import express from "express";
import { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointments.controller';

import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();


router.get("/", protectRoute, authorizeRole(['admin', 'professional']), getAppointments);
router.get('/:id', protectRoute, authorizeRole(['admin', 'professional']), getAppointmentById);
router.post('/', protectRoute, authorizeRole(['admin', 'professional']), createAppointment);
router.put('/:id', protectRoute, authorizeRole(['admin', 'professional']), updateAppointment);
router.delete('/:id', protectRoute, authorizeRole(['admin', 'professional']), deleteAppointment);

export default router;
