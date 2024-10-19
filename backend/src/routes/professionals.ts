
import express from "express";
import { blockProfessionalTime, 
        getAvailableAppointments, 
        generateAvailableAppointments, 
        deleteProfessional, 
        getAllProfessionals, 
        getProfessionalById, 
        updateProfessional} from "../controllers/professionals.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.post('/block', protectRoute, authorizeRole(['admin', 'professional']), blockProfessionalTime);
router.post('/generate/available/appointments', protectRoute, authorizeRole(['admin', 'professional']), generateAvailableAppointments);
router.get('/appointments/available', protectRoute, authorizeRole(['admin', 'professional', 'patient']), getAvailableAppointments);
router.get('/', protectRoute, authorizeRole(['admin', 'professional']), getAllProfessionals);
router.get('/:id', protectRoute, authorizeRole(['admin', 'professional']), getProfessionalById);
router.put('/:id', protectRoute, authorizeRole(['admin']), updateProfessional);
router.delete('/:id', protectRoute, authorizeRole(['admin']), deleteProfessional);

export default router;