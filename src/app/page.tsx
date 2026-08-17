import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, Map, Landmark, TreePalm, Sun, Tent, LocateFixed, PhoneCall, BookOpen } from "lucide-react";
import { GlobalSearch } from "@/components/features/GlobalSearch";
import { getPopularCities, getPublishedStats, publishedClinics } from "@/lib/catalog";
import { COUNTRY_JA_MAP } from "@/lib/constants";
import { JsonLd } from "@/components/features/JsonLd";
import { faqJsonLd } from "@/lib/seo";

const { clinicCount: totalCount, countryCount: totalCountries } = getPublishedStats();

const homeFaqs = [
  {
    question: "海外で日本語が通じる病院はどう探せばいい？",
    answer: `都市名と「日本語」「病院」で探すのがいちばん早いです。このサイトでは${totalCountries}カ国・${totalCount}件超の日本語対応医療機関を、国・都市・病院のページに分けて掲載しています。`,
  },
  {
    question: "日本人の医師がいるクリニックだけ見られますか？",
    answer: "日本語で直接診察できる施設と、通訳・日本語サポートがある施設を分けて表示しています。カードの表示で見分けられます。",
  },
  {
    question: "緊急のときの連絡先は？",
    answer: "国ごとの救急番号は緊急時ガイドにまとめています。命に関わる症状はまず現地の救急へ。日本語で相談したい場合は都市ページの病院一覧から連絡してください。",
  },
];

export const metadata: Metadata = {
  title: "にほんごドクター.com | 海外で日本語が通じる病院・クリニック検索",
  description:
    `海外在住・旅行中の日本人のための、世界各国の日本語対応病院・クリニック検索サイト。アジア・北米・ヨーロッパ・オセアニアなど${totalCountries}カ国以上、${totalCount}件超の医療機関を掲載。`,
};

function getContinentStats(continentName: string) {
  const filtered = publishedClinics.filter((c) => c.continent === continentName);
  const countries = new Set(filtered.map((c) => c.country));
  return { count: filtered.length, countryCount: countries.size };
}

export default function Home() {
  const asia = getContinentStats("Asia");
  const northAmerica = getContinentStats("North America");
  const europe = getContinentStats("Europe");
  const oceania = getContinentStats("Oceania");
  const latinAmerica = getContinentStats("Latin America");
  const africaMiddleEast = getContinentStats("Africa & Middle East");

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden min-h-[520px] sm:min-h-[620px] md:min-h-[720px]">
        <Image
          src="/hero-travel.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/10 via-white/25 to-white" />

        <div className="relative z-10 container mx-auto px-4 pt-10 sm:pt-20 pb-28 sm:pb-36 text-center">
          <h1 className="text-[1.7rem] leading-snug font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-800 mb-4 sm:mb-5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
            世界中で、<br className="sm:hidden" />
            <span className="text-[#1aa3c7]">日本語の通じる</span>ドクターを。
          </h1>
          <p className="text-base sm:text-2xl font-medium text-slate-600 mb-6 sm:mb-8 px-2">
            {totalCountries}カ国以上・{totalCount}件強の日本語対応医療機関を掲載
          </p>
          <div className="mx-auto max-w-3xl mb-4">
            <GlobalSearch variant="hero" />
          </div>
          <p className="text-xs text-slate-500/80 text-center mt-4 px-6">
            <span className="sm:hidden">出典：外務省『世界の医療事情』等</span>
            <span className="hidden sm:inline">出典：外務省『世界の医療事情』、各国大使館・総領事館、各医療機関の公開情報</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-7">
            <Link href="/nearby" className="inline-flex items-center gap-2 bg-[#1aa3c7] text-white px-5 py-3 rounded-full font-semibold shadow-md">
              <LocateFixed className="w-4 h-4" /> 現在地から近い病院
            </Link>
            <Link href="/emergency" className="inline-flex items-center gap-2 bg-white/90 border border-white px-5 py-3 rounded-full font-semibold shadow-sm">
              <PhoneCall className="w-4 h-4" /> 緊急時ガイド
            </Link>
            <Link href="/phrases" className="inline-flex items-center gap-2 bg-white/90 border border-white px-5 py-3 rounded-full font-semibold shadow-sm">
              <BookOpen className="w-4 h-4" /> 医療フレーズ
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-24 relative z-10 mb-20">
        <div className="bg-white/95 rounded-[32px] shadow-[0_16px_50px_rgba(15,23,42,0.08)] p-6 md:p-10 border border-white">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              地域から探す
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              世界{totalCountries}カ国・{totalCount}件以上の日本語対応クリニックを掲載
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/asia" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Map className="w-24 h-24 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2">アジア</h3>
              <span className="inline-block bg-white/80 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {asia.countryCount}カ国・{asia.count}件
              </span>
            </Link>

            <Link href="/north-america" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Building2 className="w-24 h-24 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">北米</h3>
              <span className="inline-block bg-white/80 text-blue-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {northAmerica.countryCount}カ国・{northAmerica.count}件
              </span>
            </Link>

            <Link href="/europe" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Landmark className="w-24 h-24 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900 mb-2">ヨーロッパ</h3>
              <span className="inline-block bg-white/80 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {europe.countryCount}カ国・{europe.count}件
              </span>
            </Link>

            <Link href="/oceania" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <TreePalm className="w-24 h-24 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold text-cyan-900 mb-2">オセアニア</h3>
              <span className="inline-block bg-white/80 text-cyan-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {oceania.countryCount}カ国・{oceania.count}件
              </span>
            </Link>

            <Link href="/latin-america" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sun className="w-24 h-24 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">中南米</h3>
              <span className="inline-block bg-white/80 text-orange-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {latinAmerica.countryCount}カ国・{latinAmerica.count}件
              </span>
            </Link>

            <Link href="/africa-middle-east" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Tent className="w-24 h-24 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">アフリカ・中東</h3>
              <span className="inline-block bg-white/80 text-amber-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm backdrop-blur-sm">
                {africaMiddleEast.countryCount}カ国・{africaMiddleEast.count}件
              </span>
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">よく探される都市</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            「バンコク 日本語 病院」「シカゴ 日本人 クリニック」のように、都市名から個別ページへ進めます
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getPopularCities().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border bg-white px-4 py-4 hover:shadow-md transition-shadow"
              >
                <p className="font-bold">{item.displayCity}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {COUNTRY_JA_MAP[item.country] || item.country} ・ {item.count}件
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">よくある質問</h2>
          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border bg-slate-50/70 p-5">
                <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
