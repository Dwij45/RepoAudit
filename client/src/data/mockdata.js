export const HISTORY = [
  { id: 1, repo: "github.com/acme/backend-api",      date: "2025-01-18", status: "BLOCK", severity: "High",   violations: 14, score: 23 },
  { id: 2, repo: "github.com/acme/frontend-app",     date: "2025-01-17", status: "PASS",  severity: "Low",    violations: 2,  score: 88 },
  { id: 3, repo: "github.com/devteam/auth-service",  date: "2025-01-16", status: "BLOCK", severity: "Medium", violations: 7,  score: 51 },
  { id: 4, repo: "github.com/devteam/data-pipeline", date: "2025-01-15", status: "PASS",  severity: "Low",    violations: 1,  score: 94 },
  { id: 5, repo: "github.com/personal/side-project", date: "2025-01-14", status: "BLOCK", severity: "High",   violations: 22, score: 11 },
];

export const VIOLATIONS = [
  { id: 1, file: "src/config/database.js",    line: 42,  rule: "NO_HARDCODED_SECRETS", severity: "High",   desc: "AWS Secret Access Key detected in source code",       snippet: 'const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"' },
  { id: 2, file: ".env",                      line: 1,   rule: "ENV_FILE_COMMITTED",   severity: "High",   desc: "Environment file committed to repository",             snippet: "DB_PASSWORD=super_secret_prod_password_123" },
  { id: 3, file: "src/api/auth.js",           line: 88,  rule: "INSECURE_HTTP",        severity: "Medium", desc: "HTTP endpoint used instead of HTTPS",                 snippet: 'fetch("http://api.internal/validate-token")' },
  { id: 4, file: "src/utils/logger.js",       line: 15,  rule: "CONSOLE_LOG_PROD",     severity: "Low",    desc: "console.log statement found in production code",       snippet: 'console.log("User token:", userToken)' },
  { id: 5, file: "src/components/Upload.jsx", line: 203, rule: "EVAL_USAGE",           severity: "High",   desc: "eval() usage detected — potential code injection vector", snippet: "eval(userProvidedInput)" },
  { id: 6, file: "src/db/queries.js",         line: 67,  rule: "SQL_INJECTION_RISK",   severity: "High",   desc: "String interpolation in SQL query detected",           snippet: "db.query(`SELECT * FROM users WHERE id=${userId}`)" },
];

export const RULES = [
  { id: 1, name: "No Hardcoded Secrets",     desc: "Detects API keys, tokens, passwords in source files",       icon: "🔑", defaultSev: "High",   enabled: true,  cat: "Secrets"      },
  { id: 2, name: "No .env Files Committed",  desc: "Flags .env and secret config files tracked by git",         icon: "📄", defaultSev: "High",   enabled: true,  cat: "Secrets"      },
  { id: 3, name: "Enforce HTTPS",            desc: "Flags HTTP endpoints — require TLS everywhere",             icon: "🔒", defaultSev: "Medium", enabled: true,  cat: "Network"      },
  { id: 4, name: "No eval() Usage",          desc: "Detects eval() and Function() constructor calls",           icon: "⚠️", defaultSev: "High",   enabled: true,  cat: "Injection"    },
  { id: 5, name: "SQL Injection Guard",      desc: "Flags string-interpolated SQL queries",                     icon: "🗄️", defaultSev: "High",   enabled: true,  cat: "Injection"    },
  { id: 6, name: "No console.log in Prod",   desc: "Detects console statements that leak runtime data",         icon: "📋", defaultSev: "Low",    enabled: false, cat: "Compliance"   },
  { id: 7, name: "Dependency Audit",         desc: "Checks package.json for known vulnerable packages",         icon: "📦", defaultSev: "Medium", enabled: true,  cat: "Dependencies" },
  { id: 8, name: "License Compliance",       desc: "Validates open-source licenses against policy",             icon: "⚖️", defaultSev: "Low",    enabled: false, cat: "Compliance"   },
];