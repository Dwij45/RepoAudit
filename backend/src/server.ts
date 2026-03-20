import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { pinoHttp } from 'pino-http';
import helmet from 'helmet';
import type { Request, Response } from "express";

import { logger } from "./logger.js";
import authRouter from "./routes/auth.js";
import ruleRouter from "./routes/rule.js";
import scanRouter from "./routes/scan.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use(helmet({
//   contentSecurityPolicy: false,
//   crossOriginEmbedderPolicy: false
// }));

app.use(pinoHttp({
  logger,
   customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  // Clean success message
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} → ${res.statusCode}`;
  },

  // Clean error message
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} → ${res.statusCode} | ${err.message}`;
  }
}));

app.use("/auth", authRouter);
app.use("/rules", ruleRouter);
app.use("/scan",scanRouter)

app.listen(3000, () => {
  console.log("Server started on port 3000");
});