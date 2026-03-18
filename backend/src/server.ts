import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.js";
import ruleRouter from "./routes/rule.js";
import { getScanHistory, scanner } from "./controllers/scanController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/rules", ruleRouter);

app.post("/scan", scanner);
app.get("/scan/history", authMiddleware, getScanHistory);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});