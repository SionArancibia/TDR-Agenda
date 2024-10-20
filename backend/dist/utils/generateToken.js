"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, role, res) => {
    const token = jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // MS,
        httpOnly: true, // prevent XSS cross site scripting
        sameSite: "strict", // CSRF attack cross-site request forgery
        secure: false, // HTTP
    });
    return token;
};
exports.default = generateToken;
