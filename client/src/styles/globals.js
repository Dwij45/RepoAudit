const GlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

  *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:     #07090d;
    --bg2:    #0b0e15;
    --bg3:    #10131c;
    --card:   #0e1118;
    --card2:  #12161f;

    --border:  #1a2035;
    --border2: #222840;
    --border3: #2a3356;

    --t1: #eef0f8;
    --t2: #7a86a8;
    --t3: #3d4666;

    --accent:  #4f8eff;
    --accent2: #00d4aa;
    --red:     #ff4560;
    --amber:   #f5a623;
    --green:   #00d4aa;
    --purple:  #9b5de5;

    --r:  24px;
    --rs: 12px;

    --font: 'Syne', sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--t1);
    font-family: var(--font);
    min-height: 100vh;
    overflow-x: hidden;
  }

  input, select, button { font-family: var(--font); }

  ::-webkit-scrollbar       { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border3); border-radius: 4px; }

  @keyframes fadeUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse    { 0%,100% { box-shadow: 0 0 0 0 rgba(79,142,255,.5); } 50% { box-shadow: 0 0 0 8px rgba(79,142,255,0); } }
  @keyframes spin     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes glow     { 0%,100% { opacity: .4; } 50% { opacity: .9; } }
  @keyframes slideIn  { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes shimmer  { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
`;

export default GlobalStyles;