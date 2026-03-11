import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard modern font
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | にほんごドクター.com",
    default: "にほんごドクター｜海外で日本語が通じる病院・クリニック検索",
  },
  description: "外務省・各国日本人会の公開情報をもとに、35カ国264件以上の日本語対応医療機関を掲載。海外旅行・駐在・留学先での急な体調不良も安心です。",
  openGraph: {
    title: "にほんごドクター｜海外で日本語が通じる病院・クリニック検索",
    description: "外務省・各国日本人会の公開情報をもとに、35カ国264件以上の日本語対応医療機関を掲載。海外旅行・駐在・留学先での急な体調不良も安心です。",
    url: "https://nihongo-doctor.com", // Assuming this is the actual domain, user can change it if needed
    siteName: "にほんごドクター.com",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "にほんごドクター｜海外で日本語が通じる病院・クリニック検索",
    description: "外務省・各国日本人会の公開情報をもとに、35カ国264件以上の日本語対応医療機関を掲載。海外旅行・駐在・留学先での急な体調不良も安心です。",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Providers>
            <Header />
            <main className="flex-1 bg-muted/30">
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
