import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClinicDirectory, continentLabel } from '@/components/features/ClinicDirectory';
import {
    findCountry,
    getCountryClinics,
    getCountryParams,
    getEmbassiesForCountry,
} from '@/lib/catalog';
import { CONTINENT_NAME_BY_SLUG, getCountryHref } from '@/lib/slugs';
import { COUNTRY_JA_MAP } from '@/lib/constants';

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
    const countryJa = COUNTRY_JA_MAP[countryName] || countryName;
    return {
        title: `${countryJa}の日本語対応病院・クリニック一覧`,
        description: `${countryJa}で日本語が通じる病院・クリニックを掲載。日本人医師・通訳の有無、24時間救急、連絡先をまとめています。`,
        alternates: { canonical: getCountryHref(continentName, countryName) },
    };
}

export default async function CountryPage({ params }: PageProps) {
    const { continent, country } = await params;
    const continentName = CONTINENT_NAME_BY_SLUG[continent];
    if (!continentName) return notFound();
    const countryName = findCountry(continentName, country);
    if (!countryName) return notFound();

    const clinics = getCountryClinics(continentName, countryName);
    const countryJa = COUNTRY_JA_MAP[countryName] || countryName;

    return (
        <ClinicDirectory
            title={countryJa}
            description={`${countryJa}で日本語が通じる医療機関を掲載しています`}
            clinics={clinics}
            embassies={getEmbassiesForCountry(countryName)}
            crumbs={[
                { href: '/', label: 'トップ' },
                { href: `/${continent}`, label: continentLabel(continentName) },
                { label: countryJa },
            ]}
            countryCount={1}
            clinicCount={clinics.length}
        />
    );
}
