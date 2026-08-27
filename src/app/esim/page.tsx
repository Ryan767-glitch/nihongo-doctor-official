import type { Metadata } from 'next';
import Link from 'next/link';
import { ESIM_OFFERS, ESIM_PIXELS } from '@/lib/affiliates';
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

const OFFERS = [
    { offer: ESIM_OFFERS.saily, recommended: true },
    { offer: ESIM_OFFERS.arukikata, recommended: true },
    { offer: ESIM_OFFERS.japanGlobal, recommended: true },
    { offer: ESIM_OFFERS.trifa, recommended: false },
    { offer: ESIM_OFFERS.tora, recommended: false },
] as const;

export default function EsimIndexPage() {
    const regions = Object.values(ESIM_REGIONS);
    return (
        <div className="relative container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">トップ</Link>
                <span>/</span>
                <span className="text-foreground">eSIM</span>
            </div>

            <article className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                <p className="mb-3">
                    <span className="inline-block rounded bg-[#1aa3c7] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">PR</span>
                    <span className="ml-2 text-xs text-slate-500">広告を含みます</span>
                </p>
                <h1 className="mb-6 border-b pb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                    海外eSIM｜病院を探す前に通信を確保
                </h1>
                <p className="mb-10 leading-relaxed text-gray-600">
                    日本語が通じる病院を探すとき、地図・翻訳・保険デスク連絡は通信が前提です。
                    下の公式リンクから渡航先のeSIMを選び、到着後にこのサイトで病院を検索できます。
                </p>

                <section className="mb-12">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">いま使える海外eSIM</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {OFFERS.map(({ offer, recommended }) => (
                            <article
                                key={offer.id}
                                className={`flex flex-col rounded-2xl border p-5 ${recommended ? 'border-cyan-200 bg-cyan-50/40' : 'border-slate-200 bg-white'}`}
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    {recommended && (
                                        <span className="rounded-full bg-[#1aa3c7] px-2 py-0.5 text-[10px] font-bold text-white">おすすめ</span>
                                    )}
                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">PR</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{offer.name}</h3>
                                <p className="mt-1 text-sm font-medium text-[#1aa3c7]">{offer.short}</p>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{offer.note}</p>
                                <a
                                    href={offer.href}
                                    target="_blank"
                                    rel="nofollow sponsored noopener noreferrer"
                                    className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1aa3c7] px-5 py-3 text-sm font-semibold text-white"
                                >
                                    {offer.name}の公式を見る
                                </a>
                            </article>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                        料金・対応国・速度制限は変更されます。購入前に各公式ページで渡航国が含まれているか確認してください。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">渡航先から選ぶ</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {regions.map((region) => (
                            <Link
                                key={region.slug}
                                href={`/esim/${region.slug}`}
                                className="rounded-2xl border border-slate-200 bg-gradient-to-b from-cyan-50/40 to-white p-5 transition hover:border-[#1aa3c7]"
                            >
                                <h3 className="font-bold text-slate-800">{region.label}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {region.continentLabel}の病院ページと合わせて使うeSIM比較
                                </p>
                                <span className="mt-4 inline-flex text-sm font-semibold text-[#1aa3c7]">詳しく見る →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border border-amber-100 bg-amber-50/60 p-5 text-sm text-slate-600">
                    <h2 className="mb-2 font-bold text-slate-800">広告・アフィリエイト表記</h2>
                    <p className="leading-relaxed">
                        このページの外部リンクの一部はA8.netのアフィリエイトリンクです。リンク経由で商品が購入された場合、当サイトが紹介料を受け取ることがあります。料金は利用者負担にはなりません。
                    </p>
                </section>
            </article>

            {ESIM_PIXELS.map((src) => (
                <img key={src} src={src} width={1} height={1} alt="" className="absolute h-px w-px opacity-0" />
            ))}
        </div>
    );
}
