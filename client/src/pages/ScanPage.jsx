import { useState } from "react";
import { TopLight, GlowOrb } from "../components/ui/CardEffects";
import Badge from "../components/ui/Badge";
import T from "../styles/tokens";

const STEPS = [
  { label: "Cloning Repo",          desc: "Fetching repository contents from GitHub…"             },
  { label: "Analyzing Files",       desc: "Reading source files and mapping file tree…"            },
  { label: "Executing Rule Engine", desc: "Running 14 security rules across all files…"            },
  { label: "Generating Report",     desc: "Compiling violations into structured report…"           },
];

const ScanPage = ({ setPage }) => {
  const [url,      setUrl]      = useState("");
  const [scanning, setScanning] = useState(false);
  const [step,     setStep]     = useState(0);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    if (!url) return;
    setScanning(true);
    setStep(0);
    setProgress(0);

    let s = 0;
    const iv = setInterval(() => {
      s++;
      setStep(Math.min(s, 3));
      setProgress(Math.min(s * 26, 100));
      if (s >= 4) {
        clearInterval(iv);
        // TODO: replace with real POST /scan/repo and navigate on response
        setTimeout(() => setPage("report"), 600);
      }
    }, 1100);
  };

  return (
    <div style={{ marginLeft: 220, padding: "96px 40px 60px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>

        {/* Header */}
        <div style={{ marginBottom: 36, animation: "fadeUp .5s ease both" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.5px" }}>New Scan</h1>
          <p style={{ color: "var(--t2)", fontSize: 14, marginTop: 6 }}>Point RepoAudit at any public GitHub repository.</p>
        </div>

        <div style={{ ...T.card, padding: 44, animation: "fadeUp .5s ease .1s both" }}>
          <TopLight />
          <GlowOrb color="var(--accent)" style={{ right: -60, top: -60 }} />

          {!scanning ? (
            /* ── Input form ── */
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--t3)", marginBottom: 10, letterSpacing: ".3px" }}>GIT REPOSITORY URL</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "13px 18px", color: "var(--t1)", fontSize: 14, fontFamily: "var(--mono)", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e  => e.target.style.borderColor = "var(--border2)"}
                />
                <button
                  onClick={startScan}
                  style={{ padding: "13px 24px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font)", whiteSpace: "nowrap" }}
                >
                  Run Scan →
                </button>
              </div>

              {/* Drag & drop — future feature */}
              <div
                style={{ border: "1px dashed var(--border2)", borderRadius: 12, padding: "32px 24px", textAlign: "center", background: "rgba(255,255,255,.015)", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(79,142,255,.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.background = "rgba(255,255,255,.015)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>⬆</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Drop a folder or zip file</div>
                <div style={{ fontSize: 13, color: "var(--t2)" }}>Local scanning — coming soon</div>
                <Badge type="accent" style={{ marginTop: 12 }}>FUTURE FEATURE</Badge>
              </div>
            </div>

          ) : (
            /* ── Progress indicator ── */
            <div style={{ animation: "fadeUp .4s ease both" }}>

              {/* Step circles */}
              <div style={{ display: "flex", marginBottom: 44, position: "relative" }}>
                <div style={{ position: "absolute", top: 18, left: "6%", right: "6%", height: 1, background: "var(--border)" }} />
                {STEPS.map((s, i) => (
                  <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
                    <div style={{
                      width:       36,
                      height:      36,
                      borderRadius: "50%",
                      display:     "flex",
                      alignItems:  "center",
                      justifyContent: "center",
                      fontSize:    12,
                      fontFamily:  "var(--mono)",
                      zIndex:      1,
                      transition:  "all .4s",
                      background:  i < step ? "rgba(0,212,170,.15)" : i === step ? "rgba(79,142,255,.15)" : "var(--bg3)",
                      border:      i < step ? "1px solid rgba(0,212,170,.5)" : i === step ? "1px solid rgba(79,142,255,.5)" : "1px solid var(--border)",
                      color:       i < step ? "var(--green)"  : i === step ? "var(--accent)" : "var(--t3)",
                      boxShadow:   i === step ? "0 0 0 4px rgba(79,142,255,.08)" : "none",
                    }}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <div style={{ fontSize: 11, fontFamily: "var(--mono)", textAlign: "center", lineHeight: 1.4, color: i < step ? "var(--green)" : i === step ? "var(--accent)" : "var(--t3)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden", marginBottom: 24 }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,var(--accent),var(--accent2))", borderRadius: 2, transition: "width .8s ease" }} />
              </div>

              {/* Status text */}
              <div style={{ textAlign: "center", fontSize: 13, fontFamily: "var(--mono)", color: "var(--t2)" }}>
                <span style={{ color: "var(--accent)" }}>{STEPS[Math.min(step, 3)].label}</span>
                {" — "}
                {STEPS[Math.min(step, 3)].desc}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;