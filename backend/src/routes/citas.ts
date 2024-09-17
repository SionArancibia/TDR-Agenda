import express from "express";
import {getCitas} from "../controllers/citascontroller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
const router = express.Router();


router.get("/citas", protectRoute, authorizeRole(['admin', 'professional']), getCitas);

export default router;