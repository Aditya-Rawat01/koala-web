"use client";

import { useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "../icons";
import { Button } from "../ui/Button";
import { useTheme } from "@/app/providers/ThemeProvider";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#deploy", label: "Deploy" },
  { href: "#privacy", label: "Privacy" },
];

export function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-2xl bg-[var(--koala-nav-bg)] border-b border-[var(--koala-border)] w-screen">
      <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-[52px]">
        <Link href="#" className="font-mono text-base font-medium text-[var(--foreground)] flex items-center gap-1.5 shrink-0">
          🐨 Koala
        </Link>

        <div className="hidden sm:flex justify-center gap-0.5 flex-1 min-w-0 max-w-xl mx-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--koala-muted)] px-3 py-1.5 rounded-md transition-colors hover:bg-[var(--koala-surface-2)] hover:text-[var(--foreground)] inline-flex items-center gap-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-md border border-[var(--koala-border)] bg-[var(--koala-surface)] text-[var(--koala-muted)] flex items-center justify-center transition-colors hover:text-[var(--foreground)] hover:bg-[var(--koala-surface-2)]"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Button as="a" href="/playground" variant="ghost" size="md" className="hidden sm:inline-flex">
            Test in Playground
          </Button>
          <Button as="a" href="#deploy" variant="primary" size="md" className="hidden sm:inline-flex">
            Get Started
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="sm:hidden w-9 h-9 rounded-md border border-[var(--koala-border)] bg-[var(--koala-surface)] text-[var(--foreground)] flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[var(--koala-border)] bg-[var(--koala-nav-bg)]">
          <div className="flex flex-col gap-0.5 p-4 max-w-[1320px] mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[var(--koala-muted)] px-3 py-2.5 rounded-md hover:bg-[var(--koala-surface-2)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[var(--koala-accent)] px-3 py-2.5 rounded-md hover:bg-[var(--koala-accent-dim)] mt-2"
            >
              Test in Playground
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
