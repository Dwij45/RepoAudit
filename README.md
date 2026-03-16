# RepoAudit

RepoAudit is an automated repository compliance and security auditing tool that scans GitHub repositories to detect common security risks, configuration mistakes, and sensitive data leaks.

The system analyzes project files using rule-based checks to identify vulnerabilities such as exposed secrets, improper password handling, and unsafe repository configurations. RepoAudit helps developers quickly identify security issues and follow best practices before deploying their applications.

---

# Overview

Modern repositories often contain hidden security risks such as hardcoded credentials, misconfigured files, or weak authentication logic. RepoAudit automates the process of scanning repositories and generating security reports.

The tool clones or accesses a repository, scans files using predefined security rules, and produces a structured report describing detected issues and recommended fixes.

RepoAudit aims to simplify **early-stage security auditing** and demonstrate how automated DevSecOps tooling can be built using backend systems.

---

# Key Features

## Repository Scanning

RepoAudit scans all files within a repository and applies rule-based analysis to detect security violations.

The scanner performs recursive file traversal and inspects source code, configuration files, and repository metadata.

---

## Secret Leak Detection

The system detects potential **hardcoded secrets**, including:

- API keys
- authentication tokens
- database credentials
- private keys

These checks help prevent accidental exposure of sensitive information in public repositories.

---

## Password Security Analysis

RepoAudit identifies insecure password practices such as:

- plain text password storage
- missing hashing functions
- weak password handling logic

The system encourages secure password practices like **bcrypt or salted hashing**.

---

## Repository Configuration Checks

The tool inspects configuration files to identify potential security problems.

Examples include:

- missing `.gitignore` rules
- sensitive files committed to version control
- unsafe environment configuration

---

## Automated Violation Reports

After scanning the repository, RepoAudit generates a structured report that includes:

- detected vulnerabilities
- affected file locations
- suggested remediation steps

This allows developers to quickly understand and fix security issues.

---

# How It Works

1. The system receives a GitHub repository URL.
2. The repository is cloned or accessed locally.
3. All project files are recursively scanned.
4. Security rules are applied to detect violations.
5. Detected issues are stored in the database.
6. A report is generated summarizing the results.

---

---

# Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-purple)

## Backend

- Node.js
- TypeScript
- Express

## Database

- PostgreSQL
- Prisma ORM

## Other Tools

- GitHub API
- File system analysis
- Rule-based static scanning

---

# Security Rule Categories

RepoAudit currently includes checks for:

- Hardcoded API keys
- Database credentials in source code
- Authentication tokens
- Weak password handling
- Sensitive configuration leaks
- Missing .gitignore rules
- Environment file exposure

The rule engine is designed to be easily extended with new security checks.

---

# Installation

### Clone the repository
git clone https://github.com/Dwij45/RepoAudit.git

cd repoaudit
npm install
npm run dev

---
# Example Scan Output

After scanning a repository, RepoAudit generates a structured security report.

Example:
Violation: Hardcoded API Key
File: src/config/api.ts
Line: 42
Recommendation: Move secret to environment variables

