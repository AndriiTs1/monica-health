import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.siteName,
    short_name: "Monica",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#2f4a3f",
    lang: "it-CH",
  };
}
