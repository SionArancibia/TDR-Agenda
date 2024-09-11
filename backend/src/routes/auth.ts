import express from "express";
import { login, logout, signup, getMe, getCitas} from "../controllers/authcontroller"; 
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
const router = express.Router();

router.get("/me", protectRoute, authorizeRole(['admin']), getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/citas", getCitas);

export default router;