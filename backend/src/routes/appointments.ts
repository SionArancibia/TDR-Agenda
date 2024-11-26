import express from "express";
import { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment, assignPatientToAppointment, getAvailableAppointmentsByCommunityCenter, getAvailableAppointmentsByService } from '../controllers/appointments.controller';

import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.get("/", protectRoute, authorizeRole(['admin', 'professional']), getAppointments);
router.get('/:id', protectRoute, authorizeRole(['admin', 'professional']), getAppointmentById);
router.post('/', protectRoute, authorizeRole(['admin', 'professional']), createAppointment);
router.put('/:id', protectRoute, authorizeRole(['admin', 'professional']), updateAppointment);
router.delete('/:id', protectRoute, authorizeRole(['admin', 'professional']), deleteAppointment);
router.put("/assign-patient/:id", authorizeRole(['admin', 'professional', 'patient']), assignPatientToAppointment); // Asignar paciente a una cita (id de la cita)
router.get("/availableByCenter/:id", authorizeRole(['admin', 'professional', 'patient']), getAvailableAppointmentsByCommunityCenter); // id del comunity center
router.get("/availableByService/:id", authorizeRole(['admin', 'professional', 'patient']), getAvailableAppointmentsByCommunityCenter); // id del service

export default router;
