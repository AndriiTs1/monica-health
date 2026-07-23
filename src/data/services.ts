import {
  Stethoscope,
  Bandage,
  Pill,
  ClipboardCheck,
  HandHeart,
  Users,
} from "lucide-react";
import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    icon: Stethoscope,
    title: "Cure infermieristiche",
    description:
      "Valutazione dei bisogni, controllo dei parametri e assistenza secondo le indicazioni mediche.",
  },
  {
    icon: Bandage,
    title: "Medicazioni",
    description:
      "Cura e controllo delle ferite e sostituzione delle medicazioni secondo prescrizione.",
  },
  {
    icon: Pill,
    title: "Terapie prescritte",
    description:
      "Supporto nell'esecuzione delle terapie e nella corretta gestione dei medicamenti prescritti.",
  },
  {
    icon: ClipboardCheck,
    title: "Assistenza dopo il ricovero",
    description:
      "Continuità delle cure e supporto durante il rientro a casa dopo un ricovero o un intervento.",
  },
  {
    icon: HandHeart,
    title: "Supporto alla persona",
    description:
      "Aiuto professionale nelle attività quotidiane legate alla salute e al mantenimento dell'autonomia.",
  },
  {
    icon: Users,
    title: "Collaborazione con familiari e medici",
    description:
      "Comunicazione chiara e coordinamento con le persone coinvolte nel percorso di cura.",
  },
];
