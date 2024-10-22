
import express from "express";
import {
        getAvailableAppointments, 
        generateAvailableAppointments,
        getAppointmentsByDate, 
        deleteProfessional, 
        getAllProfessionals, 
        getProfessionalById, 
        updateProfessional, 
        getAllAppointments} from "../controllers/professionals.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();


router.get('/appointments/byDate',protectRoute, authorizeRole(['admin', 'professional']), getAppointmentsByDate);
router.post('/generate/available/appointments', protectRoute, authorizeRole(['admin', 'professional']), generateAvailableAppointments);
router.get('/appointments/available', protectRoute, authorizeRole(['admin', 'professional', 'patient']), getAvailableAppointments);
router.get('/appointments/all', protectRoute, authorizeRole(['admin', 'professional']), getAllAppointments);
router.get('/', protectRoute, authorizeRole(['admin', 'professional']), getAllProfessionals);
router.get('/:id', protectRoute, authorizeRole(['admin', 'professional']), getProfessionalById);
router.put('/:id', protectRoute, authorizeRole(['admin']), updateProfessional);
router.delete('/:id', protectRoute, authorizeRole(['admin']), deleteProfessional);

export default router;