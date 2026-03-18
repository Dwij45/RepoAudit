import type { Request, Response } from "express";
import prisma from "../db.js";
import { RULES } from "../scanner/rules.js";

// GET /rules  (or /rules/me)
// Returns all default rules, with the user's config applied
export const getRules = async (req: any, res: Response) => {
    try {
        const userId = req.userId;

        const userConfigs = await prisma.userRuleConfig.findMany({
            where: { userId }
        });

        // Map global rules so frontend sees current tailored state
        const tailoredRules = RULES.map(rule => {
            const config = userConfigs.find((c: any) => c.ruleId === rule.id);
            return {
                ...rule,
                enabled: config ? config.enabled : true,
                severity: config?.severity ? config.severity : rule.severity
            };
        });

        res.json(tailoredRules);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch rules" });
    }
};

// PUT /rules/:ruleId
// Updates (upserts) a specific rule for the logged-in user
export const updateRuleConfig = async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        const { ruleId } = req.params;
        const { enabled, severity } = req.body;

        // Verify the rule actually exists globally
        const ruleExists = RULES.some(r => r.id === ruleId);
        if (!ruleExists) {
            return res.status(404).json({ message: "Rule not found" });
        }

        const config = await prisma.userRuleConfig.upsert({
            where: {
                userId_ruleId: {
                    userId,
                    ruleId
                }
            },
            update: {
                enabled: enabled !== undefined ? enabled : undefined,
                severity: severity !== undefined ? severity : undefined
            },
            create: {
                userId,
                ruleId,
                enabled: enabled !== undefined ? enabled : true,
                severity: severity !== undefined ? severity : null
            }
        });

        res.json(config);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update rule config" });
    }
};

// DELETE /rules/:ruleId
// Resets a rule back to global default (deletes the config row)
export const resetRuleConfig = async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        const { ruleId } = req.params;

        await prisma.userRuleConfig.delete({
            where: {
                userId_ruleId: {
                    userId,
                    ruleId
                }
            }
        });

        res.json({ message: "Rule reset to default" });
    } catch (error) {
        // usually means the config didn't exist, which is fine
        res.json({ message: "Rule is already at default" });
    }
};
