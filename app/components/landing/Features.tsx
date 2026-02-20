"use client";

import {
  ActivityIcon,
  ZapIcon,
  BellIcon,
  ShieldIcon,
  SlidersIcon,
  DatabaseIcon,
} from "../icons";
import { SectionHeading } from "../ui/SectionHeading";

const features = [
  {
    icon: <ActivityIcon />,
    title: "Real-Time Monitoring",
    desc: "Live status via Server-Sent Events — no polling, no delays. HTTP, HTTPS, WS, and WSS all supported.",
  },
  {
    icon: <ZapIcon />,
    title: "Latency Line Charts",
    desc: "30-check rolling line charts per endpoint. Spot degradation before your users notice.",
  },
  {
    icon: <BellIcon />,
    title: "Smart Email Alerts",
    desc: "Threshold-based alerts with cooldown. Up to 5 recipients. Signal only, no noise.",
  },
  {
    icon: <ShieldIcon />,
    title: "Privacy-First",
    desc: "Everything stays on your server. Zero vendor lock-in, zero telemetry, zero third-party calls.",
  },
  {
    icon: <SlidersIcon />,
    title: "Custom Requests",
    desc: "Choose method, set custom headers and body, define expected status codes, configure check intervals.",
  },
  {
    icon: <DatabaseIcon />,
    title: "SQLite Storage",
    desc: "Zero-setup persistence. A single file, automatic cleanup. No separate database container.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="— Features"
          title={
            <>
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </>
          }
          description="From endpoint checks to live latency line charts — full visibility, zero overhead."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[var(--koala-surface)] border border-[var(--koala-border)] rounded-xl p-6 transition-all duration-200 hover:border-[var(--koala-accent-bdr)] hover:bg-[var(--koala-surface-2)] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg border border-[var(--koala-border)] bg-[var(--koala-surface-2)] text-[var(--koala-accent)] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--foreground)] mb-2">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-[var(--koala-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
