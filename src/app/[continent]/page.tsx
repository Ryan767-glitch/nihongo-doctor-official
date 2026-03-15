import type { Metadata } from 'next';
import clinics from '@/data/clinics.json';
import embassies from '@/data/embassies.json';
import { ClinicList } from '@/components/features/ClinicList';
import { ContinentHeader } from '@/components/features/ContinentHeader';
import { Clinic, Embassy } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const allClinics = clinics as Clinic[];
const allEmbassies = embassies as Embassy[];

interface PageProps {
    params: Promise<{ continent: string }>;
}

const continentNameMap: Record<string, string> = {
    'asia': 'Asia',
    'north-america': 'North America',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'africa': 'Africa & Middle East',
    'middle-east': 'Africa & Middle East',
    'africa-middle-east': 'Africa & Middle East',
    'south-america': 'Latin America',
    'latin-america': 'Latin America',
};

const continentDisplayMap: Record<string, string> = {
    'Asia': 'アジア',
    'North America': '北米',
    'Europe': 'ヨーロッパ',
    'Oceania': 'オセアニア',
    'Africa & Middle East': 'アフリカ・中東',
    'Latin America': '中南米',
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const continentSlug = params.continent.toLowerCase();
    const continentName = continentNameMap[continentSlug] || continentSlug;
    const displayJa = continentDisplayMap[continentName] || continentName;

    const siteUrl = 'https://nihongo-doctor.com';
    const pageUrl = `${siteUrl}/${continentSlug}`;

    return {
        title: `${displayJa}の日本語対応病院・クリニック一覧`,
        description: `${displayJa}で日本語が通じる病院、歯科、クリニックの情報を掲載。日本人医師・通訳の有無や24時間救急対応など、受診前に確認したい情報をまとめています。`,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            type: 'website',
            url: pageUrl,
            title: `${displayJa}の日本語対応病院一覧 | にほんごドクター.com`,
            description: `${displayJa}で日本語が通じる医療機関を検索できます。`,
            images: [
                {
                    url: `${siteUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `にほんごドクター.com - ${displayJa}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${displayJa}の日本語対応病院一覧 | にほんごドクター.com`,
            description: `${displayJa}で日本語が通じる医療機関を検索できます。`,
            images: [`${siteUrl}/og-image.png`],
        },
    };
}

export default async function ContinentPage(props: PageProps) {
    const params = await props.params;
    const continentSlug = params.continent.toLowerCase();

    const continentName = continentNameMap[continentSlug];
    if (!continentName) return notFound();

    const displayName = continentDisplayMap[continentName] || continentName;

    const filteredClinics = allClinics.filter(
        (clinic) => clinic.continent.toLowerCase() === continentName.toLowerCase()
    );

    const filteredEmbassies = allEmbassies.filter(
        (embassy) => embassy.region.toLowerCase() === continentName.toLowerCase()
    );

    const countryCount = new Set(filteredClinics.map((clinic) => clinic.country)).size;
    const clinicCount = filteredClinics.length;

    const siteUrl = 'https://nihongo-doctor.com';

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'にほんごドクター.com',
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: displayName,
                item: `${siteUrl}/${continentSlug}`,
            },
        ],
    };

    const directoryJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${displayName}の日本語対応病院・クリニック一覧`,
        description: `${displayName}で日本語が通じる病院、歯科、クリニックの情報一覧。`,
        url: `${siteUrl}/${continentSlug}`,
        numberOfItems: clinicCount,
        itemListElement: filteredClinics.slice(0, 10).map((clinic, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: clinic.nameEn || clinic.nameJa,
            url: `${siteUrl}/${continentSlug}?highlight=${clinic.id}`,
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryJsonLd) }} />
            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <span className="text-foreground">{displayName}</span>
                </div>

                <ContinentHeader displayName={displayName} />

                <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="font-bold text-slate-700 flex items-center gap-2">
                            {displayName}の日本語対応医療機関
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            出典: 外務省「世界の医療事情」（2024年調査時点）ほか
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <span className="block text-xs text-muted-foreground">掲載国数</span>
                            <span className="text-xl font-bold text-primary">{countryCount}<span className="text-xs font-normal">カ国</span></span>
                        </div>
                        <div className="text-center pl-4 border-l border-slate-200">
                            <span className="block text-xs text-muted-foreground">掲載機関数</span>
                            <span className="text-xl font-bold text-primary">{clinicCount}<span className="text-xs font-normal">件</span></span>
                        </div>
                    </div>
                </div>

                <ClinicList clinics={filteredClinics} embassies={filteredEmbassies} />
            </div>
        </>
    );
}
