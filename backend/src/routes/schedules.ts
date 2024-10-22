import express from "express";
import { createSchedule, deleteSchedule, getSchedules, updateSchedule } from "../controllers/schedules.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.post('/', protectRoute, authorizeRole(['admin', 'professional']), createSchedule);
router.get('/:professionalId', protectRoute, authorizeRole(['admin', 'professional']), getSchedules);
router.put('/:id', protectRoute, authorizeRole(['admin', 'professional']), updateSchedule);
router.delete('/:id', protectRoute, authorizeRole(['admin', 'professional']), deleteSchedule);


export default router;