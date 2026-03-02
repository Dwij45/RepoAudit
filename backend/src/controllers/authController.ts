import type { Request, Response } from "express";
// import prisma from "../db.js";

import { generateToken } from "../config/tokengenration.js";
import bcrypt from "bcrypt";
import {z} from "zod";
import jwt from "jsonwebtoken";
import prisma from "../db.js";
import { userInfo } from "os";


const JWT_SECRET  = process.env.JWT_SECRET;
const userSchema = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[+$@#%&!]).+$/, "Password must contain uppercase, lowercase, number, and special symbol"),
    name: z.string().min(3).max(50)
});
const signup = async (req: Request, res: Response) => {

       const { email, password, name } = userSchema.parse(req.body);
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

            const parsed=userSchema.safeParse({ email, password, name });
                if (!parsed.success) {
                    const err = new Error('Invalid input');
                    // err.status = 400;
                    // err.details = parsed.error.issues;
                    throw err;
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
             
             res.status(201).json(user);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: error });
        }
        
        return res.status(201).json({
            message: "User created successfully",
            user: { email, name }
        });

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

    return res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: user.id, email: user.email, name: user.name } 
    });
    res.status(200).json(user);
 }
 catch(error){
    console.log(error);
    return res.status(500).json({ message: error });
 }
}
export {
    signup,
    login
}