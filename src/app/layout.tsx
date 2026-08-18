import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE =
  "Frère Vastgoed — Vastgoedmakelaar in As, Genk, Maasmechelen & Oudsbergen";
const DESCRIPTION =
  "Frère Vastgoed begeleidt u bij de verkoop, verhuur en aankoop van vastgoed in As, Genk, Maasmechelen, Oudsbergen en omstreken.";

// Vercel levert VERCEL_PROJECT_PRODUCTION_URL aan bij een deploy; lokaal valt dit
// terug op de dev-server zodat de OG-afbeelding altijd absoluut oplost.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3500";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "nl_BE",
    type: "website",
    siteName: "Frère Vastgoed",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Frère Vastgoed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a href="#inhoud" className="skip-link font-body">
          Naar de inhoud
        </a>
        {children}
      </body>
    </html>
  );
}
