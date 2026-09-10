import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-5 text-center shadow-sm transition-colors hover:border-primary/40 lg:items-start lg:gap-4 lg:p-6 lg:text-left">
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted lg:max-w-none">
        {description}
      </p>
    </div>
  );
}
