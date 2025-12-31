export default function LogoMark({ size = 96 }) {
  const s = size;
  const r = Math.round(s * 0.22);

  // 你四种 persona 颜色（跟你 theme 统一）
  const floral = "#E9A3B1";
  const fruity = "#F4D37A";
  const woody = "#7FB28A";
  const oriental = "#D9824A";

  // 小格子布局参数（按比例缩放）
  const pad = s * 0.18;
  const gap = s * 0.07;
  const cell = (s - pad * 2 - gap) / 2;
  const cellR = cell * 0.28;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SPQ logo"
    >
      {/* 瓶盖 */}
      <rect
        x={s * 0.40}
        y={s * 0.08}
        width={s * 0.20}
        height={s * 0.12}
        rx={s * 0.04}
        fill="rgba(255,255,255,0.75)"
        stroke="rgba(0,0,0,0.10)"
      />

      {/* 瓶颈 */}
      <rect
        x={s * 0.33}
        y={s * 0.18}
        width={s * 0.34}
        height={s * 0.12}
        rx={s * 0.06}
        fill="rgba(255,255,255,0.70)"
        stroke="rgba(0,0,0,0.10)"
      />

      {/* 瓶身 */}
      <rect
        x={s * 0.14}
        y={s * 0.26}
        width={s * 0.72}
        height={s * 0.66}
        rx={r}
        fill="rgba(255,255,255,0.55)"
        stroke="rgba(0,0,0,0.10)"
      />

      {/* 四宫格（在瓶身里） */}
      <g>
        {/* TL Floral */}
        <rect
          x={pad}
          y={s * 0.26 + pad * 0.85}
          width={cell}
          height={cell}
          rx={cellR}
          fill={floral}
          opacity="0.80"
        />
        {/* TR Fruity */}
        <rect
          x={pad + cell + gap}
          y={s * 0.26 + pad * 0.85}
          width={cell}
          height={cell}
          rx={cellR}
          fill={fruity}
          opacity="0.80"
        />
        {/* BL Woody */}
        <rect
          x={pad}
          y={s * 0.26 + pad * 0.85 + cell + gap}
          width={cell}
          height={cell}
          rx={cellR}
          fill={woody}
          opacity="0.80"
        />
        {/* BR Oriental */}
        <rect
          x={pad + cell + gap}
          y={s * 0.26 + pad * 0.85 + cell + gap}
          width={cell}
          height={cell}
          rx={cellR}
          fill={oriental}
          opacity="0.80"
        />
      </g>

      {/* 高光（让它更像玻璃） */}
      <path
        d={`
          M ${s * 0.24} ${s * 0.34}
          C ${s * 0.20} ${s * 0.50}, ${s * 0.22} ${s * 0.68}, ${s * 0.30} ${s * 0.80}
        `}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth={s * 0.06}
        strokeLinecap="round"
      />
    </svg>
  );
}
