import { Router } from "express";
import { getRules, updateRuleConfig, resetRuleConfig } from "../controllers/ruleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const ruleRouter = Router();

ruleRouter.get("/", authMiddleware, getRules);
ruleRouter.put("/:ruleId", authMiddleware, updateRuleConfig);
ruleRouter.delete("/:ruleId", authMiddleware, resetRuleConfig);

export default ruleRouter;
