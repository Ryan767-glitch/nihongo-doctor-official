import { MetadataRoute } from 'next';
import { publishedClinics } from '@/lib/catalog';
import { getCityHref, getClinicHref, getCountryHref } from '@/lib/slugs';

const SITE_URL = 'https://nihongo-doctor.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/nearby',
        '/asia',
        '/north-america',
        '/europe',
        '/oceania',
        '/latin-america',
        '/africa-middle-east',
        '/emergency',
        '/phrases',
        '/embassy',
        '/insurance',
        '/contact',
        '/privacy',
        '/terms',
        '/disclaimer',
    ].map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: path === '/emergency' || path === '/nearby' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.startsWith('/asia') || path === '/nearby' ? 0.9 : 0.7,
    }));

    const countrySeen = new Set<string>();
    const citySeen = new Set<string>();
    const countryRoutes: MetadataRoute.Sitemap = [];
    const cityRoutes: MetadataRoute.Sitemap = [];

    for (const clinic of publishedClinics) {
        const countryHref = getCountryHref(clinic.continent, clinic.country);
        if (!countrySeen.has(countryHref)) {
            countrySeen.add(countryHref);
            countryRoutes.push({
                url: `${SITE_URL}${countryHref}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: 0.85,
            });
        }
        const cityHref = getCityHref(clinic.continent, clinic.country, clinic.city);
        if (!citySeen.has(cityHref)) {
            citySeen.add(cityHref);
            cityRoutes.push({
                url: `${SITE_URL}${cityHref}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        }
    }

    const clinicRoutes = publishedClinics.map((clinic) => ({
        url: `${SITE_URL}${getClinicHref(clinic)}`,
        lastModified: clinic.hoursVerifiedAt ? new Date(clinic.hoursVerifiedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...countryRoutes, ...cityRoutes, ...clinicRoutes];
}
