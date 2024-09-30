import express from "express";
import { getUserById, getUsers, deleteUser, createUser, UpdateUser} from "../controllers/users.controller"; 

const router = express.Router();

router.get('/getUser/:id', getUserById);
router.get("/getUsers", getUsers);
router.post("/createUser", createUser)
router.put("/updateUser/:id", UpdateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;