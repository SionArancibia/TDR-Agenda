import express from "express";
import {getAppointments} from "../controllers/appointments.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
const router = express.Router();


router.get("/appointments", protectRoute, authorizeRole(['admin', 'professional']), getAppointments);

export default router;