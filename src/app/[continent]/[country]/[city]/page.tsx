import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClinicDirectory, continentLabel } from '@/components/features/ClinicDirectory';
import { DirectoryFaq, DirectoryIntro } from '@/components/features/DirectoryIntro';
import { AffiliateStrip } from '@/components/features/AffiliateStrip';
import { JsonLd } from '@/components/features/JsonLd';
import {
    findCity,
    findCountry,
    getCityClinics,
    getCityParams,
    getCountryClinics,
    getEmbassiesForCountry,
} from '@/lib/catalog';
import { CONTINENT_NAME_BY_SLUG, getCityDisplayName, getCityHref, getCountryHref } from '@/lib/slugs';
import {
    breadcrumbJsonLd,
    buildCityCopy,
    countryLabel,
    faqJsonLd,
    itemListJsonLd,
    pageSocialMeta,
} from '@/lib/seo';

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
    if (!continentName || !countryName || !cityName) return { robots: { index: false, follow: false } };
    const clinics = getCityClinics(continentName, countryName, cityName);
    const copy = buildCityCopy({
        continentName,
        countryName,
        cityName,
        clinics,
        embassies: getEmbassiesForCountry(countryName),
        countryClinics: getCountryClinics(continentName, countryName),
    });
    const path = getCityHref(continentName, countryName, cityName);
    const social = pageSocialMeta(copy.title, copy.description, path);
    return {
        title: copy.title,
        description: copy.description,
        alternates: { canonical: path },
        ...social,
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
    const countryClinics = getCountryClinics(continentName, countryName);
    const embassies = getEmbassiesForCountry(countryName);
    const copy = buildCityCopy({
        continentName,
        countryName,
        cityName,
        clinics,
        embassies,
        countryClinics,
    });
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
                listHeading={`${cityLabel}の日本語対応医療機関`}
                showCountryCount={false}
                intro={<DirectoryIntro copy={copy} />}
                afterList={<AffiliateStrip compact title="渡航先で病院を探す前の通信手段" />}
                footer={<DirectoryFaq faqs={copy.faqs} />}
            />
        </>
    );
}
