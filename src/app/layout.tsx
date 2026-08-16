import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import { getPublishedStats } from "@/lib/catalog";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
const { clinicCount: totalCount, countryCount: totalCountries } = getPublishedStats();

const siteTitle = "にほんごドクター.com | 海外で日本語が通じる病院・クリニック検索";
const siteDescription =
  `海外在住・旅行中の日本人のための、世界各国の日本語対応病院・クリニック検索サイト。アジア・北米・ヨーロッパ・オセアニアなど${totalCountries}カ国以上、${totalCount}件超の医療機関を掲載。`;
const siteUrl = "https://nihongo-doctor.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | にほんごドクター.com",
    default: siteTitle,
  },
  description: siteDescription,
  applicationName: "にほんごドクター.com",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "にほんごドクター.com",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "にほんごドクター.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "にほんごドクター.com",
  alternateName: "nihongo-doctor.com",
  url: siteUrl,
  description: siteDescription,
  inLanguage: "ja-JP",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/nearby?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "にほんごドクター.com",
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="overflow-x-hidden">
      <body className={notoSansJp.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <Providers>
            <Header />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
          </Providers>
          <ServiceWorkerRegister />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
