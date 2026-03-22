import { useState } from "react";
import Badge from "../components/ui/Badge";
import { TopLight, GlowOrb } from "../components/ui/CardEffects";
import { VIOLATIONS } from "../data/mockdata";
import T from "../styles/tokens";

const ReportPage = () => {
  const [expanded, setExpanded] = useState(null);

  const highCount = VIOLATIONS.filter(v => v.severity === "High").length;
  const medCount  = VIOLATIONS.filter(v => v.severity === "Medium").length;
  const lowCount  = VIOLATIONS.filter(v => v.severity === "Low").length;
  const total     = VIOLATIONS.length;

  return (
    <div style={{ marginLeft: 220, padding: "96px 40px 60px" }}>

      {/* ── Summary header card ── */}
      <div style={{ ...T.card, padding: "36px 40px", marginBottom: 20, display: "flex", alignItems: "center", gap: 40, animation: "fadeUp .5s ease both" }}>
        <TopLight />
        <GlowOrb color="var(--red)" style={{ right: -60, top: -60 }} />

        {/* BLOCK badge */}
        <div style={{ width: 86, height: 86, borderRadius: 18, background: "rgba(255,69,96,.1)", border: "1px solid rgba(255,69,96,.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, flexShrink: 0 }}>
          <span style={{ fontSize: 22, color: "var(--red)" }}>⛔</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", fontFamily: "var(--mono)", letterSpacing: ".5px" }}>BLOCK</span>
        </div>

        {/* Repo meta */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>github.com/acme/backend-api</h2>
          <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t3)", marginBottom: 16 }}>
            Scanned Jan 18, 2025 · 247 files analyzed · 3.2s
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "RISK SCORE", val: "23",       col: "var(--red)"   },
              { label: "HIGH",       val: highCount,   col: "var(--red)"   },
              { label: "MEDIUM",     val: medCount,    col: "var(--amber)" },
              { label: "LOW",        val: lowCount,    col: "var(--green)" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -1, color: s.col }}>{s.val}</div>
                <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Severity bar */}
        <div style={{ width: 140, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", marginBottom: 8, letterSpacing: ".3px" }}>SEVERITY BREAKDOWN</div>
          <div style={{ height: 6, borderRadius: 3, overflow: "hidden", display: "flex", marginBottom: 10 }}>
            <div style={{ width: `${(highCount / total) * 100}%`, background: "var(--red)"   }} />
            <div style={{ width: `${(medCount  / total) * 100}%`, background: "var(--amber)" }} />
            <div style={{ width: `${(lowCount  / total) * 100}%`, background: "var(--green)" }} />
          </div>
          {[
            { label: "High",   count: highCount, col: "var(--red)"   },
            { label: "Medium", count: medCount,  col: "var(--amber)" },
            { label: "Low",    count: lowCount,  col: "var(--green)" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, fontSize: 12, fontFamily: "var(--mono)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.col, flexShrink: 0 }} />
              <span style={{ color: "var(--t2)", flex: 1 }}>{s.label}</span>
              <span style={{ color: s.col, fontWeight: 600 }}>{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Findings table ── */}
      <div style={{ ...T.cardSm, animation: "fadeUp .6s ease .15s both" }}>
        <TopLight />

        {/* Table header row */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Detailed Findings</div>
          <Badge type="high">{total} violations</Badge>
        </div>

        {/* Column labels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 180px 80px", padding: "10px 24px", borderBottom: "1px solid var(--border)" }}>
          {["File / Description", "Line", "Rule", "Severity"].map(h => (
            <div key={h} style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", letterSpacing: ".5px", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>

        {/* Violation rows — click to expand code snippet */}
        {VIOLATIONS.map((v, i) => (
          <div key={v.id}>
            <div
              onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              style={{ display: "grid", gridTemplateColumns: "1fr 70px 180px 80px", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: i < VIOLATIONS.length - 1 || expanded === v.id ? "1px solid rgba(26,32,53,.6)" : "none", cursor: "pointer", transition: "background .15s", background: expanded === v.id ? "rgba(255,255,255,.018)" : "" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.015)"}
              onMouseLeave={e => { if (expanded !== v.id) e.currentTarget.style.background = ""; }}
            >
              <div>
                <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--t1)" }}>{v.file}</div>
                <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)", marginTop: 2 }}>{v.desc}</div>
              </div>
              <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t3)" }}>:{v.line}</div>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent2)" }}>{v.rule}</div>
              <Badge type={v.severity === "High" ? "high" : v.severity === "Medium" ? "med" : "low"}>{v.severity}</Badge>
            </div>

            {/* Expandable code snippet */}
            {expanded === v.id && (
              <div style={{ padding: "0 24px 20px", borderBottom: i < VIOLATIONS.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none", animation: "fadeUp .25s ease both" }}>
                <div style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 8, padding: "12px 16px", fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber)", overflowX: "auto" }}>
                  <span style={{ color: "var(--t3)", userSelect: "none" }}>{v.line} │ </span>
                  {v.snippet}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;