import express from "express";
import { getUserById, getUsers, deleteUser, createUser, UpdateUser, getUsersByRole} from "../controllers/users.controller"; 

const router = express.Router();

router.get("/getUsers", getUsers);
router.get('/getUser/:id', getUserById);
router.get('/getUsersByRole/:role', getUsersByRole);
router.post("/createUser", createUser)
router.put("/updateUser/:id", UpdateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;