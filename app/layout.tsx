import type { Metadata } from "next";
import { Literata, Nunito_Sans } from "next/font/google";
import { SiteFooter, SiteHeader, StickyMobileCta } from "@/components/site-chrome";
import { absoluteUrl, SITE_NAME } from "@/lib/pages";
import "./globals.css";

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const display = Literata({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: { default: "Commercial Cleaning Canada | CommercialCleaning.com", template: "%s" },
  description: "Friendly commercial cleaning for offices and shops across Canada. Call us—we'll help you figure out what you need.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_NAME,
    title: "CommercialCleaning.com",
    description: "A cleaner workplace starts with a simple phone call.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable}`}>
      <body>
        <div className="page-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <StickyMobileCta />
      </body>
    </html>
  );
}
