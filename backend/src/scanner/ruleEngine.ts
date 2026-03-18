import fs from "fs";
import path from "path";
import type { ScannedFile } from "./fileScanner.js";
import type { Violation, ComplianceRule } from "../types/index.js";

/**
 * The Logic Engine
 * 1. Takes the list of scanned files (content + path)
 * 2. Checks them against every rule in rules.ts
 * 3. Returns a list of Violations
 * 
 * Rule Types Handled:
 *   - "file_existence"  → Flags if a specific file IS present (e.g. .env/ node_modules / dist)
 *   - "gitignore_check" → Flags if a required entry is MISSING from .gitignore
 *   - "regex"           → Flags if a pattern is found inside file content
 */

export const runScan = (files: ScannedFile[], projectPath: string, rules: ComplianceRule[]): Violation[] => {
  const violations: Violation[] = [];

  // PRE-SCAN: Find .gitignore and read its content
  
  const gitIgnoreFile = files.find(
    (f) => path.basename(f.filePath) === ".gitignore"
  );
  const gitIgnoreContent = gitIgnoreFile?.content ?? "";

  // GITIGNORE CHECK
  // For every rule of type "gitignore_check", look for
  // its requiredEntry in the .gitignore file content.
  // If the entry is missing → raise a violation.

  if (gitIgnoreFile) {
    // .gitignore exists — now check if each required entry is covered,
    // BUT ONLY if that file/folder actually exists in the project.

    rules.forEach((rule) => {
      if (rule.type === "gitignore_check" && rule.requiredEntry) {

        // EXISTENCE CHECK: Does this file/folder actually exist in the project?

        const entryPath = path.join(projectPath, rule.requiredEntry);
        const entryExists = fs.existsSync(entryPath);

        if (!entryExists) {
          return; // Skip — the file/folder doesn't exist
        }

        // Entry exists in project — now check if .gitignore covers it
        const gitIgnoreLines = gitIgnoreContent
          .split(/\r?\n/)                          // Handle Windows (\r\n) and Unix (\n)
          .map((line) => line.trim())              // Strip surrounding whitespace
          .filter((line) => line && !line.startsWith("#")); // Skip blank lines and comments

        const isCovered = gitIgnoreLines.some(
          (line) => line === rule.requiredEntry || line === `/${rule.requiredEntry}`
        );

        if (!isCovered) {
          violations.push({
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            file: ".gitignore",
            message: `${rule.description} (found '${rule.requiredEntry}' in project but it is not covered by .gitignore)`,
          });
        }
      }
    });
  } else {

    // No .gitignore file found at all 
    violations.push({
      ruleId: "GIT000",
      ruleName: "Missing .gitignore File",
      severity: "HIGH",
      file: "project root",
      message:
        "CRITICAL: No .gitignore file found. Sensitive files like .env and node_modules may be pushed to Git.",
    });
  }

  // MAIN SCAN LOOP — file_existence + regex rules

  files.forEach((fileObj) => {
    const { filePath, content } = fileObj;
    const fileName = path.basename(filePath);

    rules.forEach((rule) => {

      // TYPE 1: File Existence Checks
      // Triggers when a specific file is found in the tree

      if (rule.type === "file_existence" && rule.targetFile) {
        if (fileName === rule.targetFile) {

          // Smart context: If .env was found BUT it's safely in .gitignore, don't flag it.
          if (fileName === ".env" && gitIgnoreContent.includes(".env")) {
            return; // Safe — gitignored correctly
          }

          violations.push({
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            file: fileName,
            message: rule.description,
          });
        }
      }

      // TYPE 2: Regex Content Checks
      // Scans the file's text for a matching pattern

      else if (rule.type === "regex" && rule.pattern ) {
        try {
          const regex = new RegExp(rule.pattern, "gi");

          // Check line by line so we can report the exact line number
          const lines = content.split(/\r?\n/);
          lines.forEach((line, index) => {
            regex.lastIndex = 0; // Reset stateful regex before each test
            if (regex.test(line)) {
              violations.push({
                ruleId: rule.id,
                ruleName: rule.name,
                severity: rule.severity,
                file: fileName,
                message: rule.description,
                line: index + 1, // Convert 0-index to human-readable 1-index
              });
            }
          });

        } catch (error) {
          console.error(`Regex Error in rule ${rule.id}:`, error);
        }
      }

    });
  });

  return violations;
};