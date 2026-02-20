"use client";

import { CheckIcon } from "../icons";
import { SectionHeading } from "../ui/SectionHeading";

const privacyPoints = [
  "Zero data sent to third-party servers",
  "No analytics, no tracking, no telemetry",
  "Run fully air-gapped or on a private network",
  "Open source, audit every line of code",
  "Your SLA data stays strictly internal",
];

const statBoxes = [
  { value: "0", label: "External calls" },
  { value: "$0", label: "Monthly SaaS fee" },
  { value: "None", label: "Vendor dependency" },
  { value: "~2 min", label: "Setup time" },
];

export function Privacy() {
  return (
    <section id="privacy" className="py-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[18px] p-4 sm:p-14 md:p-12 sm:p-8"
          style={{
            background: "rgba(74,222,128,0.04)",
            border: "1px solid var(--koala-accent-bdr)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <SectionHeading
                tag="— Privacy-First"
                title="Your data never leaves your server."
                description=""
              />
              <p className="text-[15px] leading-[1.72] text-[var(--koala-muted)] mb-5">
                Uptime data is operational intelligence. With Koala it stays on your
                infrastructure — always.
              </p>
              {privacyPoints.map((item) => (
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

            <div className="bg-[var(--koala-surface)] border border-[var(--koala-border)] rounded-xl p-6 text-center">
              <div className="font-mono text-[64px] font-medium leading-none tracking-tight text-[var(--koala-accent)]">
                ∞
              </div>
              <div className="text-[13px] text-[var(--koala-muted)] mt-2">
                Data retention, on your terms
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {statBoxes.map((s) => (
                  <div
                    key={s.label}
                    className="bg-black/5 dark:bg-black/20 border border-[var(--koala-border)] rounded-lg px-3 py-2.5 text-left"
                  >
                    <div className="font-mono text-[15px] font-medium text-[var(--foreground)]">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-[var(--koala-muted)] mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
