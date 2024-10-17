import express from "express";
import { createRegistrationRequest, getRegistrationRequests, validateRegistrationRequest } from "../controllers/requests.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.post("/createRegistrationRequest", createRegistrationRequest);
router.get("/getRegistrationRequests", protectRoute, authorizeRole(['admin']), getRegistrationRequests);
router.post("/validateRegistrationRequest", protectRoute, authorizeRole(['admin']), validateRegistrationRequest);

export default router;