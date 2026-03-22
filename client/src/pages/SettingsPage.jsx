import { useState } from "react";
import { TopLight } from "../components/ui/CardEffects";
import { RULES } from "../data/mockdata";
import T from "../styles/tokens";

const SettingsPage = () => {
  const [rules, setRules] = useState(RULES);
  const [saved, setSaved] = useState(false);

  const categories = [...new Set(rules.map(r => r.cat))];

  const toggleRule = (id)       => setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled }         : r));
  const setSeverity = (id, sev) => setRules(rules.map(r => r.id === id ? { ...r, defaultSev: sev }             : r));

  const saveChanges = () => {
    // TODO: POST /api/rules with updated rules array
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ marginLeft: 220, padding: "96px 40px 60px", maxWidth: 960 }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, animation: "fadeUp .5s ease both" }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.5px" }}>Rule Configuration</h1>
          <p style={{ color: "var(--t2)", fontSize: 14, marginTop: 6 }}>Enable, disable, and tune severity for each security rule.</p>
        </div>
        <button
          onClick={saveChanges}
          style={{ padding: "10px 22px", background: saved ? "rgba(0,212,170,.15)" : "var(--accent)", color: saved ? "var(--green)" : "#fff", border: saved ? "1px solid rgba(0,212,170,.3)" : "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)", transition: "all .3s" }}
        >
          {saved ? "✓ Saved" : "Save changes"}
        </button>
      </div>

      {/* Rules grouped by category */}
      {categories.map((cat, ci) => (
        <div key={cat} style={{ marginBottom: 32, animation: `fadeUp .5s ease ${ci * .08}s both` }}>

          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>
            {cat}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rules.filter(r => r.cat === cat).map(rule => (
              <div
                key={rule.id}
                style={{ ...T.cardSm, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18, transition: "border-color .2s, opacity .2s", opacity: rule.enabled ? 1 : 0.55 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <TopLight />

                {/* Icon */}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: rule.enabled ? "rgba(79,142,255,.1)" : "var(--bg3)", border: `1px solid ${rule.enabled ? "rgba(79,142,255,.2)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, transition: "all .2s" }}>
                  {rule.icon}
                </div>

                {/* Name + description */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{rule.name}</div>
                  <div style={{ fontSize: 12, color: "var(--t2)" }}>{rule.desc}</div>
                </div>

                {/* Severity dropdown */}
                <select
                  value={rule.defaultSev}
                  onChange={e => setSeverity(rule.id, e.target.value)}
                  style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 8, padding: "6px 10px", color: "var(--t1)", fontSize: 12, fontFamily: "var(--mono)", outline: "none", cursor: "pointer", marginRight: 4 }}
                >
                  {["Low", "Medium", "High"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Toggle switch */}
                <div
                  onClick={() => toggleRule(rule.id)}
                  style={{ width: 44, height: 24, borderRadius: 12, background: rule.enabled ? "var(--accent)" : "var(--border)", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background .25s" }}
                >
                  <div style={{ position: "absolute", top: 3, left: rule.enabled ? "calc(100% - 21px)" : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;