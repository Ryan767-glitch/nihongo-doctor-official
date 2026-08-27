import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { ESIM_REGIONS } from '@/lib/esim-regions';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: '海外eSIM｜病院を探す前に通信を確保',
    description:
        'アジア・北米・ヨーロッパ・オセアニア・中南米・アフリカで日本語対応病院を探す前に、到着直後の通信を確保する海外eSIMの選び方。',
    alternates: { canonical: '/esim' },
    openGraph: {
        title: '海外eSIM｜病院を探す前に通信を確保',
        description: '渡航先別に、病院検索と相性の良い海外eSIMを比較します。',
        url: `${SITE_URL}/esim`,
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function EsimIndexPage() {
    const regions = Object.values(ESIM_REGIONS);
    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">トップ</Link>
                <span>/</span>
                <span className="text-foreground">海外eSIM</span>
            </div>

            <article className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                <p className="mb-3">
                    <span className="inline-block rounded bg-[#1aa3c7] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">PR</span>
                    <span className="ml-2 text-xs text-slate-500">広告を含みます</span>
                </p>
                <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                    <Smartphone className="h-7 w-7 text-[#1aa3c7]" />
                    海外eSIM｜病院を探す前に通信を確保
                </h1>
                <p className="mb-8 leading-relaxed text-gray-600">
                    日本語が通じる病院を探すとき、地図・翻訳・保険デスク連絡は通信が前提です。
                    渡航先の地域を選んで、いま提携中の海外eSIMを比較できます。
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    {regions.map((region) => (
                        <Link
                            key={region.slug}
                            href={`/esim/${region.slug}`}
                            className="rounded-2xl border border-slate-200 bg-gradient-to-b from-cyan-50/40 to-white p-5 transition hover:border-[#1aa3c7]"
                        >
                            <h2 className="font-bold text-slate-800">{region.label}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {region.continentLabel}の病院ページと合わせて使うeSIM比較
                            </p>
                            <span className="mt-4 inline-flex text-sm font-semibold text-[#1aa3c7]">詳しく見る →</span>
                        </Link>
                    ))}
                </div>
            </article>
        </div>
    );
}
