import clinicsData from '@/data/clinics.json';
import embassiesData from '@/data/embassies.json';
import { Clinic, Embassy } from '@/types';
import { filterJapaneseCompatibleClinics } from '@/lib/clinic-support';
import { enrichClinicsWithHoursSync } from '@/lib/clinic-hours';
import {
    CONTINENT_JA,
    CONTINENT_NAME_BY_SLUG,
    displayClinicName,
    getCityDisplayName,
    getCityHref,
    getCitySlug,
    getClinicHref,
    getContinentSlug,
    getCountryHref,
    getCountrySlug,
} from '@/lib/slugs';

export const publishedClinics: Clinic[] = enrichClinicsWithHoursSync(
    filterJapaneseCompatibleClinics(clinicsData as Clinic[])
);

export const allEmbassies = embassiesData as Embassy[];

export function getPublishedStats() {
    return {
        clinicCount: publishedClinics.length,
        countryCount: new Set(publishedClinics.map((clinic) => clinic.country)).size,
    };
}

export function getContinentClinics(continentName: string) {
    return publishedClinics.filter((clinic) => clinic.continent === continentName);
}

export function findCountry(continentName: string, countrySlug: string) {
    const clinics = getContinentClinics(continentName).filter(
        (clinic) => getCountrySlug(clinic.country) === countrySlug
    );
    return clinics[0]?.country ?? null;
}

export function findCity(continentName: string, countryName: string, citySlug: string) {
    const clinics = publishedClinics.filter(
        (clinic) =>
            clinic.continent === continentName &&
            clinic.country === countryName &&
            getCitySlug(clinic.city) === citySlug
    );
    return clinics[0]?.city ?? null;
}

export function findClinicBySlugs(
    continentSlug: string,
    countrySlug: string,
    citySlug: string,
    clinicSlug: string
) {
    const continentName = CONTINENT_NAME_BY_SLUG[continentSlug];
    if (!continentName) return null;

    return (
        publishedClinics.find((clinic) => {
            const href = getClinicHref(clinic);
            return href === `/${continentSlug}/${countrySlug}/${citySlug}/${clinicSlug}`;
        }) ?? null
    );
}

export function getCountryClinics(continentName: string, countryName: string) {
    return publishedClinics.filter(
        (clinic) => clinic.continent === continentName && clinic.country === countryName
    );
}

export function getCityClinics(continentName: string, countryName: string, cityName: string) {
    return getCountryClinics(continentName, countryName).filter((clinic) => clinic.city === cityName);
}

export function getEmbassiesForCountry(countryName: string) {
    return allEmbassies.filter((embassy) => embassy.country === countryName);
}

export function getRelatedClinics(clinic: Clinic, limit = 3) {
    return getCityClinics(clinic.continent, clinic.country, clinic.city)
        .filter((item) => item.id !== clinic.id)
        .slice(0, limit);
}

export function getContinentParams() {
    return Object.keys(CONTINENT_NAME_BY_SLUG)
        .filter((slug) => !['south-america', 'africa', 'middle-east'].includes(slug))
        .map((continent) => ({ continent }));
}

export function getCountryParams() {
    const seen = new Set<string>();
    return publishedClinics.flatMap((clinic) => {
        const continent = getContinentSlug(clinic.continent);
        const country = getCountrySlug(clinic.country);
        const key = `${continent}/${country}`;
        if (seen.has(key)) return [];
        seen.add(key);
        return [{ continent, country }];
    });
}

export function getCityParams() {
    const seen = new Set<string>();
    return publishedClinics.flatMap((clinic) => {
        const continent = getContinentSlug(clinic.continent);
        const country = getCountrySlug(clinic.country);
        const city = getCitySlug(clinic.city);
        const key = `${continent}/${country}/${city}`;
        if (seen.has(key)) return [];
        seen.add(key);
        return [{ continent, country, city }];
    });
}

export function getClinicParams() {
    return publishedClinics.map((clinic) => {
        const href = getClinicHref(clinic).slice(1).split('/');
        return {
            continent: href[0],
            country: href[1],
            city: href[2],
            clinic: href[3],
        };
    });
}

export function getPopularCities() {
    const counts = new Map<string, { continent: string; country: string; city: string; count: number }>();
    for (const clinic of publishedClinics) {
        const key = `${clinic.continent}|${clinic.country}|${clinic.city}`;
        const current = counts.get(key);
        if (current) {
            current.count += 1;
        } else {
            counts.set(key, {
                continent: clinic.continent,
                country: clinic.country,
                city: clinic.city,
                count: 1,
            });
        }
    }

    const demandCities = new Set([
        'ソウル',
        'シンガポール',
        '台北',
        'ハワイ（ホノルル）',
        'バンコク',
        'ロサンゼルス',
    ]);

    return [...counts.values()]
        .sort((a, b) => {
            const demand = Number(demandCities.has(b.city)) - Number(demandCities.has(a.city));
            if (demand !== 0) return demand;
            return b.count - a.count;
        })
        .slice(0, 12)
        .map((item) => ({
            ...item,
            href: getCityHref(item.continent, item.country, item.city),
            displayCity: getCityDisplayName(item.city),
            continentJa: CONTINENT_JA[item.continent] || item.continent,
        }));
}

export function clinicToListItem(clinic: Clinic, index: number) {
    return {
        '@type': 'ListItem',
        position: index + 1,
        name: displayClinicName(clinic),
        url: `https://nihongo-doctor.com${getClinicHref(clinic)}`,
    };
}

export { getCityHref, getClinicHref, getCountryHref, displayClinicName };
