"use client";

import { ThemeProvider } from "./providers/ThemeProvider";
import {
  Navbar,
  Hero,
  Features,
  Deploy,
  Privacy,
  RealTime,
  CTA,
  Footer,
} from "./components/landing";

export default function KoalaPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <hr className="border-none border-t border-[var(--koala-border)] m-0" />
          <Features />
          <hr className="border-none border-t border-[var(--koala-border)] m-0" />
          <Deploy />
          <hr className="border-none border-t border-[var(--koala-border)] m-0" />
          <Privacy />
          <hr className="border-none border-t border-[var(--koala-border)] m-0" />
          <RealTime />
          <hr className="border-none border-t border-[var(--koala-border)] m-0" />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
