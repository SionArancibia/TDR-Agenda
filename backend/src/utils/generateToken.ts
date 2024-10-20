import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, role: string, res: Response) => {
	const token = jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
		expiresIn: "10d",
	});

	res.cookie("jwt", token, {
		maxAge: 10 * 24 * 60 * 60 * 1000, // MS,
		httpOnly: true, // prevent XSS cross site scripting
		sameSite: "strict", // CSRF attack cross-site request forgery
		secure: false, // HTTP
	});

	return token;
};

export default generateToken;