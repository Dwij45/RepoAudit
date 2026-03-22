// Reusable inline-style objects shared across all components
const T = {
  card: {
    background:   "var(--card)",
    border:       "1px solid var(--border)",
    borderRadius: "var(--r)",
    position:     "relative",
    overflow:     "hidden",
  },
  cardSm: {
    background:   "var(--card)",
    border:       "1px solid var(--border)",
    borderRadius: "var(--rs)",
    position:     "relative",
    overflow:     "hidden",
  },
  mono:   { fontFamily: "var(--mono)" },
  t2:     { color: "var(--t2)" },
  t3:     { color: "var(--t3)" },
  accent: { color: "var(--accent)" },
  green:  { color: "var(--green)" },
  red:    { color: "var(--red)" },
  amber:  { color: "var(--amber)" },
};

export default T;