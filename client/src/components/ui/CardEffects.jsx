// Simulates a top-down light source on card edges
export const TopLight = () => (
  <div style={{
    position:      "absolute",
    top:           0,
    left:          0,
    right:         0,
    height:        1,
    background:    "linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)",
    pointerEvents: "none",
  }} />
);

// Radial glow blob — placed absolutely inside a card (position:relative + overflow:hidden)
// Usage: <GlowOrb color="var(--accent)" style={{ right: -60, top: -60 }} />
export const GlowOrb = ({ color, style }) => (
  <div style={{
    position:      "absolute",
    width:         220,
    height:        220,
    borderRadius:  "50%",
    background:    `radial-gradient(circle, ${color}, transparent 70%)`,
    opacity:       0.1,
    pointerEvents: "none",
    ...style,
  }} />
);