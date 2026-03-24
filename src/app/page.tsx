import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Map, Landmark, TreePalm, Sun, Tent } from "lucide-react";
import { GlobalSearch } from "@/components/features/GlobalSearch";
import clinicsData from "@/data/clinics.json";
import { filterJapaneseCompatibleClinics } from "@/lib/clinic-support";
import { enrichClinicsWithHoursSync } from "@/lib/clinic-hours";
import { Clinic } from "@/types";

const publishedClinics = enrichClinicsWithHoursSync(filterJapaneseCompatibleClinics(clinicsData as Clinic[]));
const totalCount = publishedClinics.length;
const totalCountries = new Set(publishedClinics.map((c) => c.country)).size;

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground mb-6">
            世界中で、<span className="text-primary">日本語の通じる</span>ドクターを。
          </h1>
          <p className="text-xl sm:text-2xl font-medium opacity-80 mt-4 mb-10 text-muted-foreground">
            {totalCountries}カ国以上・{totalCount}件強の日本語対応医療機関を掲載
          </p>
          <div className="mx-auto max-w-3xl mb-4">
            <GlobalSearch variant="hero" />
          </div>
          <p className="text-xs text-muted-foreground/60 text-center mt-6">
            出典：外務省『世界の医療事情』等参照
          </p>
        </div>
      </section>

      {/* Continent Selection (Grid) */}
      <section className="container mx-auto px-4 -mt-20 relative z-10 mb-20">
        <div className="bg-card rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 border border-border/50 bg-white/50 backdrop-blur-sm">
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
    </div>
  );
}
