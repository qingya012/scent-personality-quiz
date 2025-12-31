import { THEME } from "../data/theme";

function QuadrantMark({ winner, theme }) {
  // TL: floral, TR: fruity, BL: woody, BR: oriental
  const pos = {
    floral: [0, 0],
    fruity: [0, 1],
    woody: [1, 0],
    oriental: [1, 1],
  };
  const [r, c] = pos[winner] ?? [0, 0];

  return (
    <div
      style={{
        width: 74,
        height: 74,
        borderRadius: 18,
        background: theme.soft,
        border: "1px solid rgba(0,0,0,0.08)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 8,
        padding: 12,
      }}
      aria-label="Quadrant"
    >
      {[0, 0, 0, 0].map((_, i) => {
        const rr = Math.floor(i / 2);
        const cc = i % 2;
        const active = rr === r && cc === c;
        return (
          <div
            key={i}
            style={{
              borderRadius: 10,
              background: active ? theme.accent : "rgba(255,255,255,0.70)",
              border: active ? "none" : "1px solid rgba(0,0,0,0.10)",
              boxShadow: active ? "0 6px 16px rgba(0,0,0,0.12)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Result({ result, winner, onRestart }) {
  const theme = THEME[winner] ?? THEME.fruity;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: theme.resultBg,
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
          {/* header: badge + quadrant icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: theme.soft,
                  border: `1px solid ${theme.accent}`,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  color: "#111",
                }}
              >
                YOUR PERSONA · {theme.label.toUpperCase()}
              </div>

              <h1
                style={{
                  marginTop: 14,
                  fontSize: 36,
                  fontWeight: 650,
                  color: "#111",
                  lineHeight: 1.15,
                }}
              >
                {result?.name ?? "Your Scent Persona"}
              </h1>
            </div>

            <QuadrantMark winner={winner} theme={theme} />
          </div>

          <p style={{ marginTop: 12, fontSize: 16, color: "#333", lineHeight: 1.6 }}>
            {result?.summary ?? "A scent profile that matches your vibe."}
          </p>

          {/* notes */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: "#555", letterSpacing: "0.14em" }}>
              RECOMMENDED NOTES
            </div>
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(result?.suggestions ?? []).map((s, i) => (
                <span
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.10)",
                    color: "#111",
                    fontSize: 14,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onRestart}
            style={{
              marginTop: 28,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 14,
              background: theme.accent,
              color: "#111",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 650,
            }}
          >
            Retake Quiz
          </button>
      </div>
    </div>
  );
}