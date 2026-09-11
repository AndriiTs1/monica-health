interface WhatsAppIconProps {
  className?: string;
}

/**
 * Minimal monochrome WhatsApp glyph (currentColor), so the header CTA
 * reads as WhatsApp at a glance without pulling in a whole brand-icon
 * library for one icon.
 */
export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.02c-.24.68-1.19 1.25-1.94 1.4-.52.11-1.19.2-3.46-.74-2.9-1.2-4.77-4.14-4.92-4.33-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.24-.26.53-.32.71-.32.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.81 1.98.88 2.13.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.24 1.39.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.54.73 1.8.86.27.14.45.2.51.32.06.12.06.68-.18 1.36z" />
    </svg>
  );
}
