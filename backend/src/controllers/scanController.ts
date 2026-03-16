import path from "path";
import { fileURLToPath } from "url";

import prisma from "../db.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { scanFiles } from "../scanner/fileScanner.js";
import { runScan } from "../scanner/ruleEngine.js";

/**
 * POST /scan
 * 
 * Anyone can scan → they get violations back immediately.
 * If the user is logged in (has a valid token cookie), the result is ALSO saved to the DB.
 * If not logged in, they still get the scan result — just not saved.
 */
export const scanner = async (req: Request, res: Response) => {
    try {
        // const { projectPath } = req.body;
        const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
        
            const projectPath = path.join(__dirname, "../test_data");

        if (!projectPath) {
            return res.status(400).json({ message: "projectPath is required" });
        }

        // --- STEP 1: Run the scan (available to EVERYONE) ---
        const files = scanFiles(projectPath);
        const violations = runScan(files, projectPath);

        // Calculate risk
        const highCount = violations.filter(v => v.severity === "HIGH").length;
        const medCount = violations.filter(v => v.severity === "MEDIUM").length;
        const riskScore = highCount * 3 + medCount * 1;
        const status = highCount > 0 ? "BLOCK" : "PASS";
        const riskSeverity = highCount > 0 ? "HIGH" : medCount > 0 ? "MEDIUM" : "LOW";

        // --- STEP 2: Check if user is logged in (OPTIONAL — don't block if not) ---
        let userId: number | null = null;
        let saved = false;

        const token = req.cookies?.token;
        const secret = process.env.JWT_SECRET;

        if (token && secret) {
            try {
                const decoded = jwt.verify(token, secret) as { userId: number };
                userId = decoded.userId;
            } catch {
                // Token is invalid/expired — that's fine, just don't save
                userId = null;
            }
        }

        // --- STEP 3: If logged in, save to DB ---
        if (userId) {
            await prisma.scanResult.create({
                data: {
                    userId,
                    projectPath,
                    riskSeverity,
                    status,
                    violations: violations as any,
                }
            });
            saved = true;
        }

        // --- STEP 4: Return result to everyone ---
        return res.status(200).json({
            status,
            riskSeverity,
            riskScore,
            totalViolations: violations.length,
            saved,                              // tells frontend if it was saved
            loggedIn: userId !== null,           // tells frontend if user is logged in
            violations,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Scan failed" });
    }
};

/**
 * GET /scan/history
 * 
 * Only for logged-in users — returns their saved scan history.
 * This one NEEDS authMiddleware on the route.
 */
export const getScanHistory = async (req: any, res: Response) => {
    try {
        const scans = await prisma.scanResult.findMany({
            where: { userId: req.userId },
            orderBy: { scannedAt: "desc" }
        });
        return res.json(scans);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch scan history" });
    }
};
