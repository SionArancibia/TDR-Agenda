"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controllers/authcontroller");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const authorizeRole_1 = __importDefault(require("../middleware/authorizeRole"));
const router = express_1.default.Router();
router.get("/me", protectRoute_1.default, (0, authorizeRole_1.default)(['admin', 'professional']), authcontroller_1.getMe);
router.post("/signup", authcontroller_1.signup);
router.post("/login", authcontroller_1.login);
router.post("/logout", authcontroller_1.logout);
exports.default = router;
