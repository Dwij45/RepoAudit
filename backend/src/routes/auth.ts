import { Router } from "express";
import {signup, login,logout,updateProfile, Profile } from "../controllers/authController.js";
import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter=Router();
authRouter.use(express.json());
authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/profile",authMiddleware,updateProfile);
authRouter.get("/profile",authMiddleware,Profile);

export default authRouter;