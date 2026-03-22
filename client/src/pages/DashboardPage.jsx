import Badge from "../components/ui/Badge";
import { TopLight } from "../components/ui/CardEffects";
import { HISTORY } from "../data/mockdata";
import T from "../styles/tokens";

const METRICS = [
  { label: "REPOS SCANNED", value: "247", change: "+12 this week",       up: true,  color: "var(--t1)"    },
  { label: "HIGH SEVERITY",  value: "38",  change: "+4 this week",        up: false, color: "var(--red)"   },
  { label: "AVG RISK SCORE", value: "71",  change: "+3 from last week",   up: true,  color: "var(--accent)"},
  { label: "RULES ACTIVE",   value: "14",  change: "of 16 configured",    up: null,  color: "var(--green)" },
];

const DashboardPage = ({ setPage, setReportId }) => (
  <div style={{ marginLeft: 220, padding: "96px 40px 60px" }}>

    {/* Page header */}
    <div style={{ marginBottom: 36, animation: "fadeUp .5s ease both" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.5px" }}>Dashboard</h1>
      <p style={{ color: "var(--t2)", fontSize: 14, marginTop: 6 }}>Security posture overview across all repositories.</p>
    </div>

    {/* Metric cards */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 36 }}>
      {METRICS.map((m, i) => (
        <div
          key={m.label}
          style={{ ...T.cardSm, padding: 24, animation: `fadeUp .5s ease ${i * .07}s both`, transition: "border-color .2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border3)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <TopLight />
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)", marginBottom: 12, letterSpacing: ".3px" }}>{m.label}</div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.5px", color: m.color }}>{m.value}</div>
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", marginTop: 6, color: m.up === null ? "var(--t3)" : m.up ? "var(--green)" : "var(--red)" }}>
            {m.up !== null && (m.up ? "↑ " : "↓ ")}{m.change}
          </div>
        </div>
      ))}
    </div>

    {/* Scan history table */}
    <div style={{ ...T.cardSm, animation: "fadeUp .6s ease .25s both" }}>
      <TopLight />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Recent Scans</div>
        <button onClick={() => setPage("scan")} style={{ padding: "7px 16px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)" }}>
          + New Scan
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Repository", "Date Scanned", "Status", "Severity", "Violations", "Score"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "11px 24px", fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", letterSpacing: ".5px", textTransform: "uppercase", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((row, i) => (
            <tr
              key={row.id}
              onClick={() => { setReportId(row.id); setPage("report"); }}
              style={{ cursor: "pointer", transition: "background .15s" }}
              onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "rgba(255,255,255,.018)")}
              onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background = "")}
            >
              {/* repository */}
              <td style={{ padding: "14px 24px", fontSize: 13, fontFamily: "var(--mono)", color: "var(--t2)", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>{row.repo}</td>
              {/* date */}
              <td style={{ padding: "14px 24px", fontSize: 12, fontFamily: "var(--mono)", color: "var(--t3)", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>{row.date}</td>
              {/* status */}
              <td style={{ padding: "14px 24px", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>
                <Badge type={row.status === "PASS" ? "pass" : "block"}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                  {row.status}
                </Badge>
              </td>
              {/* severity */}
              <td style={{ padding: "14px 24px", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>
                <Badge type={row.severity === "High" ? "high" : row.severity === "Medium" ? "med" : "low"}>{row.severity}</Badge>
              </td>
              {/* violations count */}
              <td style={{ padding: "14px 24px", fontSize: 14, fontWeight: 700, color: row.violations > 10 ? "var(--red)" : row.violations > 4 ? "var(--amber)" : "var(--green)", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>{row.violations}</td>
              {/* score bar */}
              <td style={{ padding: "14px 24px", borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(26,32,53,.6)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden", minWidth: 60 }}>
                    <div style={{ width: `${row.score}%`, height: "100%", background: row.score > 75 ? "var(--green)" : row.score > 50 ? "var(--amber)" : "var(--red)", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--t2)", minWidth: 28 }}>{row.score}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

export default DashboardPage;