import type { request, Response} from "express";
import express from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: number, res: Response) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};