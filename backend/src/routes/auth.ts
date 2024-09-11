import express from "express";
import { login, logout, signup, getMe} from "../controllers/authcontroller"; 
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
const router = express.Router();

router.get("/me", protectRoute, authorizeRole(['admin']), getMe);
router.post("/signup", protectRoute, authorizeRole(['admin']), signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;