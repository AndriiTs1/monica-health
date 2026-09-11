import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SITE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE.siteName}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE.siteName,
  authors: [{ name: SITE.siteName, url: SITE_URL }],
  creator: SITE.siteName,
  publisher: SITE.siteName,
  category: "Assistenza sanitaria a domicilio",
  keywords: [
    "infermiera indipendente Lugano",
    "infermiera a domicilio Lugano",
    "assistenza infermieristica a domicilio Ticino",
    "cure infermieristiche Figino",
    "assistenza anziani Lugano",
    "medicazioni a domicilio Lugano",
    "assistenza post ricovero Ticino",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.siteName,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/monica.png",
        alt: "Monica Ceruolo — Infermiera indipendente a domicilio a Lugano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/monica.png"],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Deliberately minimal and route-agnostic: <html>/<body>, fonts and
  // shared metadata only. Which chrome a route gets (public Header/Footer
  // vs. the bare admin shell) is decided purely by which layout.tsx file
  // is on disk for that route segment — src/app/(public)/layout.tsx for
  // the public site, src/app/admin/layout.tsx for the admin panel — never
  // by a runtime check here. That's what makes it immune to the App
  // Router persisting a stale layout instance across client-side
  // back/forward navigation between the two sections.
  return (
    <html lang="it" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
