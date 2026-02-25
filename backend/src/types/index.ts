export interface ComplianceRule {
    id: string;
    name: string;
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    category: 'SECURITY' | 'CONFIG' | 'PRIVACY';
    type: 'regex' | 'file_existence' | 'gitignore_check';
    pattern?: string;    // Optional, only for regex rules
    targetFile?: string; // Optional, only for file_existence rules
    requiredEntry?: string; // Only for gitignore_check rules (e.g. ".env", "node_modules")
}

export interface Violation {
    ruleId: string;
    ruleName: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    file: string;
    message: string;
    line?: number;
}

export interface ScanSummary {
    status: 'PASS' | 'BLOCK';
    riskScore: number;
    totalViolations: number;
    violations: Violation[];
    timestamp: Date;
}