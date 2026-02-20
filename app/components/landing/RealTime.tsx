"use client";

import { ActivityIcon, ZapIcon, SlidersIcon } from "../icons";
import { SectionHeading } from "../ui/SectionHeading";

const sseRows = [
  { t: "12:04:01", ep: "api/health", s: 200, ms: 42, ok: true },
  { t: "12:04:31", ep: "ws/stream", s: 101, ms: 18, ok: true },
  { t: "12:05:01", ep: "api/health", s: 200, ms: 38, ok: true },
  { t: "12:05:31", ep: "api/v2/users", s: 504, ms: 8210, ok: false },
  { t: "12:06:01", ep: "api/health", s: 200, ms: 44, ok: true },
];

const rtItems = [
  {
    icon: <ActivityIcon />,
    title: "Instant status transitions",
    desc: "Green to red in under a second. No refresh needed.",
  },
  {
    icon: <ZapIcon />,
    title: "Rolling line charts",
    desc: "30-check latency history per endpoint as a live line chart.",
  },
  {
    icon: <SlidersIcon />,
    title: "Multi-protocol",
    desc: "HTTP, HTTPS, WebSocket, and WSS — all in one dashboard.",
  },
];

export function RealTime() {
  return (
    <section className="py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-14 items-center">
          <div className="bg-[#f0f0f2] dark:bg-[#09090c] border border-[var(--koala-border)] rounded-xl overflow-hidden font-mono">
            <div className="px-4 py-2.5 border-b border-[var(--koala-border)] flex items-center gap-1.5 text-[11px] text-[var(--koala-muted)]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--koala-accent)] animate-livepulse"
              />
              GET /events — SSE stream
            </div>
            <div className="px-4 py-3 text-[11.5px] leading-[2]">
              {sseRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[70px_36px_1fr_auto] gap-2 items-center"
                >
                  <span className="text-[var(--koala-muted)] opacity-45">{row.t}</span>
                  <span className={row.ok ? "text-emerald-400" : "text-red-400"}>
                    {row.s}
                  </span>
                  <span className="text-[var(--koala-muted)] overflow-hidden text-ellipsis whitespace-nowrap">
                    {row.ep}
                  </span>
                  <span
                    className={row.ms > 500 ? "text-amber-500" : "text-[var(--koala-muted)]"}
                  >
                    {row.ms}ms
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-[var(--koala-muted)] opacity-30 mt-1 text-[11px]">
                <span className="w-1 h-1 rounded-full bg-[var(--koala-accent)]" />
                streaming...
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              tag="— Real-Time"
              title="Live updates via Server-Sent Events."
              description=""
            />
            <p className="text-[15px] leading-[1.72] text-[var(--koala-muted)] mb-6">
              No page refreshes. No polling. Koala streams check results to your dashboard
              the moment they happen.
            </p>
            {rtItems.map((item) => (
              <div key={item.title} className="flex gap-3 mb-4 last:mb-0 items-start">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg border border-[var(--koala-accent-bdr)] bg-[var(--koala-accent-dim)] text-[var(--koala-accent)] flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-[var(--foreground)] mb-0.5">
                    {item.title}
                  </div>
                  <div className="text-[13px] text-[var(--koala-muted)] leading-[1.62]">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
