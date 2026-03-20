import simpleGit from "simple-git";
import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";

// Import your existing scanner engine tools!
import { scanFiles } from "./fileScanner.js";
import { runScan } from "./ruleEngine.js";
import { RULES } from "./rules.js";

export const scanRepo = async (req: Request, res: Response) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ message: "Repo URL is required" });
  }

  const tempDir = path.join(os.tmpdir(), `repo-${uuidv4()}`);
//   @ts-ignore
  const git = simpleGit();

  try {
    console.log("Cloning repo:", repoUrl);

    // 1. Clone the repo
    await git.clone(repoUrl, tempDir, ["--depth", "1"]);

    // 2. Fetch all files recursively using your custom scanner
    const files = scanFiles(tempDir);

    // 3. Run the rule engine against the cloned files
    const violations = runScan(files, tempDir, RULES);

    // 4. Calculate Risk Score (similar to scanController.ts)
    const highCount = violations.filter(v => v.severity === "HIGH").length;
    const medCount = violations.filter(v => v.severity === "MEDIUM").length;
    const riskScore = highCount * 3 + medCount * 1;
    const status = highCount > 0 ? "BLOCK" : "PASS";
    const riskSeverity = highCount > 0 ? "HIGH" : medCount > 0 ? "MEDIUM" : "LOW";

    // 5. Return the full scan results
    res.json({
      repoUrl,
      status,
      riskSeverity,
      riskScore,
      totalViolations: violations.length,
      violations,
    });

  } catch (err) {
    console.error("Scan failed:", err);
    res.status(500).json({ message: "Failed to scan repo"});
  } finally {
    // 6. Automatically clean up the cloned files
    if (fs.existsSync(tempDir)) {
        console.log(tempDir)
        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log(tempDir)
    }
  }
};
