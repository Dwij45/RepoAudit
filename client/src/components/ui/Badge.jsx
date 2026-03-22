// Severity / status badge used throughout the app
// type: "high" | "med" | "low" | "pass" | "block" | "accent"

const BADGE_STYLES = {
  high:   { background: "rgba(255,69,96,.12)",  color: "var(--red)",    border: "1px solid rgba(255,69,96,.25)"  },
  med:    { background: "rgba(245,166,35,.1)",  color: "var(--amber)",  border: "1px solid rgba(245,166,35,.25)" },
  low:    { background: "rgba(0,212,170,.08)",  color: "var(--green)",  border: "1px solid rgba(0,212,170,.2)"   },
  pass:   { background: "rgba(0,212,170,.08)",  color: "var(--green)",  border: "1px solid rgba(0,212,170,.25)"  },
  block:  { background: "rgba(255,69,96,.1)",   color: "var(--red)",    border: "1px solid rgba(255,69,96,.25)"  },
  accent: { background: "rgba(79,142,255,.1)",  color: "var(--accent)", border: "1px solid rgba(79,142,255,.25)" },
};

const Badge = ({ type, children, style }) => (
  <span style={{
    display:       "inline-flex",
    alignItems:    "center",
    gap:           5,
    fontSize:      11,
    fontFamily:    "var(--mono)",
    padding:       "3px 9px",
    borderRadius:  6,
    letterSpacing: ".3px",
    ...BADGE_STYLES[type],
    ...style,
  }}>
    {children}
  </span>
);

export default Badge;