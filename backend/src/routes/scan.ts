import { Router } from "express";

import { scanFolder } from "../controllers/scanController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getScanHistory } from "../controllers/scanController.js";
import {scanRepo} from "../scanner/repoScanner.js";
const scanRouter = Router();

scanRouter.post("/folder", scanFolder);
scanRouter.post("/repo", scanRepo);
scanRouter.get("/history", authMiddleware, getScanHistory);

export default scanRouter;