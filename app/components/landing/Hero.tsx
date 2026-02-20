"use client";

import { DockerIcon } from "../icons";
import { Button } from "../ui/Button";
import { MockDashboard } from "./MockDashboard";

const stats = [
  { value: "~60MB", label: "Docker image" },
  { value: "0 calls", label: "External services" },
  { value: "100%", label: "Data ownership" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[clamp(96px,12vw,136px)] pb-[clamp(56px,8vw,80px)] px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100"
        style={{
          backgroundImage: `linear-gradient(var(--koala-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--koala-border) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 78% 58% at 50% 30%, black 15%, transparent 72%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-14 max-w-[1320px] mx-auto items-center px-4 sm:px-6 lg:px-8">
        <div>
          <div
            className="animate-fade-up inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--koala-accent-bdr)] bg-[var(--koala-accent-dim)] text-xs font-medium text-[var(--koala-accent)] mb-4"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--koala-accent)] animate-livepulse" />
            Real-time · Self-hosted · Open source
          </div>

          <h1
            className="animate-fade-up text-[clamp(28px,4.5vw,48px)] sm:text-[clamp(36px,4.5vw,52px)] font-semibold leading-[1.15] tracking-[-0.025em] text-[var(--foreground)] mb-5"
            style={{ animationDelay: "0.12s" }}
          >
            Monitor APIs
            <br />
            without vendor
            <br />
            <span className="text-[var(--koala-accent)]">lock-in.</span>
          </h1>

          <p
            className="animate-fade-up text-[15px] sm:text-[16px] leading-[1.75] text-[var(--koala-muted)] mb-8 max-w-[460px]"
            style={{ animationDelay: "0.2s" }}
          >
            Lightweight, self-hosted endpoint monitoring. Real-time status updates, live latency
            line charts, and smart email alerts — running entirely on your infrastructure.
            <br />
            <br />
            <strong>Designed for VPS, homelabs, and production monitoring.</strong>
          </p>

          <div
            className="animate-fade-up flex flex-col sm:flex-row gap-2.5 flex-wrap"
            style={{ animationDelay: "0.28s" }}
          >
            <Button as="a" href="/playground" variant="primary" size="lg">
              Test in Playground
            </Button>
            <Button as="a" href="#deploy" variant="ghost" size="lg">
              <DockerIcon size={16} /> Self-Host with Docker
            </Button>
          </div>

          <div
            className="animate-fade-up grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-0 mt-10 pt-7 border-t border-[var(--koala-border)]"
            style={{ animationDelay: "0.36s" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="pr-4 sm:pr-7 mr-4 sm:mr-7 border-r border-[var(--koala-border)] last:border-r-0 last:pr-0 last:mr-0 sm:mb-0"
              >
                <div className="font-mono text-xl font-medium text-[var(--foreground)]">
                  {s.value}
                </div>
                <div className="text-xs text-[var(--koala-muted)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="animate-fade-up hidden md:block w-full max-w-[520px] ml-auto"
          style={{ animationDelay: "0.2s" }}
        >
          <MockDashboard />
        </div>
      </div>
    </section>
  );
}
