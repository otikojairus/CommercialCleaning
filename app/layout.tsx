import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          id="retreaver"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.defer=!0;a.src=document.location.protocol+"//dist.routingapi.com/jsapi/v1/retreaver.min.js";a.onload=a.onreadystatechange=function(){Retreaver.configure({host:"api.routingapi.com",prefix:"https:"==document.location.protocol?"https":"http"});(new Retreaver.Campaign({campaign_key:"a2ff6f191abf71a68080c6c406556e6f"})).auto_replace_numbers()};(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)})();`,
          }}
        />
      </body>
    </html>
  );
}
