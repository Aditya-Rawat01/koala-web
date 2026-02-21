"use client";

import { InfoIcon, CheckIcon } from "../icons";
import { CodeBlock } from "../ui/CodeBlock";
import { CopyButton } from "../ui/CopyButton";
import { SectionHeading } from "../ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Curl the Docker Compose file.",
    code: `curl -fsSL https://raw.githubusercontent.com/Aditya-Rawat01/koala-self-deployed/main/docker-compose.yml -o docker-compose.yml`,
  },
  {
    n: "02",
    title: "Review the Docker Compose file",
    code: `edit ports, volumes, and env vars`,
    note: "The compose file includes the API, dashboard, and SQLite volume.",
  },
  {
    n: "03",
    title: "Add SMTP config for email alerts",
    code: `SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password`,
    note: "Use a Gmail App Password — not your real password.",
  },
  {
    n: "04",
    title: "Run on your VM",
    code: "docker compose up --build -d",
    note: "Recommended: run on a VPS/VM for 24/7 monitoring.",
  },
];

const techStack = [
  { label: "Node.js + Express", color: "#68a063" },
  { label: "React + TypeScript", color: "#61dafb" },
  { label: "SQLite", color: "#79c3f7" },
  { label: "SSE Real-Time", color: "#f59e0b" },
  { label: "Docker Multi-Stage", color: "#2496ed" },
  { label: "SMTP Alerts", color: "#a78bfa" },
];

const sqliteReasons = [
  "Zero setup — database is just a file",
  "Automatic cleanup keeps storage lean",
  "Back up with a single cp command",
  "No separate DB process or container",
];

export function Deploy() {
  return (
    <section id="deploy" className="py-20">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeading
              tag="— Quick Deploy"
              title="Up and running in four steps."
              description=""
            />
            <p className="text-[15px] leading-[1.72] text-[var(--koala-muted)] mb-10">
              Single container, no orchestration needed. Email alerts are configured via
              environment variables. Pass your SMTP credentials and they work immediately.
            </p>

            <div className="flex flex-col gap-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="grid grid-cols-1 sm:grid-cols-[40px_1fr] gap-4 items-start bg-[var(--koala-surface)] border border-[var(--koala-border)] rounded-xl px-5 py-5 transition-colors hover:border-[var(--koala-accent-bdr)]"
                >
                  <div className="font-mono text-[10.5px] font-medium text-[var(--koala-accent)] pt-0.5">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-[var(--foreground)] mb-2 flex justify-between">
                      <p>{s.title}</p>
                      <CopyButton children={s.code}/>
                    </div>
                    
                    <CodeBlock>{s.code}</CodeBlock>
                    {s.note && (
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-[var(--koala-muted)]">
                        <InfoIcon />
                        {s.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              tag="— Tech Stack"
              title="Built on reliable primitives."
              description=""
            />
            <p className="text-[15px] leading-[1.72] text-[var(--koala-muted)] mb-8">
              No magic dependencies. Each piece chosen for reliability and ease of self-hosting.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {techStack.map((t) => (
                <div
                  key={t.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--koala-border)] bg-[var(--koala-surface)] text-[12.5px] font-medium text-[var(--foreground)] transition-all hover:bg-[var(--koala-surface-2)] hover:-translate-y-px"
                >
                  <span
                    className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                    style={{ background: t.color }}
                  />
                  {t.label}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[var(--koala-surface)] border border-[var(--koala-border)] rounded-xl p-6">
              <div className="font-mono text-[10.5px] font-medium uppercase tracking-wider text-[var(--koala-muted)] mb-3">
                Why SQLite?
              </div>
              {sqliteReasons.map((item) => (
                <div key={item} className="flex items-start gap-2 mb-2 last:mb-0">
                  <span className="w-5 h-5 flex-shrink-0 rounded-md bg-[var(--koala-accent-dim)] text-[var(--koala-accent)] flex items-center justify-center mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[13px] leading-[1.6] text-[var(--koala-muted)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
