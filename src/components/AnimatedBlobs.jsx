export default function AnimatedBlobs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <div style={blobStyle("tl")} />
      <div style={blobStyle("tr")} />
      <div style={blobStyle("bl")} />
      <div style={blobStyle("br")} />
    </div>
  );
}

function blobStyle(pos) {
  const common = {
    position: "absolute",
    width: 520,
    height: 520,
    filter: "blur(42px)",
    opacity: 0.55,
    borderRadius: "999px",
    mixBlendMode: "multiply",
    animation: "blobMove 12s ease-in-out infinite",
  };

  const map = {
    tl: { top: -200, left: -180, background: "rgba(233,163,177,1)", animationDelay: "0s" },   // floral pink
    tr: { top: -210, right: -180, background: "rgba(244,211,122,1)", animationDelay: "1.5s" }, // fruity yellow
    bl: { bottom: -220, left: -190, background: "rgba(127,178,138,1)", animationDelay: "3s" }, // woody green
    br: { bottom: -240, right: -190, background: "rgba(217,130,74,1)", animationDelay: "4.5s" }, // oriental amber
  };

  return { ...common, ...map[pos] };
}
