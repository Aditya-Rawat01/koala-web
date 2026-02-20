"use client";

export function LatencyLineChart({ isDark }: { isDark: boolean }) {
  const data = [
    42, 38, 45, 40, 38, 52, 44, 38, 41, 70, 38, 42,
    46, 38, 55, 42, 38, 44, 62, 38, 42, 48, 38,
  ];
  const W = 320;
  const H = 72;
  const P = 5;
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  const range = mx - mn || 1;
  const pts = data.map(
    (v, i): [number, number] => [
      P + (i / (data.length - 1)) * (W - P * 2),
      H - P - ((v - mn) / range) * (H - P * 2),
    ]
  );
  const poly = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${pts[0][0]},${H} ` + poly + ` ${pts[pts.length - 1][0]},${H}`;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="block h-[72px]"
    >
      <defs>
        <linearGradient id="latency-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity={isDark ? 0.2 : 0.14} />
          <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.33, 0.66].map((t, i) => (
        <line
          key={i}
          x1={P}
          y1={P + t * (H - P * 2)}
          x2={W - P}
          y2={P + t * (H - P * 2)}
          stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}
          strokeWidth="1"
        />
      ))}
      <polygon points={area} fill="url(#latency-gradient)" />
      <polyline
        points={poly}
        fill="none"
        stroke="#4ade80"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.8" fill="#4ade80" />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="5"
        fill="#4ade80"
        fillOpacity="0.22"
      />
    </svg>
  );
}
