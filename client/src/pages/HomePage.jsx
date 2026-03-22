import { useState } from "react";
import Badge from "../components/ui/Badge";
import { TopLight, GlowOrb } from "../components/ui/CardEffects";
import { HISTORY } from "../data/mockdata";
import T from "../styles/tokens";

// Bento card definitions — drives the grid layout on the homepage
const BENTO_CARDS = [
  {
    id:    "secrets",
    span:  5,
    label: "RULE ENGINE",
    title: "14 built-in\nsecurity rules",
    body:  "From hardcoded secrets to SQL injection vectors — every rule is configurable and severity-adjustable.",
    glow:  { color: "var(--accent)",  style: { right: -60, top: -60 } },
    content: "rules",
  },
  {
    id:    "scan",
    span:  7,
    label: "INSTANT ANALYSIS",
    title: "Paste URL.\nGet results.",
    body:  "Zero configuration. Point RepoAudit at any public GitHub repository and receive a full compliance report in seconds.",
    glow:  { color: "var(--accent2)", style: { left: -40, bottom: -40 } },
    content: "graph",
  },
  {
    id:    "history",
    span:  8,
    label: "AUDIT TRAIL",
    title: "Full scan history\nwith risk scoring",
    body:  "Every scan is stored with a 0–100 risk score. Track your codebase's security posture over time.",
    glow:  { color: "var(--purple)",  style: { right: -40, bottom: -60 } },
    content: "history",
  },
  {
    id:    "report",
    span:  4,
    label: "REPORTS",
    title: "Actionable\nfindings",
    body:  "Exact file paths, line numbers, and code snippets for every violation.",
    glow:  { color: "var(--red)",     style: { left: -40, top: -40 } },
    content: "score",
  },
];

// ── Bento card inner content variants ──────────────────────────────────────

const RulesContent = () => (
  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 7 }}>
    {["NO_HARDCODED_SECRETS", "ENV_FILE_COMMITTED", "INSECURE_HTTP", "SQL_INJECTION"].map((r, j) => (
      <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: j < 2 ? "var(--red)" : j === 2 ? "var(--amber)" : "var(--accent)" }} />
        {r}
      </div>
    ))}
  </div>
);

const GraphContent = () => (
  <div style={{ position: "relative", height: 100, marginTop: 20 }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
      <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="rgba(255,255,255,.06)" strokeWidth=".5" />
      <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="rgba(255,255,255,.06)" strokeWidth=".5" />
      <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="rgba(255,255,255,.06)" strokeWidth=".5" />
      <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="rgba(255,255,255,.06)" strokeWidth=".5" />
    </svg>
    {[
      { x: "48%", y: "38%", s: 44, label: "⬡", main: true },
      { x: "10%", y: "5%",  s: 32, label: "JS"  },
      { x: "78%", y: "5%",  s: 32, label: "PY"  },
      { x: "10%", y: "65%", s: 32, label: "ENV" },
      { x: "78%", y: "65%", s: 32, label: "SQL" },
    ].map((n, j) => (
      <div key={j} style={{
        position:    "absolute",
        top:         n.y,
        left:        n.x,
        transform:   "translate(-50%,-50%)",
        width:       n.s,
        height:      n.s,
        borderRadius: "50%",
        background:  n.main ? "rgba(79,142,255,.15)" : "rgba(0,212,170,.08)",
        border:      `1px solid ${n.main ? "rgba(79,142,255,.4)" : "rgba(0,212,170,.25)"}`,
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        fontSize:    n.main ? 18 : 10,
        fontFamily:  "var(--mono)",
        color:       n.main ? "var(--accent)" : "var(--accent2)",
      }}>{n.label}</div>
    ))}
  </div>
);

const HistoryContent = () => (
  <div style={{ marginTop: 20 }}>
    {HISTORY.slice(0, 3).map(h => (
      <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t2)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.repo}</span>
        <Badge type={h.status === "PASS" ? "pass" : "block"}>{h.status}</Badge>
        <Badge type={h.severity === "High" ? "high" : h.severity === "Medium" ? "med" : "low"}>{h.severity}</Badge>
      </div>
    ))}
  </div>
);

const ScoreContent = () => (
  <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2, color: "var(--green)", lineHeight: 1 }}>94</div>
    <div style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t3)" }}>RISK SCORE</div>
    <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: "94%", height: "100%", background: "linear-gradient(90deg,var(--accent),var(--accent2))", borderRadius: 2 }} />
    </div>
    <Badge type="pass">✓ PASS</Badge>
  </div>
);

const CONTENT_MAP = { rules: RulesContent, graph: GraphContent, history: HistoryContent, score: ScoreContent };

// ── Main page ───────────────────────────────────────────────────────────────

const HomePage = ({ setPage }) => {
  const [url,     setUrl]     = useState("");
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px 60px", animation: "fadeUp .6s ease both" }}>

        {/* Eyebrow */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(79,142,255,.07)", border: "1px solid rgba(79,142,255,.2)", borderRadius: 100, padding: "5px 14px", fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", marginBottom: 32, letterSpacing: ".5px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }} />
          AUTOMATED CODE AUDITING — v2.4.1
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(44px,6.5vw,88px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-3px", marginBottom: 24 }}>
          Secure your<br />
          codebase{" "}
          <span style={{ background: "linear-gradient(90deg,var(--accent),var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            instantly.
          </span>
        </h1>

        <p style={{ fontSize: 18, color: "var(--t2)", maxWidth: 560, lineHeight: 1.75, marginBottom: 48 }}>
          RepoAudit walks your entire file tree, runs every source file through a rule engine, and surfaces violations before they reach production.
        </p>

        {/* Scan bar */}
        <div style={{ display: "flex", gap: 10, maxWidth: 680, marginBottom: 80 }}>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://github.com/owner/repository"
            style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 12, padding: "14px 20px", color: "var(--t1)", fontSize: 14, fontFamily: "var(--mono)", outline: "none", transition: "border-color .2s" }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e  => e.target.style.borderColor = "var(--border2)"}
          />
          <button
            onClick={() => setPage("scan")}
            style={{ padding: "14px 28px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font)", transition: "all .2s" }}
            onMouseEnter={e => { e.target.style.background = "#3a7df0"; e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 28px rgba(79,142,255,.35)"; }}
            onMouseLeave={e => { e.target.style.background = "var(--accent)"; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
          >
            Scan repo →
          </button>
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 14 }}>
          {BENTO_CARDS.map((c, i) => {
            const ContentComponent = CONTENT_MAP[c.content];
            return (
              <div
                key={c.id}
                style={{ gridColumn: `span ${c.span}`, ...T.card, padding: 32, minHeight: c.span <= 4 ? 260 : 280, cursor: "pointer", transition: "border-color .3s,transform .3s", animation: `fadeUp .6s ease ${i * .1 + .2}s both`, borderColor: hovered === c.id ? "var(--border3)" : "var(--border)", transform: hovered === c.id ? "translateY(-3px)" : "" }}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <TopLight />
                <GlowOrb {...c.glow} />
                <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--accent2)", background: "rgba(0,212,170,.08)", border: "1px solid rgba(0,212,170,.18)", borderRadius: 6, padding: "3px 10px", display: "inline-block", marginBottom: 16, letterSpacing: ".5px" }}>{c.label}</div>
                <div style={{ fontSize: c.span >= 7 ? 26 : 22, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-.5px", marginBottom: 12, whiteSpace: "pre-line" }}>{c.title}</div>
                <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7 }}>{c.body}</p>
                <ContentComponent />
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div style={{ marginTop: 60, background: "linear-gradient(135deg,rgba(79,142,255,.07),rgba(0,212,170,.04))", border: "1px solid rgba(79,142,255,.18)", borderRadius: "var(--r)", padding: "44px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, animation: "fadeUp .7s ease .5s both" }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-.5px", marginBottom: 8 }}>Advanced features for teams.</div>
            <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.7 }}>Scan history, custom rule sets, webhook integrations, and team collaboration — all in one place.</p>
          </div>
          <button
            onClick={() => setPage("register")}
            style={{ padding: "13px 28px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Sign up free →
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;