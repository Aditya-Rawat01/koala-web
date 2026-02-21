export function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="bg-[var(--koala-code-bg)] border border-[var(--koala-border)] rounded-md px-3 py-2.5 font-mono text-[clamp(11px,1.8vw,12px)] leading-[1.7] text-[var(--foreground)] overflow-x-auto whitespace-pre-wrap break-all max-w-full"
      style={{ fontFamily: "IBM Plex Mono, monospace" }}
    >
      {children}
    </pre>
  );
}
