import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  return (
    <html lang="it" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
