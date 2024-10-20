import express from "express";
import { createRegistrationRequest, getRegistrationRequests, validateRegistrationRequest, cancelAppointmentRequest} from "../controllers/requests.controller";

const router = express.Router();

router.post("/createRegistrationRequest", createRegistrationRequest);
router.get("/getRegistrationRequests", getRegistrationRequests);
router.post("/validateRegistrationRequest", validateRegistrationRequest);
router.post("/cancelAppointmentRequest", cancelAppointmentRequest);

export default router;