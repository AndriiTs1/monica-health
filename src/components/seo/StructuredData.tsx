import { SITE, SITE_TITLE, SITE_URL } from "@/lib/constants";

interface IdReference {
  "@id": string;
}

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

interface AreaServedCity {
  "@type": "City";
  name: string;
}

interface AreaServedAdministrativeArea {
  "@type": "AdministrativeArea";
  name: string;
}

type AreaServed = AreaServedCity | AreaServedAdministrativeArea;

interface ServiceOffering {
  "@type": "Service";
  name: string;
  description: string;
}

interface Offer {
  "@type": "Offer";
  itemOffered: ServiceOffering;
}

interface MedicalBusinessSchema {
  "@type": ["MedicalBusiness", "LocalBusiness"];
  "@id": string;
  name: string;
  legalName: string;
  url: string;
  telephone: string;
  email: string;
  description: string;
  address: PostalAddress;
  areaServed: AreaServed[];
  founder: IdReference;
  makesOffer: Offer[];
}

interface PersonSchema {
  "@type": "Person";
  "@id": string;
  name: string;
  jobTitle: string;
  telephone: string;
  email: string;
}

interface WebSiteSchema {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  inLanguage: string;
  publisher: IdReference;
}

interface WebPageSchema {
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: IdReference;
  about: IdReference;
}

type GraphNode = MedicalBusinessSchema | PersonSchema | WebSiteSchema | WebPageSchema;

interface StructuredDataGraph {
  "@context": "https://schema.org";
  "@graph": GraphNode[];
}

const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#monica`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

const TELEPHONE = SITE.phoneHref.replace("tel:", "");

// Names and descriptions mirror the confirmed, already-published service
// copy in src/data/services.ts — nothing here introduces new claims.
const serviceCatalog: ServiceOffering[] = [
  {
    "@type": "Service",
    name: "Cure infermieristiche a domicilio",
    description:
      "Valutazione dei bisogni, controllo dei parametri e assistenza secondo le indicazioni mediche.",
  },
  {
    "@type": "Service",
    name: "Medicazioni a domicilio",
    description:
      "Cura e controllo delle ferite e sostituzione delle medicazioni secondo prescrizione.",
  },
  {
    "@type": "Service",
    name: "Supporto nelle terapie prescritte",
    description:
      "Supporto nell'esecuzione delle terapie e nella corretta gestione dei medicamenti prescritti.",
  },
  {
    "@type": "Service",
    name: "Assistenza dopo il ricovero",
    description:
      "Continuità delle cure e supporto durante il rientro a casa dopo un ricovero o un intervento.",
  },
  {
    "@type": "Service",
    name: "Supporto alla persona",
    description:
      "Aiuto professionale nelle attività quotidiane legate alla salute e al mantenimento dell'autonomia.",
  },
  {
    "@type": "Service",
    name: "Coordinamento con familiari e medici",
    description:
      "Comunicazione chiara e coordinamento con le persone coinvolte nel percorso di cura.",
  },
];

const business: MedicalBusinessSchema = {
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: SITE.siteName,
  legalName: SITE.legalName,
  url: SITE_URL,
  telephone: TELEPHONE,
  email: SITE.email,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    postalCode: SITE.postalCode,
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: SITE.addressCountry,
  },
  areaServed: [
    { "@type": "City", name: "Lugano" },
    { "@type": "AdministrativeArea", name: "Canton Ticino" },
  ],
  founder: { "@id": PERSON_ID },
  makesOffer: serviceCatalog.map((itemOffered) => ({
    "@type": "Offer",
    itemOffered,
  })),
};

const person: PersonSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.siteName,
  jobTitle: SITE.professionalTitle,
  telephone: TELEPHONE,
  email: SITE.email,
};

const website: WebSiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE.siteName,
  inLanguage: "it-CH",
  publisher: { "@id": BUSINESS_ID },
};

const webPage: WebPageSchema = {
  "@type": "WebPage",
  "@id": WEBPAGE_ID,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE.description,
  inLanguage: "it-CH",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
};

const structuredData: StructuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [business, person, website, webPage],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
