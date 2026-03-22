import { useState } from "react";
import { TopLight, GlowOrb } from "../components/ui/CardEffects";
import T from "../styles/tokens";

// Shared by both /login and /register — toggled via the `mode` prop

const AuthPage = ({ mode, setPage, setAuthed }) => {
  const isLogin = mode === "login";

  const [form,    setForm]    = useState({ email: "", password: "", name: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // TODO: replace setTimeout with real POST /auth/login or /auth/register
    setTimeout(() => {
      setLoading(false);
      setAuthed(true);
      setPage("dashboard");
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px", background: "var(--bg)" }}>

      {/* Dot-grid background texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(79,142,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ ...T.card, padding: "48px 44px", width: "100%", maxWidth: 440, animation: "fadeUp .5s ease both" }}>
        <TopLight />
        <GlowOrb color="var(--accent)" style={{ right: -80, top: -80, width: 260, height: 260 }} />

        <div style={{ position: "relative" }}>
          {/* Eyebrow tag */}
          <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent2)", background: "rgba(0,212,170,.08)", border: "1px solid rgba(0,212,170,.2)", borderRadius: 6, padding: "3px 10px", display: "inline-block", marginBottom: 20, letterSpacing: ".5px" }}>
            {isLogin ? "WELCOME BACK" : "GET STARTED"}
          </div>

          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.5px", marginBottom: 6 }}>
            {isLogin ? "Sign in to RepoAudit" : "Create your account"}
          </div>
          <p style={{ color: "var(--t2)", fontSize: 14, marginBottom: 36 }}>
            {isLogin ? "Scan history and custom rules await." : "Free forever. No credit card required."}
          </p>

          {/* Name field — register only */}
          {!isLogin && (
            <Field label="FULL NAME" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Ada Lovelace" />
          )}

          <Field label="EMAIL"    type="email"    value={form.email}    onChange={v => setForm({ ...form, email: v })}    placeholder="ada@lovelace.dev" />
          <Field label="PASSWORD" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="••••••••••" />

          {/* Confirm password — register only */}
          {!isLogin && (
            <Field label="CONFIRM PASSWORD" type="password" value={form.confirm} onChange={v => setForm({ ...form, confirm: v })} placeholder="••••••••••" last />
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", padding: 13, background: loading ? "rgba(79,142,255,.5)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, transition: "all .2s" }}
          >
            {loading
              ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Authenticating…</>
              : isLogin ? "Sign in →" : "Create account →"
            }
          </button>

          <div style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "var(--t2)" }}>
            {isLogin ? "No account? " : "Already have one? "}
            <span onClick={() => setPage(isLogin ? "register" : "login")} style={{ color: "var(--accent)", cursor: "pointer" }}>
              {isLogin ? "Sign up free" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small reusable field within this file only
const Field = ({ label, type = "text", value, onChange, placeholder, last }) => (
  <div style={{ marginBottom: last ? 28 : 18 }}>
    <label style={{ display: "block", fontSize: 12, fontFamily: "var(--mono)", color: "var(--t3)", marginBottom: 8 }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "12px 16px", color: "var(--t1)", fontSize: 14, fontFamily: "var(--mono)", outline: "none" }}
      onFocus={e => e.target.style.borderColor = "var(--accent)"}
      onBlur={e  => e.target.style.borderColor = "var(--border2)"}
    />
  </div>
);

export default AuthPage;