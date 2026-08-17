import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClinicDirectory, continentLabel } from '@/components/features/ClinicDirectory';
import { DirectoryFaq, DirectoryIntro } from '@/components/features/DirectoryIntro';
import { JsonLd } from '@/components/features/JsonLd';
import {
    findCity,
    findCountry,
    getCityClinics,
    getCityParams,
    getEmbassiesForCountry,
} from '@/lib/catalog';
import { CONTINENT_NAME_BY_SLUG, getCityDisplayName, getCityHref, getCountryHref } from '@/lib/slugs';
import { breadcrumbJsonLd, buildCityCopy, countryLabel, faqJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo';

interface PageProps {
    params: Promise<{ continent: string; country: string; city: string }>;
}

export function generateStaticParams() {
    return getCityParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent, country, city } = await params;
    const continentName = CONTINENT_NAME_BY_SLUG[continent];
    const countryName = continentName ? findCountry(continentName, country) : null;
    const cityName = continentName && countryName ? findCity(continentName, countryName, city) : null;
    if (!continentName || !countryName || !cityName) return {};
    const clinics = getCityClinics(continentName, countryName, cityName);
    const copy = buildCityCopy({
        continentName,
        countryName,
        cityName,
        clinics,
        embassies: getEmbassiesForCountry(countryName),
    });
    const path = getCityHref(continentName, countryName, cityName);
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

export default async function CityPage({ params }: PageProps) {
    const { continent, country, city } = await params;
    const continentName = CONTINENT_NAME_BY_SLUG[continent];
    if (!continentName) return notFound();
    const countryName = findCountry(continentName, country);
    if (!countryName) return notFound();
    const cityName = findCity(continentName, countryName, city);
    if (!cityName) return notFound();

    const clinics = getCityClinics(continentName, countryName, cityName);
    const embassies = getEmbassiesForCountry(countryName);
    const copy = buildCityCopy({ continentName, countryName, cityName, clinics, embassies });
    const path = getCityHref(continentName, countryName, cityName);
    const cityLabel = getCityDisplayName(cityName);
    const countryJa = countryLabel(countryName);
    const countryHref = getCountryHref(continentName, countryName);

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: continentLabel(continentName), href: `/${continent}` },
                    { name: countryJa, href: countryHref },
                    { name: cityLabel, href: path },
                ])}
            />
            <JsonLd data={itemListJsonLd(copy.title, copy.description, path, clinics)} />
            <JsonLd data={faqJsonLd(copy.faqs)} />
            <ClinicDirectory
                title={copy.h1}
                description={`${countryJa}・${cityLabel}の日本語対応病院を、診療科・救急・連絡先つきで掲載しています`}
                clinics={clinics}
                embassies={embassies}
                crumbs={[
                    { href: '/', label: 'トップ' },
                    { href: `/${continent}`, label: continentLabel(continentName) },
                    { href: countryHref, label: countryJa },
                    { label: cityLabel },
                ]}
                countryCount={1}
                clinicCount={clinics.length}
                intro={<DirectoryIntro copy={copy} />}
                footer={<DirectoryFaq faqs={copy.faqs} />}
            />
        </>
    );
}
