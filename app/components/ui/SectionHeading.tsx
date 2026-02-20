type SectionHeadingProps = {
  tag: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({ tag, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${className}`}>
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--koala-accent)] mb-4">
        {tag}
      </div>
      <h2 className="text-[clamp(24px,3vw,38px)] font-semibold tracking-[-0.02em] text-[var(--foreground)] leading-[1.2] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] leading-[1.7] text-[var(--koala-muted)] max-w-2xl">{description}</p>
      )}
    </div>
  );
}
