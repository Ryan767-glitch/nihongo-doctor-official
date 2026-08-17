import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClinicDirectory, continentLabel } from '@/components/features/ClinicDirectory';
import {
    findCity,
    findCountry,
    getCityClinics,
    getCityParams,
    getEmbassiesForCountry,
} from '@/lib/catalog';
import { CONTINENT_NAME_BY_SLUG, getCityDisplayName, getCityHref, getCountryHref } from '@/lib/slugs';
import { COUNTRY_JA_MAP } from '@/lib/constants';

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
    const countryJa = COUNTRY_JA_MAP[countryName] || countryName;
    const cityLabel = getCityDisplayName(cityName);
    return {
        title: `${cityLabel}の日本語対応病院・クリニック一覧`,
        description: `${countryJa}・${cityLabel}で日本語が通じる病院・クリニックを掲載しています。`,
        alternates: { canonical: getCityHref(continentName, countryName, cityName) },
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
    const countryJa = COUNTRY_JA_MAP[countryName] || countryName;
    const cityLabel = getCityDisplayName(cityName);

    return (
        <ClinicDirectory
            title={cityLabel}
            description={`${countryJa}・${cityLabel}で日本語が通じる医療機関を掲載しています`}
            clinics={clinics}
            embassies={getEmbassiesForCountry(countryName)}
            crumbs={[
                { href: '/', label: 'トップ' },
                { href: `/${continent}`, label: continentLabel(continentName) },
                { href: getCountryHref(continentName, countryName), label: countryJa },
                { label: cityLabel },
            ]}
            countryCount={1}
            clinicCount={clinics.length}
        />
    );
}
