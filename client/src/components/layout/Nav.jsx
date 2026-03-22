// Top navigation bar — fixed, glass-morphic
// Shows auth links when logged out, dashboard links when logged in

const Nav = ({ page, setPage, authed, setAuthed }) => (
  <nav style={{
    position:       "fixed",
    top:            0,
    left:           0,
    right:          0,
    zIndex:         200,
    padding:        "0 40px",
    height:         64,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    borderBottom:   "1px solid rgba(26,32,53,.8)",
    backdropFilter: "blur(24px)",
    background:     "rgba(7,9,13,.85)",
  }}>
    {/* Logo */}
    <div
      onClick={() => setPage("home")}
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 700, fontSize: 17, letterSpacing: "-.5px" }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--accent),var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
        ⬡
      </div>
      RepoAudit
    </div>

    {/* Links */}
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {authed ? (
        <>
          {["dashboard", "scan", "settings"].map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                padding:         "7px 16px",
                borderRadius:    8,
                cursor:          "pointer",
                fontSize:        13,
                fontFamily:      "var(--font)",
                border:          page === p ? "1px solid rgba(79,142,255,.3)" : "1px solid transparent",
                background:      page === p ? "rgba(79,142,255,.1)"           : "transparent",
                color:           page === p ? "var(--accent)"                 : "var(--t2)",
                transition:      "all .2s",
                textTransform:   "capitalize",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => { setAuthed(false); setPage("home"); }}
            style={{ padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "var(--font)", border: "1px solid var(--border)", background: "transparent", color: "var(--t2)", marginLeft: 4 }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setPage("login")}    style={{ padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "var(--font)", border: "1px solid transparent", background: "transparent", color: "var(--t2)" }}>Log in</button>
          <button onClick={() => setPage("register")} style={{ padding: "8px 18px",  borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "var(--font)", border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600 }}>Sign up free</button>
        </>
      )}
    </div>
  </nav>
);

export default Nav;