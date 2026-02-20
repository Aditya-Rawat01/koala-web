"use client";

import { DockerIcon } from "../icons";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 52% at 50% 50%, rgba(74,222,128,0.07) 0%, transparent 68%)",
        }}
      />
      <div className="dark:opacity-80 absolute inset-0 pointer-events-none" style={{
        background:
          "radial-gradient(ellipse 60% 52% at 50% 50%, rgba(74,222,128,0.05) 0%, transparent 68%)",
      }} />

      <div className="font-mono text-[11px] font-medium uppercase tracking-widest text-[var(--koala-accent)] mb-3 flex justify-center relative">
        — Get Started
      </div>
      <h2 className="text-[clamp(26px,3.8vw,44px)] font-semibold tracking-tight text-[var(--foreground)] max-w-[580px] mx-auto mb-3 relative">
        Self-hosted. Lightweight.
        <br />
        <span className="text-[var(--koala-accent)]">Developer-first.</span>
      </h2>
      <p className="text-[15.5px] text-[var(--koala-muted)] max-w-[420px] mx-auto mb-8 leading-[1.72] relative">
        Deploy Koala in under two minutes. No account, no credit card, no SaaS subscription.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-2.5 flex-wrap relative ">
        <Button as="a" href="/playground" variant="primary" size="lg">
          Test in Playground
        </Button>
        <Button
          as="a"
          href="https://github.com"
          variant="ghost"
          size="lg"
          target="_blank"
          rel="noreferrer"
        >
          <DockerIcon size={16} /> Self-Host with Docker
        </Button>
      </div>
      <p className="mt-4 text-xs text-[var(--koala-muted)] opacity-55 relative">
        Open source · MIT License · No telemetry · 60MB image
      </p>
    </section>
  );
}
