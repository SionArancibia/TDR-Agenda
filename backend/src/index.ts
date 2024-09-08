import express from "express";
import authRoutes from "./routes/auth"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(PORT,()=> {
    console.log("Server running on port: ", PORT);
});