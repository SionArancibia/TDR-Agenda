"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const citascontroller_1 = require("../controllers/citascontroller");
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const authorizeRole_1 = __importDefault(require("../middleware/authorizeRole"));
const router = express_1.default.Router();
router.get("/citas", protectRoute_1.default, (0, authorizeRole_1.default)(['admin', 'professional']), citascontroller_1.getCitas);
exports.default = router;
