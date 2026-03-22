// Left sidebar — only visible on protected/dashboard routes

const NAV_ITEMS = [
  { id: "dashboard", icon: "◈", label: "Dashboard"   },
  { id: "scan",      icon: "⊕", label: "New Scan"    },
  { id: "report",    icon: "◑", label: "Last Report" },
  { id: "settings",  icon: "◎", label: "Rule Config" },
];

const Sidebar = ({ page, setPage }) => (
  <aside style={{
    position:    "fixed",
    left:        0,
    top:         0,
    bottom:      0,
    width:       220,
    background:  "var(--card)",
    borderRight: "1px solid var(--border)",
    paddingTop:  80,
    display:     "flex",
    flexDirection: "column",
    zIndex:      100,
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)" }} />

    <div style={{ padding: "24px 12px 8px", fontSize: 10, fontFamily: "var(--mono)", color: "var(--t3)", letterSpacing: "1.2px", textTransform: "uppercase" }}>
      Navigation
    </div>

    {NAV_ITEMS.map(item => (
      <div
        key={item.id}
        onClick={() => setPage(item.id)}
        style={{
          display:      "flex",
          alignItems:   "center",
          gap:          10,
          padding:      "9px 16px",
          margin:       "2px 8px",
          borderRadius: 9,
          cursor:       "pointer",
          fontSize:     14,
          fontWeight:   500,
          background:   page === item.id ? "rgba(79,142,255,.1)"          : "transparent",
          color:        page === item.id ? "var(--accent)"                 : "var(--t2)",
          border:       page === item.id ? "1px solid rgba(79,142,255,.18)" : "1px solid transparent",
          transition:   "all .2s",
        }}
        onMouseEnter={e => { if (page !== item.id) { e.currentTarget.style.background = "rgba(255,255,255,.03)"; e.currentTarget.style.color = "var(--t1)"; } }}
        onMouseLeave={e => { if (page !== item.id) { e.currentTarget.style.background = "transparent";            e.currentTarget.style.color = "var(--t2)"; } }}
      >
        <span style={{ fontSize: 17, opacity: .8 }}>{item.icon}</span>
        {item.label}
      </div>
    ))}

    {/* User pill at bottom */}
    <div style={{ marginTop: "auto", padding: 12 }}>
      <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: 12, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--accent),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Ada L.</div>
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--t3)" }}>ada@dev.io</div>
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;