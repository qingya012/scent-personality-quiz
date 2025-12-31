import GradientBackground from "./GradientBackground";
import { THEME } from "../data/theme";

export default function Result({ result, winner, onRestart }) {
  const theme = THEME[winner] ?? THEME.fruity;

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw" }}>
      <GradientBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 720,
            padding: "40px 24px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.72)",
          }}
        >
          {/* badge */}
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 999,
              background: theme.soft,
              color: "#111",
              border: `1px solid ${theme.accent}`,
              fontSize: 12,
              letterSpacing: "0.12em",
            }}
          >
            YOUR PERSONA · {theme.label.toUpperCase()}
          </div>

          <h1 style={{ marginTop: 16, fontSize: 36, fontWeight: 650, color: "#111", lineHeight: 1.15 }}>
            {result?.name ?? "Your Scent Persona"}
          </h1>

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
                    border: `1px solid rgba(0,0,0,0.10)`,
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
              fontWeight: 600,
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
