"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

interface HomeLinkProps {
  children: ReactNode;
  className?: string;
}

export function HomeLink({ children, className }: HomeLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  return (
    <Link href="/" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
