import express from "express";
import authRoutes from "./routes/auth"
import citasRoutes from "./routes/citas"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/admin.router"

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/adminCrud", adminRoutes);
app.use("/api/profesional", citasRoutes);

app.listen(PORT,()=> {
    console.log("Server running on port: ", PORT);
});