import type { request, Response} from "express";
import express from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: number, res: Response) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
};
