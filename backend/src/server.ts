import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.js";
import { getScanHistory, scanner } from "./controllers/scanController.js";

import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Auth routes (signup, login)
app.use("/auth", authRouter);

// Scan — open to everyone, saves to DB only if logged in
app.post("/scan", scanner);

// Scan history — requires login
app.get("/scan/history", authMiddleware, getScanHistory);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});