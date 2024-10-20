"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = express_1.default.Router();
router.get('/getUser/:id', admin_controller_1.getUserById);
router.get("/getUsers", admin_controller_1.getUsers);
router.post("/createUsers", admin_controller_1.createUsers);
router.put("/updateUsers/:id", admin_controller_1.UpdateUsers);
router.delete("/deleteUsers/:id", admin_controller_1.deleteUsers);
exports.default = router;
