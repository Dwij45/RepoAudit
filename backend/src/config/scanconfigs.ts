export const ALLOWED_EXTENSIONS = [".js", ".ts", ".json", ".env", ".html", ".css", ".md"];
export const IGNORED_FOLDERS = ["node_modules", ".git", "dist", "build", ".next", "coverage"];

// The rule engine will check each one and raise a violation if any are missing.
export const REQUIRED_GITIGNORE_ENTRIES = [
    ".env",
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
];
