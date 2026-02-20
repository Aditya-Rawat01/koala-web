import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "md" | "lg";

const baseStyles =
   "flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-150 whitespace-nowrap leading-none cursor-pointer";
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--koala-accent)] text-white dark:text-[#0c0c0e] hover:bg-[var(--koala-accent-hover)] hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(74,222,128,0.25)]",
  ghost:
    "bg-[var(--koala-surface-2)] text-[var(--foreground)] border border-[var(--koala-border)] hover:bg-[var(--koala-surface)] hover:-translate-y-px",
};
const sizeStyles: Record<ButtonSize, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-[15px] rounded-[9px]",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
  };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as,
  ...props
}: ButtonProps | AnchorProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (as === "a") {
    return (
      <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}  className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
