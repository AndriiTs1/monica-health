"use client";

import { useId, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  navigation: NavItem[];
  phone: string;
  phoneHref: string;
}

export function MobileMenu({ navigation, phone, phoneHref }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-20 border-b border-border bg-background px-4 pt-2 pb-6 shadow-md sm:px-6"
        >
          <nav aria-label="Navigazione mobile" className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={phoneHref}
            onClick={() => setIsOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Chiama {phone}
          </a>
        </div>
      ) : null}
    </div>
  );
}
