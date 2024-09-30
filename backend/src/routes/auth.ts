import express from "express";
import { login, logout, getMe} from "../controllers/auth.controller"; 
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.get("/me", protectRoute, authorizeRole(['admin', 'professional']), getMe);
router.post("/login", login);
router.post("/logout", logout);

export default router;