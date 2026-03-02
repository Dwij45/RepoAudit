import { Router } from "express";
import {signup, login } from "../controllers/authController.js";
import express from "express";

const authRouter=Router();
authRouter.use(express.json());
authRouter.post("/signup",signup);
authRouter.post("/login",login);

export default authRouter;