import type { Metadata } from 'next';
import { Suspense } from 'react';
import clinics from '@/data/clinics.json';
import embassies from '@/data/embassies.json';
import { ClinicList } from '@/components/features/ClinicList';
import { ContinentHeader } from '@/components/features/ContinentHeader';
import { DirectoryFaq, DirectoryIntro } from '@/components/features/DirectoryIntro';
import { JsonLd } from '@/components/features/JsonLd';
import { Clinic, Embassy } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContinentParams } from '@/lib/catalog';
import { filterJapaneseCompatibleClinics } from '@/lib/clinic-support';
import { enrichClinicsWithHoursSync } from '@/lib/clinic-hours';
import { breadcrumbJsonLd, buildContinentCopy, faqJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo';

const allClinics = enrichClinicsWithHoursSync(filterJapaneseCompatibleClinics(clinics as Clinic[]));
const allEmbassies = embassies as Embassy[];

export function generateStaticParams() {
    return getContinentParams();
}

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

    const filtered = allClinics.filter(
        (clinic) => clinic.continent.toLowerCase() === continentName.toLowerCase()
    );
    const copy = buildContinentCopy({ continentName, clinics: filtered });
    const pageUrl = `${SITE_URL}/${continentSlug}`;

    return {
        title: copy.title,
        description: copy.description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            type: 'website',
            url: pageUrl,
            title: `${copy.title} | にほんごドクター.com`,
            description: copy.description,
            images: [
                {
                    url: `${SITE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `にほんごドクター.com - ${displayJa}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${copy.title} | にほんごドクター.com`,
            description: copy.description,
            images: [`${SITE_URL}/og-image.png`],
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

    const copy = buildContinentCopy({ continentName, clinics: filteredClinics });
    const path = `/${continentSlug}`;

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: 'にほんごドクター.com', href: '/' },
                { name: displayName, href: path },
            ])} />
            <JsonLd data={itemListJsonLd(copy.title, copy.description, path, filteredClinics)} />
            <JsonLd data={faqJsonLd(copy.faqs)} />
            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <span className="text-foreground">{displayName}</span>
                </div>

                <ContinentHeader displayName={copy.h1} description={`${displayName}の日本語対応病院を国・都市から探せます`} />
                <DirectoryIntro copy={copy} />

                <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="font-bold text-slate-700 flex items-center gap-2">
                            {displayName}の日本語対応医療機関
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            出典: 外務省「世界の医療事情」、各国大使館・総領事館、各医療機関の公開情報
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

                <Suspense fallback={<div className="h-40 rounded-2xl bg-slate-50 animate-pulse" />}>
                    <ClinicList clinics={filteredClinics} embassies={filteredEmbassies} />
                </Suspense>
                <DirectoryFaq faqs={copy.faqs} />
            </div>
        </>
    );
}
