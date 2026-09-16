import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Pill, Smartphone, Wifi } from 'lucide-react';
import { EposCardCta } from '@/components/features/EposCardCta';
import { EsimCta } from '@/components/features/EsimCta';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: '海外旅行前の準備チェックリスト｜保険・通信・クレカ・常備薬',
    description:
        '海外で病気やケガをしたときに困らないための出発前チェックリスト。海外旅行保険・eSIM通信・クレジットカード付帯保険・常備薬・翻訳手段の準備をまとめています。',
    alternates: { canonical: '/guide/prepare' },
    openGraph: {
        title: '海外旅行前の準備チェックリスト | にほんごドクター.com',
        description: '海外で病気やケガをしたときに困らないための出発前チェックリスト。',
        url: `${SITE_URL}/guide/prepare`,
        locale: 'ja_JP',
        type: 'article',
    },
};

const faqs = [
    {
        question: 'クレジットカード付帯の保険だけで足りますか？',
        answer: 'カード付帯保険は「利用付帯」（旅行代金をそのカードで払った場合のみ）のものが多く、補償額も限られます。エポスカードのように持っているだけで自動付帯するカードは例外です。補償額が心配な場合は、別途海外旅行保険との併用が安心です。',
    },
    {
        question: 'eSIMはどのタイミングで買えばいいですか？',
        answer: '出発前にオンラインで購入し、空港または機内でインストール設定するのが確実です。到着後に現地SIMを探すより、着いた瞬間から地図・病院検索・保険デスク連絡が使える状態にしておくのが安全です。',
    },
    {
        question: '常備薬はどこまで持っていけますか？',
        answer: '解熱剤・胃腸薬・絆創膏などの市販薬は個人使用分なら問題ないことが多いですが、成分によっては国ごとに規制があります（特に向精神薬・咳止め）。処方薬は英文の処方箋や医師の証明書があると安心です。',
    },
];

export default function PrepareGuidePage() {
    const path = '/guide/prepare';
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: 'ガイド', href: '/guide' },
                    { name: '出発前の準備チェックリスト', href: path },
                ])}
            />
            <JsonLd data={faqJsonLd(faqs)} />

            <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <Link href="/guide" className="hover:text-primary transition-colors">ガイド</Link>
                    <span>/</span>
                    <span className="text-foreground">出発前の準備</span>
                </div>

                <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                        出発前の準備チェックリスト
                    </h1>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        海外での病気・ケガへの備えは、出発前の30分で完了します。
                        保険・通信・支払い手段・常備薬の4点を確認してください。
                    </p>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <CreditCard className="w-6 h-6 text-red-500 mr-2" />
                            1. 海外旅行保険の手当て
                        </h2>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            海外の医療費は国によって初診だけで数万円になることがあります。
                            選択肢は「損害保険会社の海外旅行保険」と「クレジットカード付帯保険」の2つ。
                            カード付帯は無料ですが、旅行代金をそのカードで払う必要がある「利用付帯」が多い点に注意してください。
                        </p>
                        <EposCardCta />
                        <div className="mt-4 text-sm text-gray-600">
                            <p className="mb-2">補償額を厚くしたい場合は損保系の海外旅行保険を検討してください:</p>
                            <ul className="space-y-1.5 ml-4">
                                <li>
                                    <a href="https://tabiho.jp/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">t@biho たびほ</a>
                                </li>
                                <li>
                                    <a href="https://www.aig.co.jp/sonpo/personal/product/travel" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AIG 海外旅行保険</a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <Smartphone className="w-6 h-6 text-cyan-500 mr-2" />
                            2. 通信手段（eSIM・WiFi）
                        </h2>
                        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                            病院を探す・保険デスクに連絡する・地図を見る。体調不良時ほど通信が必要です。
                            到着直後からつながるeSIMを出発前に入れておくか、空港でレンタルWiFiを受け取る方法があります。
                        </p>
                        <EsimCta continentSlug="asia" />
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <Pill className="w-6 h-6 text-green-500 mr-2" />
                            3. 常備薬と書類
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                                <h3 className="font-bold text-gray-800 text-sm mb-3">持っておくと安心な薬</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {['解熱・鎮痛剤（使い慣れたもの）', '胃腸薬・整腸剤', '絆創膏・消毒液', 'かゆみ止め・虫刺され薬', 'マスク'].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                                <h3 className="font-bold text-gray-800 text-sm mb-3">スマホに保存しておく情報</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {['保険証券・保険会社の連絡先（オフラインで見れる形で）', 'パスポートの顔写真ページの写真', '服用中の薬・既往症の英語メモ', '行き先の日本語対応病院ページ', '大使館の連絡先'].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <Wifi className="w-6 h-6 text-purple-500 mr-2" />
                            4. 翻訳・コミュニケーション手段
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            日本語対応病院が見つからない都市では、翻訳アプリ（Google翻訳の会話モード・カメラ翻訳）が最低限の備えです。
                            医療機関での使用は、症状を書き出して見せる方式が確実です。翻訳デバイス（ポケトーク等）をレンタルする方法もあります。
                        </p>
                        <p className="text-sm text-gray-600">
                            当サイトの<Link href="/phrases" className="text-primary hover:underline">医療フレーズ集</Link>は
                            症状を外国語で伝えるための定型文を掲載しています。オフラインでも見られるようブックマークしておくと安心です。
                        </p>
                    </section>

                    <section className="rounded-xl border bg-gray-50 p-5">
                        <h2 className="font-bold text-gray-800 mb-3">出発前チェックまとめ</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>・海外旅行保険 or 保険付帯クレカを1つ用意した</li>
                            <li>・eSIMまたはWiFiの手配を済ませた</li>
                            <li>・保険会社の連絡先をスマホに保存した</li>
                            <li>・常備薬と既往症メモを用意した</li>
                            <li>・行き先の日本語対応病院をブックマークした</li>
                        </ul>
                    </section>
                </article>
            </div>
        </>
    );
}
