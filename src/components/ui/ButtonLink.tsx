import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
}

const variantStyles: Record<ButtonLinkVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-accent/40",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${variantStyles[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </a>
  );
}
