"use client";

import { LatencyLineChart } from "./LatencyLineChart";
import { useTheme } from "@/app/providers/ThemeProvider";

const endpoints = [
  { name: "api.example.com/health", status: "up", latency: "42ms", uptime: "99.98%" },
  { name: "ws.example.com/stream", status: "up", latency: "18ms", uptime: "100%" },
  { name: "api.example.com/v2/users", status: "slow", latency: "890ms", uptime: "99.1%" },
  { name: "pay.example.com/webhook", status: "up", latency: "65ms", uptime: "99.95%" },
];

const stats = [
  { label: "Endpoints", value: "4" },
  { label: "Uptime", value: "99.76%" },
  { label: "Avg Latency", value: "266ms" },
  { label: "Alerts", value: "1" },
];

function dotColor(status: string) {
  if (status === "up") return "#4ade80";
  if (status === "slow") return "#f59e0b";
  return "#f87171";
}

export function MockDashboard() {
  const { isDark } = useTheme();

  return (
    <div
      className="rounded-[14px] overflow-hidden font-mono text-xs border border-[var(--koala-border)]"
      style={{
        background: isDark ? "#0c0c0f" : "#f5f5f5",
        boxShadow: isDark ? "0 20px 56px rgba(0,0,0,0.55)" : "0 20px 56px rgba(0,0,0,0.09)",
      }}
    >
      <div
        className="px-4 py-2.5 border-b border-[var(--koala-border)] flex items-center gap-1.5"
        style={{
          background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: c }}
          />
        ))}
        <span className="flex-1 text-center text-[11px] text-[var(--koala-muted)]">
          Koala — Dashboard
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 px-3.5 border-b border-[var(--koala-border)]">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[var(--koala-surface)] rounded-[7px] px-2.5 py-2"
          >
            <div className="text-[var(--koala-muted)] text-[10px] mb-0.5">{s.label}</div>
            <div className="text-[var(--foreground)] font-semibold text-[13px]">{s.value}</div>
          </div>
        ))}
      </div>

      {endpoints.map((ep) => (
        <div
          key={ep.name}
          className="grid grid-cols-[10px_1fr_auto_auto] items-center gap-2.5 px-3.5 py-2 border-b border-[var(--koala-border)]"
        >
          <span
            className="w-[7px] h-[7px] rounded-full"
            style={{
              background: dotColor(ep.status),
              boxShadow: `0 0 5px ${dotColor(ep.status)}55`,
            }}
          />
          <span className="text-[var(--foreground)] overflow-hidden text-ellipsis whitespace-nowrap">
            {ep.name}
          </span>
          <span className="text-[var(--koala-muted)]">{ep.latency}</span>
          <span className="text-[var(--koala-muted)]">{ep.uptime}</span>
        </div>
      ))}

      <div className="p-3 px-3.5">
        <div className="text-[var(--koala-muted)] text-[10px] mb-2 uppercase tracking-wider">
          Latency — last 30 checks
        </div>
        <LatencyLineChart isDark={isDark} />
      </div>
    </div>
  );
}
