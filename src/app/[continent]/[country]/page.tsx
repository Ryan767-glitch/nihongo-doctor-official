import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClinicDirectory, continentLabel } from '@/components/features/ClinicDirectory';
import { DirectoryFaq, DirectoryIntro } from '@/components/features/DirectoryIntro';
import { JsonLd } from '@/components/features/JsonLd';
import {
    findCountry,
    getCountryClinics,
    getCountryParams,
    getEmbassiesForCountry,
} from '@/lib/catalog';
import { CONTINENT_NAME_BY_SLUG, getCountryHref } from '@/lib/slugs';
import { breadcrumbJsonLd, buildCountryCopy, countryLabel, faqJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo';

interface PageProps {
    params: Promise<{ continent: string; country: string }>;
}

export function generateStaticParams() {
    return getCountryParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent, country } = await params;
    const continentName = CONTINENT_NAME_BY_SLUG[continent];
    const countryName = continentName ? findCountry(continentName, country) : null;
    if (!continentName || !countryName) return {};
    const clinics = getCountryClinics(continentName, countryName);
    const copy = buildCountryCopy({
        continentName,
        countryName,
        clinics,
        embassies: getEmbassiesForCountry(countryName),
    });
    const path = getCountryHref(continentName, countryName);
    return {
        title: copy.title,
        description: copy.description,
        alternates: { canonical: path },
        openGraph: {
            title: `${copy.title} | にほんごドクター.com`,
            description: copy.description,
            url: `${SITE_URL}${path}`,
            locale: 'ja_JP',
            type: 'website',
        },
    };
}

export default async function CountryPage({ params }: PageProps) {
    const { continent, country } = await params;
    const continentName = CONTINENT_NAME_BY_SLUG[continent];
    if (!continentName) return notFound();
    const countryName = findCountry(continentName, country);
    if (!countryName) return notFound();

    const clinics = getCountryClinics(continentName, countryName);
    const embassies = getEmbassiesForCountry(countryName);
    const copy = buildCountryCopy({ continentName, countryName, clinics, embassies });
    const countryJa = countryLabel(countryName);
    const path = getCountryHref(continentName, countryName);

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: continentLabel(continentName), href: `/${continent}` },
                    { name: countryJa, href: path },
                ])}
            />
            <JsonLd data={itemListJsonLd(copy.title, copy.description, path, clinics)} />
            <JsonLd data={faqJsonLd(copy.faqs)} />
            <ClinicDirectory
                title={copy.h1}
                description={`${countryJa}の日本語対応病院を都市別・診療科別に探せます`}
                clinics={clinics}
                embassies={embassies}
                crumbs={[
                    { href: '/', label: 'トップ' },
                    { href: `/${continent}`, label: continentLabel(continentName) },
                    { label: countryJa },
                ]}
                countryCount={1}
                clinicCount={clinics.length}
                intro={<DirectoryIntro copy={copy} />}
                footer={<DirectoryFaq faqs={copy.faqs} />}
            />
        </>
    );
}
