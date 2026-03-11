import { MetadataRoute } from 'next';

const SITE_URL = 'https://nihongo-doctor.com';
const LAST_MODIFIED = new Date('2026-03-02');

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/asia`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/north-america`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/europe`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/oceania`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/latin-america`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/africa-middle-east`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/emergency`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/phrases`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/embassy`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/insurance`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified: LAST_MODIFIED,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ];
}
