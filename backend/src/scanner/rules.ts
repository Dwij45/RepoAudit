import type { ComplianceRule } from "../types/index.js";

export const RULES: ComplianceRule[] = [

    //  SECURITY RULES
    // SEC001: Hardcoded secrets in source code
    {
        id: "SEC001",
        name: "Hardcoded API Key/Secret",
        description: "CRITICAL: Detected a hardcoded API Key or Secret. Use environment variables instead.",
        severity: "HIGH",
        category: "SECURITY",
        type: "regex",
        pattern: "(api_key|secret|token|password|auth_token)\\s*=\\s*['\"][a-zA-Z0-9_\\-]{4,}['\"]"
    },

    // SEC002: Insecure HTTP (should use HTTPS)
    {
        id: "SEC002",
        name: "Insecure HTTP URL",
        description: "WARNING: Usage of http:// detected. Use https:// for secure communication.",
        severity: "MEDIUM",
        category: "SECURITY",
        type: "regex",
        pattern: "http://[^\\s]+"
    },

    // CONFIG RULES
    // CFG001: .env file should NEVER be committed to Git
    {
        id: "CFG001",
        name: ".env File Committed",
        description: "HIGH RISK: The .env file contains sensitive secrets and should not be committed to Git.",
        severity: "HIGH",
        category: "CONFIG",
        type: "file_existence",
        targetFile: ".env"
    },

    // GITIGNORE RULES — checks that .gitignore covers critical entries
    // The engine looks for this entry inside the .gitignore file content.

    // GIT001: .env must be in .gitignore
    {
        id: "GIT001",
        name: ".env Not in .gitignore",
        description: "SECURITY: '.env' is missing from .gitignore. Your secrets will be exposed if you push to Git.",
        severity: "HIGH",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: ".env"
    },

    // GIT002: node_modules must be in .gitignore
    {
        id: "GIT002",
        name: "node_modules Not in .gitignore",
        description: "CONFIG: 'node_modules' is missing from .gitignore. This will cause massive unnecessary uploads to Git.",
        severity: "MEDIUM",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: "node_modules"
    },

    // GIT003: dist/ build output must be in .gitignore
    {
        id: "GIT003",
        name: "dist Not in .gitignore",
        description: "CONFIG: 'dist' (build output) is missing from .gitignore. Compiled files should not be tracked.",
        severity: "MEDIUM",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: "dist"
    },

    // GIT004: build/ output must be in .gitignore
    {
        id: "GIT004",
        name: "build Not in .gitignore",
        description: "CONFIG: 'build' (build output) is missing from .gitignore. Compiled files should not be tracked.",
        severity: "MEDIUM",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: "build"
    },

    // GIT005: .next (Next.js build cache) must be in .gitignore
    {
        id: "GIT005",
        name: ".next Not in .gitignore",
        description: "CONFIG: '.next' (Next.js cache) is missing from .gitignore.",
        severity: "LOW",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: ".next"
    },

    // GIT006: coverage reports must be in .gitignore
    {
        id: "GIT006",
        name: "coverage Not in .gitignore",
        description: "CONFIG: 'coverage' (test coverage reports) is missing from .gitignore.",
        severity: "LOW",
        category: "CONFIG",
        type: "gitignore_check",
        requiredEntry: "coverage"
    },

    // PRIVACY / LEGAL RULES

    // PRV001: Privacy policy file must exist
    {
        id: "PRV001",
        name: "Privacy Policy Missing",
        description: "LEGAL: A Privacy Policy file (privacy.html or .md) is required for compliance.",
        severity: "LOW",
        category: "PRIVACY",
        type: "file_existence",
        targetFile: "privacy.html"
    }
];