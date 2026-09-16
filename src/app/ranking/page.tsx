import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/features/JsonLd';
import { getRankingCities } from '@/lib/ranking';
import { breadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: '都市別・日本語対応病院おすすめランキング',
    description:
        '海外の主要都市で日本語が通じる病院・クリニックを、日本語診察・24時間救急・キャッシュレス対応などの条件で比較した都市別ランキング一覧。',
    alternates: { canonical: '/ranking' },
    openGraph: {
        title: '都市別・日本語対応病院おすすめランキング | にほんごドクター.com',
        description: '海外の主要都市で日本語が通じる病院を条件別に比較したランキング一覧。',
        url: `${SITE_URL}/ranking`,
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function RankingIndexPage() {
    const cities = getRankingCities().sort((a, b) => b.clinics.length - a.clinics.length);

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '都市別ランキング', href: '/ranking' },
                ])}
            />
            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <span className="text-foreground">都市別ランキング</span>
                </div>

                <header className="mb-10 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        都市別・日本語対応病院おすすめランキング
                    </h1>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                        掲載施設が多い都市について、日本語診察の有無・24時間救急・キャッシュレス対応などの条件で
                        病院を比較したランキングをまとめています。
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/ranking/${city.slug}`}
                            className="rounded-2xl border bg-white p-5 hover:border-primary hover:shadow-md transition-all"
                        >
                            <p className="font-bold text-foreground">{city.displayCity}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                {city.countryJa}・{city.clinics.length}件を比較
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
