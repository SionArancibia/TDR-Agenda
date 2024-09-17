import express from "express";
import { login, logout, signup, getMe} from "../controllers/authcontroller"; 
import {getCitas} from "../controllers/citascontroller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
const router = express.Router();

router.get("/me", protectRoute, authorizeRole(['admin', 'professional']), getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/citas", protectRoute, authorizeRole(['admin', 'professional']), getCitas);

export default router;