"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized - No user data available" });
        }
        const role = req.user.role;
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ error: "Forbidden - You do not have permission to access this resource" });
        }
        next();
    };
};
exports.default = authorizeRole;
