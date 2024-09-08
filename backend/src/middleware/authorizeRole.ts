import { Request, Response, NextFunction } from "express";

const authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
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

export default authorizeRole;