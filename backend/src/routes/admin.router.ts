import express from "express";
import { getUserById, getUsers, createUsers, deleteUsers, UpdateUsers} from "../controllers/admin.controller"; 

const router = express.Router();

router.get('/getUser/:id', getUserById);
router.get("/getUsers", getUsers);
router.post("/createUsers", createUsers);
router.put("/updateUsers/:id", UpdateUsers);
router.delete("/deleteUsers/:id", deleteUsers);

export default router;