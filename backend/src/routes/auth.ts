import express from "express";
import { login, logout, getMe, loginMobile} from "../controllers/auth.controller"; 
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.get("/me", protectRoute, authorizeRole(['admin', 'professional']), getMe);
router.post("/login", login);
router.post("/loginMobile", loginMobile);
router.post("/logout", logout);

export default router;