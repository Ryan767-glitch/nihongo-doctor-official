import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { NearbyClinics } from '@/components/features/NearbyClinics';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from '@/lib/seo';

const title = '現在地から近い日本語対応病院';
const description =
    'いまいる場所から近い、海外の日本語対応病院・クリニックを探します。「近くの病院」「現在地 病院」で探している旅行者向けです。位置情報は距離計算だけに使い、サーバーには送りません。';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/nearby' },
    openGraph: {
        title: `${title} | にほんごドクター.com`,
        description,
        url: `${SITE_URL}/nearby`,
        locale: 'ja_JP',
        type: 'website',
    },
};

const faqs = [
    {
        question: '位置情報はサーバーに送られますか？',
        answer: 'いいえ。ブラウザ内で距離を計算するだけです。許可できない場合は、都市名から探すこともできます。',
    },
    {
        question: '日本語が通じる病院だけ出ますか？',
        answer: 'このサイトに掲載している日本語対応の病院・クリニックだけを距離順に並べます。現地の一般病院すべてではありません。',
    },
    {
        question: '緊急のときはこれを使えばいいですか？',
        answer: '命に関わる症状は、まずその国の救急番号へ連絡してください。近くの病院検索は、緊急でない受診先を探すためのものです。',
    },
];

export default function NearbyPage() {
    return (
        <div className="container mx-auto max-w-5xl py-10 px-4">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '現在地から近い病院', href: '/nearby' },
                ])}
            />
            <JsonLd data={faqJsonLd(faqs)} />
            <h1 className="text-3xl font-bold mb-3">現在地から近い日本語対応病院</h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
                いまいる場所、または都市名から、日本語が通じる病院を近い順に出します。位置情報はブラウザ内だけで距離計算に使い、サーバーには送りません。
            </p>
            <p className="text-sm text-slate-600 mb-8">
                都市名が分かっている場合は
                <Link href="/" className="text-primary hover:underline mx-1">トップの都市一覧</Link>
                か、
                <Link href="/emergency" className="text-primary hover:underline">緊急時ガイド</Link>
                も使えます。
            </p>
            <Suspense fallback={<div className="h-40 rounded-2xl bg-slate-50 animate-pulse" />}>
                <NearbyClinics />
            </Suspense>
            <section className="mt-12 border-t pt-8">
                <h2 className="text-xl font-bold mb-4">よくある質問</h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="rounded-2xl border bg-slate-50/70 p-4">
                            <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
