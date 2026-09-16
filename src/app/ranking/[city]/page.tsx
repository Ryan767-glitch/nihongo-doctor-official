import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award } from 'lucide-react';
import { ClinicCard } from '@/components/features/ClinicCard';
import { JsonLd } from '@/components/features/JsonLd';
import { clinicHighlights, getRankingCity, getRankingParams, rankClinics } from '@/lib/ranking';
import { breadcrumbJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo';
import { getSymptomLinksForCity } from '@/lib/symptoms';
import { stringToColor } from '@/lib/utils';

interface PageProps {
    params: Promise<{ city: string }>;
}

export function generateStaticParams() {
    return getRankingParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { city: citySlug } = await params;
    const city = getRankingCity(citySlug);
    if (!city) return { title: 'ページが見つかりません' };
    const title = `${city.displayCity}の日本語対応病院おすすめランキング`;
    const description = `${city.countryJa}・${city.displayCity}の日本語が通じる病院・クリニック${city.clinics.length}件を、日本語診察の有無・24時間救急・キャッシュレス対応などで比較したおすすめ一覧。`;
    const path = `/ranking/${citySlug}`;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: `${title} | にほんごドクター.com`,
            description,
            url: `${SITE_URL}${path}`,
            locale: 'ja_JP',
            type: 'website',
        },
    };
}

const RANK_STYLES = [
    'bg-amber-400 text-white',
    'bg-slate-400 text-white',
    'bg-amber-700 text-white',
];

export default async function RankingPage({ params }: PageProps) {
    const { city: citySlug } = await params;
    const city = getRankingCity(citySlug);
    if (!city) return notFound();
    const path = `/ranking/${citySlug}`;
    const ranked = rankClinics(city.clinics);
    const symptoms = getSymptomLinksForCity(city.slug);
    const title = `${city.displayCity}の日本語対応病院おすすめランキング`;

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '都市別ランキング', href: '/ranking' },
                    { name: city.displayCity, href: path },
                ])}
            />
            <JsonLd data={itemListJsonLd(title, `${city.displayCity}の日本語対応病院ランキング`, path, ranked)} />

            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <Link href="/ranking" className="hover:text-primary transition-colors">都市別ランキング</Link>
                    <span>/</span>
                    <span className="text-foreground">{city.displayCity}</span>
                </div>

                <header className="mb-8 max-w-3xl">
                    <p className="text-sm font-semibold text-primary mb-1">{city.countryJa}・{city.displayCity}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{title}</h1>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                        {city.displayCity}に掲載されている日本語対応の医療機関{city.clinics.length}件を、
                        「日本語で診察できるか」「24時間救急対応か」「海外旅行保険のキャッシュレス提携があるか」
                        などの条件で比較し、旅行者が迷ったときに選びやすい順に並べました。
                    </p>
                </header>

                <section className="mb-8 rounded-2xl border bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-600">
                    <h2 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        ランキングの基準
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                        <li>・日本人医師・日本語での直接診察が可能</li>
                        <li>・24時間救急・緊急対応の有無</li>
                        <li>・海外旅行保険のキャッシュレス対応</li>
                        <li>・日本語サポートデスク・通訳の有無</li>
                    </ul>
                    <p className="mt-2 text-xs text-muted-foreground">
                        掲載情報は各医療機関の公開情報にもとづきます。対応内容は変わる場合があるため、受診前に必ず各施設へご確認ください。
                    </p>
                </section>

                <div className="space-y-6">
                    {ranked.map((clinic, index) => (
                        <div key={clinic.id} className="relative">
                            <div className={`absolute -top-3 -left-1 z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow ${RANK_STYLES[index] || 'bg-white border text-slate-600'}`}>
                                {index + 1}
                            </div>
                            <ClinicCard clinic={clinic} colorTheme={stringToColor(clinic.country)} />
                            {clinicHighlights(clinic).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2 pl-4">
                                    {clinicHighlights(clinic).map((tag) => (
                                        <span key={tag} className="rounded-full bg-primary/5 border border-primary/15 text-primary px-2.5 py-0.5 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <section className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Link href={city.cityHref} className="text-primary hover:underline">
                        {city.displayCity}の病院一覧（診療科・地図つき）
                    </Link>
                    {symptoms.slice(0, 4).map((item) => (
                        <Link key={item.def.key} href={item.href} className="text-primary hover:underline">
                            {city.displayCity}で{item.def.shortTitle}のとき
                        </Link>
                    ))}
                    <Link href="/emergency" className="text-primary hover:underline">
                        {city.countryJa}の緊急番号
                    </Link>
                </section>
            </div>
        </>
    );
}
