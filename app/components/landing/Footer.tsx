"use client";

import Link from "next/link";
import { DockerIcon } from "../icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--koala-border)] py-8">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 md:text-left text-center md:justify-items-start justify-items-center">
        <Link href="#" className="font-mono text-[15px] font-medium text-[var(--foreground)] flex items-center gap-1.5">
          🐨 Koala
        </Link>

        <div className="flex justify-center md:justify-center gap-0.5 flex-wrap">
          <Link
            href="#"
            className="text-[13px] font-medium text-[var(--koala-muted)] px-2.5 py-1.5 rounded-md transition-colors hover:text-[var(--foreground)] hover:bg-[var(--koala-surface)]"
          >
            Documentation
          </Link>
          <Link
            href="#deploy"
            className="text-[13px] font-medium text-[var(--koala-muted)] px-2.5 py-1.5 rounded-md transition-colors hover:text-[var(--foreground)] hover:bg-[var(--koala-surface)] inline-flex items-center gap-1"
          >
            <DockerIcon size={13} /> Docker Setup
          </Link>
          <Link
            href="#features"
            className="text-[13px] font-medium text-[var(--koala-muted)] px-2.5 py-1.5 rounded-md transition-colors hover:text-[var(--foreground)] hover:bg-[var(--koala-surface)]"
          >
            Features
          </Link>
          <Link
            href="/playground"
            className="text-[13px] font-medium text-[var(--koala-muted)] px-2.5 py-1.5 rounded-md transition-colors hover:text-[var(--foreground)] hover:bg-[var(--koala-surface)]"
          >
            Playground
          </Link>
        </div>

        <span className="text-xs text-[var(--koala-muted)] opacity-50">
          Lightweight. Self-hosted. Yours.
        </span>
      </div>
    </footer>
  );
}
