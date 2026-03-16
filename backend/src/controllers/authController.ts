import type { Request, Response } from "express";

import { generateToken } from "../config/tokengenration.js";
import bcrypt from "bcrypt";
import {z} from "zod";
import jwt from "jsonwebtoken";
import prisma from "../db.js";


const JWT_SECRET  = process.env.JWT_SECRET;
const userSchema = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[+$@#%&!]).+$/, "Password must contain uppercase, lowercase, number, and special symbol"),
    name: z.string().min(3).max(50)
});
const signup = async (req: Request, res: Response) => {

    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ 
            message: "Invalid input", 
            errors: parsed.error.issues 
        });
    }
    const { email, password, name } = parsed.data;   

       if (!email || !password || !name) {
           return res.status(400).json({ message: "All fields are required" });
        }
        try{
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    name
                }
            })
             generateToken(user.id, res);

             return res.status(201).json({
                 message: "User created successfully",
                 user: { email, name }
             });
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: "internal server error"});
        }
        

}

const login = async (req: Request, res: Response) =>{
 const {email,password}=req.body;
 if(!email || !password){
    return res.status(400).json({ message: "All fields are required" });
 }
 try{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({ message: "Invalid password" });
    }
    //generate jwt token
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined");
    }
     generateToken(user.id, res);

    return res.status(200).json({ 
      message: "User registered successfully", 
      user: { id: user.id, email: user.email, name: user.name } 
    });

 }
 catch(error){
    console.log(error);
    return res.status(500).json({ message: "Auth fialed" });
 }
}
const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
const Profile = (async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
    // @ts-ignore  
    where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const updateProfile = async (req: Request, res: Response) => {
     try {
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
        // @ts-ignore
      where: { id: req.userId },
      data: {
        name,
        email
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
}
export {
    signup,
    login,
    logout,
    Profile,
    updateProfile
}