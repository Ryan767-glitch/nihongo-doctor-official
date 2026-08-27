import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EsimRegionPage } from '@/components/features/EsimRegionPage';
import { ESIM_REGIONS, ESIM_REGION_SLUGS, isEsimRegion } from '@/lib/esim-regions';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ region: string }> };

export function generateStaticParams() {
    return ESIM_REGION_SLUGS.map((region) => ({ region }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { region } = await params;
    if (!isEsimRegion(region)) return {};
    const config = ESIM_REGIONS[region];
    return {
        title: config.title,
        description: config.description,
        alternates: { canonical: `/esim/${region}` },
        openGraph: {
            title: config.title,
            description: config.description,
            url: `${SITE_URL}/esim/${region}`,
            locale: 'ja_JP',
            type: 'article',
            images: [
                {
                    url: `${SITE_URL}${region === 'africa' ? '/esim/africa-coverage.jpg' : '/esim/hospital-search.jpg'}`,
                    width: 1200,
                    height: 675,
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const { region } = await params;
    if (!isEsimRegion(region)) notFound();
    return <EsimRegionPage region={region} />;
}
