import fs from "fs";
import path from "path";
import { ALLOWED_EXTENSIONS, IGNORED_FOLDERS } from "../config/scanconfigs.js";

export interface ScannedFile {
  filePath: string;
  content: string;
}

/**
 * scanFiles — The File Walker (The Eyes of the Scanner)
 *
 * Recursively walks a directory and returns every readable file
 * as a { filePath, content } object. on each itteration it will it will go further in folder
 *
 * What it skips:
 *  - Folders listed in IGNORED_FOLDERS (node_modules, .git, dist, etc.)
 *  - Files whose extension is NOT in ALLOWED_EXTENSIONS
 *
 * Special case: path.extname(".env") returns "" (empty string),
 * so .env files are handled explicitly by checking the filename directly.
 */

export function scanFiles(projectPath: string): ScannedFile[] {
  const results: ScannedFile[] = [];

  function walk(dir: string) {
    // Guard: don't crash if folder doesn't exist
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);

      // Skip ignored folders BEFORE stat — avoids descending into node_modules etc.
      if (IGNORED_FOLDERS.includes(entry)) {
        continue; // Move to the next entry immediately
      }

      try {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Recurse into sub-directories
          walk(fullPath);
        } else {
          // It's a file — check if we should include it
          const ext = path.extname(entry);
          const isEnvFile = entry === ".env";           // Special case: .env has no extension
          const isGitIgnore = entry === ".gitignore";   // Special case: .gitignore has no extension

          if (ALLOWED_EXTENSIONS.includes(ext) || isEnvFile || isGitIgnore) {
            const content = fs.readFileSync(fullPath, "utf-8");
            results.push({ filePath: fullPath, content }); // Actually push the file!
          }
        }
      } catch (err) {
        // Gracefully skip locked/unreadable files (e.g. temp OS files)
        console.warn(`Could not read file, skipping: ${fullPath}`);
      }
    }
  }

  walk(projectPath);
  return results;
}