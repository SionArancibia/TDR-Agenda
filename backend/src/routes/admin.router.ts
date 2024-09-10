import express from "express";
import { getUsers, createUsers, deleteUsers, UpdateUsers} from "../controllers/admin.controller"; 

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/createUsers", createUsers);
router.put("/UpdateUsers", deleteUsers);
router.delete("/deleteUsers", UpdateUsers);

export default router;