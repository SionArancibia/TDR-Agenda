"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pacientecontroller_1 = require("../controllers/pacientecontroller");
const router = express_1.default.Router();


router.get('/', pacientecontroller_1.getPacientes);

exports.default = router;
