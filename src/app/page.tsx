import Link from "next/link";
import {
  Ambulance,
  ArrowRight,
  Building2,
  GraduationCap,
  Landmark,
  Map,
  Sun,
  Tent,
  TreePalm,
  Briefcase,
  Plane,
} from "lucide-react";
import { GlobalSearch } from "@/components/features/GlobalSearch";
import clinicsData from "@/data/clinics.json";

function getContinentStats(continentName: string) {
  const filtered = clinicsData.filter((c) => c.continent === continentName);
  const countries = new Set(filtered.map((c) => c.country));
  return { count: filtered.length, countryCount: countries.size };
}

const quickGuides = [
  {
    title: "旅行中の方へ",
    description: "発熱・腹痛・けがなど、滞在先で急いで受診先を探したいときに。",
    href: "/emergency",
    cta: "救急・緊急情報を見る",
    icon: Plane,
    tone: "from-sky-50 to-white border-sky-100 text-sky-900",
  },
  {
    title: "駐在・海外勤務の方へ",
    description: "継続通院や家族の受診先、都市ごとの医療機関を探したい方に。",
    href: "/asia",
    cta: "地域から探す",
    icon: Briefcase,
    tone: "from-emerald-50 to-white border-emerald-100 text-emerald-900",
  },
  {
    title: "留学・帯同中の方へ",
    description: "初診先や相談先を探したいとき、日本語で受診できる候補を確認。",
    href: "/insurance",
    cta: "保険・受診情報を見る",
    icon: GraduationCap,
    tone: "from-amber-50 to-white border-amber-100 text-amber-900",
  },
];

const quickActions = [
  { label: "今すぐ探す", href: "/asia", icon: ArrowRight },
  { label: "救急対応から探す", href: "/emergency", icon: Ambulance },
  { label: "大使館情報を見る", href: "/embassy", icon: Building2 },
];

export default function Home() {
  const asia = getContinentStats("Asia");
  const northAmerica = getContinentStats("North America");
  const europe = getContinentStats("Europe");
  const oceania = getContinentStats("Oceania");
  const latinAmerica = getContinentStats("Latin America");
  const africaMiddleEast = getContinentStats("Africa & Middle East");
  const totalCount = clinicsData.length;
  const totalCountries = new Set(clinicsData.map((c) => c.country)).size;

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground mb-6">
            海外で体調を崩したとき、
            <span className="text-primary">日本語で相談できる</span>
            受診先を探せます
          </h1>

          <p className="text-lg sm:text-xl font-medium opacity-90 mt-4 mb-4 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            旅行・駐在・留学先で使える、日本語対応クリニック検索サイトです。
            国・都市・症状や条件から、受診先候補をすばやく確認できます。
          </p>

          <p className="text-sm sm:text-base text-muted-foreground/80 mb-10">
            現在、
            <span className="font-semibold text-foreground">{totalCountries}カ国</span>
            ・
            <span className="font-semibold text-foreground">{totalCount}件</span>
            の日本語対応医療機関を掲載
          </p>

          <div className="mx-auto max-w-3xl mb-5">
            <GlobalSearch variant="hero" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {action.label}
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
            {quickGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${guide.tone} border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-bold mb-2">{guide.title}</p>
                      <p className="text-sm leading-6 text-slate-600">{guide.description}</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-3 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {guide.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground/60 text-center mt-6">
            出典：外務省「世界の医療事情」等の公開情報をもとに作成
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-20 relative z-10 mb-20">
        <div className="bg-card rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 border border-border/50 bg-white/50 backdrop-blur-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              地域から探す
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              渡航先・滞在先の地域から、日本語対応の病院・クリニックを探せます。
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
