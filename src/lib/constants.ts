export interface SiteConfig {
  siteName: string;
  legalName: string;
  professionalTitle: string;
  description: string;
  url: string;
  locale: string;
  language: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  rcc: string;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  serviceArea: string;
}

const SITE_URL_FALLBACK = "https://monica-health-alpha.vercel.app";

/**
 * Centralised production URL. Set NEXT_PUBLIC_SITE_URL once a permanent
 * domain is available so it doesn't need to be edited across the codebase.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL_FALLBACK;

export const SITE_TITLE =
  "Monica Ceruolo | Infermiera indipendente a domicilio a Lugano";

export const SITE_DESCRIPTION =
  "Assistenza infermieristica professionale a domicilio a Lugano, Figino e nelle zone vicine. Contatto diretto con Monica Ceruolo, infermiera indipendente riconosciuta dalle casse malati.";

export const SITE: SiteConfig = {
  siteName: "Monica Ceruolo",
  legalName: "Monica Ceruolo",
  professionalTitle: "Infermiera indipendente",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  locale: "it_CH",
  language: "it",
  phone: "+41 76 779 15 31",
  phoneHref: "tel:+41767791531",
  email: "ceruolomonica@gmail.com",
  emailHref: "mailto:ceruolomonica@gmail.com",
  rcc: "C693321",
  streetAddress: "Via alle Brughette 14",
  postalCode: "6918",
  addressLocality: "Figino",
  addressRegion: "Ticino",
  addressCountry: "CH",
  serviceArea: "Regione di Lugano e zone vicine",
};

// Legacy flat exports kept for backward compatibility with existing
// components. All values are derived from SITE so there is a single
// source of truth.
export const NAME = SITE.siteName;
export const ROLE = SITE.professionalTitle;
export const TRUST_STATEMENT = "Riconosciuta da tutte le casse malati";

export const PHONE = SITE.phone;
export const PHONE_HREF = SITE.phoneHref;

// wa.me needs digits only (no "tel:", no "+"), derived from the same
// phoneHref above so the number itself is never repeated.
export const WHATSAPP_HREF = `https://wa.me/${PHONE_HREF.replace(/^tel:\+?/, "")}`;

export const EMAIL = SITE.email;
export const EMAIL_HREF = SITE.emailHref;

export const ADDRESS_LINE1 = SITE.streetAddress;
export const ADDRESS_LINE2 = `${SITE.postalCode} ${SITE.addressLocality}, Svizzera`;

export const RCC = SITE.rcc;
