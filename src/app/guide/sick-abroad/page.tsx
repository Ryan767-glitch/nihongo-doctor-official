import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, PhoneCall } from 'lucide-react';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: '海外で病気・ケガをしたときの対処法｜まず何をするか手順で解説',
    description:
        '海外で病気やケガをしたとき、まずやるべきことを手順で解説。保険会社への連絡、日本語が通じる病院の探し方、支払いと請求の流れ、緊急時の連絡先まで。',
    alternates: { canonical: '/guide/sick-abroad' },
    openGraph: {
        title: '海外で病気・ケガをしたときの対処法 | にほんごドクター.com',
        description: '海外で病気やケガをしたとき、まずやるべきことを手順で解説。',
        url: `${SITE_URL}/guide/sick-abroad`,
        locale: 'ja_JP',
        type: 'article',
    },
};

const faqs = [
    {
        question: '海外の病院は予約なしで受診できますか？',
        answer: '国と施設によります。救急外来のある総合病院は予約なしで受診できますが、軽症は待ち時間が長くなります。クリニックは予約制が多いため、電話で当日の受付を確認してください。',
    },
    {
        question: '海外旅行保険に入っていない場合はどうすればいいですか？',
        answer: '受診は可能ですが費用は全額自己負担になります。国によっては初診だけで数万円かかります。支払い方法はクレジットカード対応の施設を選ぶと便利です。帰国後、健康保険の「海外療養費制度」で一部払い戻しを申請できる場合があります。',
    },
    {
        question: '言葉が通じない病院しかない場合は？',
        answer: 'ホテルのコンシェルジュや大使館の医療情報リストを活用してください。このサイトでは日本語対応の医療機関を都市別に掲載しています。翻訳アプリで症状を伝える方法も有効です。',
    },
];

export default function SickAbroadGuidePage() {
    const path = '/guide/sick-abroad';
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: 'ガイド', href: '/guide' },
                    { name: '海外で病気・ケガをしたときの対処法', href: path },
                ])}
            />
            <JsonLd data={faqJsonLd(faqs)} />

            <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <Link href="/guide" className="hover:text-primary transition-colors">ガイド</Link>
                    <span>/</span>
                    <span className="text-foreground">海外で病気・ケガをしたとき</span>
                </div>

                <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                        海外で病気・ケガをしたときの対処法
                    </h1>
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        旅先での体調不良は焦りますが、やるべきことは決まっています。
                        このページでは「まず何をするか」を手順で整理しました。
                    </p>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">対応の基本フロー</h2>
                        <ol className="space-y-6">
                            {[
                                {
                                    title: '1. 危険度を判断する',
                                    body: '意識がない・激しい出血・呼吸困難・胸痛などは迷わず現地の救急番号へ。命に関わる症状に病院探しは不要です。緊急番号は国ごとに違うので緊急時ガイドで確認してください。',
                                    link: { href: '/emergency', label: '国別の緊急番号を見る' },
                                },
                                {
                                    title: '2. 保険会社に連絡する',
                                    body: '海外旅行保険（クレジットカード付帯を含む）に入っている場合、受診前に24時間サポートデスクへ電話します。提携病院を紹介してもらえれば、キャッシュレスで受診できる場合があります。',
                                    link: { href: '/insurance', label: '海外保険の使い方' },
                                },
                                {
                                    title: '3. 受診先を決める',
                                    body: '症状に合った診療科を持つ施設を選びます。日本語が通じる病院なら症状を正確に伝えられ、診断書・領収書の発行も確実です。',
                                    link: { href: '/symptom', label: '症状から病院を探す' },
                                },
                                {
                                    title: '4. 受診する',
                                    body: 'パスポート・保険証券（アプリ画面でも可）・服用中の薬リストを持参。症状の始まった時期・経過・既往症をメモしておくと診察が正確になります。',
                                    link: { href: '/phrases', label: '医療フレーズ集で症状を伝える' },
                                },
                                {
                                    title: '5. 書類を保管する',
                                    body: 'キャッシュレス提携外で支払った場合、診断書・領収書・明細は全て保管。帰国後の保険請求に必要です。支払いは可能ならクレジットカードで（記録が残るため）。',
                                },
                            ].map((step) => (
                                <li key={step.title} className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                                    <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                                    {step.link && (
                                        <Link href={step.link.href} className="inline-block mt-2 text-sm text-primary hover:underline">
                                            {step.link.label} →
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                            よくある失敗
                        </h2>
                        <div className="space-y-3">
                            {[
                                '保険デスクに連絡せず受診してしまい、キャッシュレスが使えなかった → 受診前の一報が大事です',
                                '領収書を捨ててしまい請求できない → 紙の書類は全て持ち帰りましょう',
                                '「日本語対応」と広告する施設で実際は通訳のみ → 当サイトでは日本語診察可否を施設ごとに掲載しています',
                                '市販薬で様子を見すぎて重症化 → 高熱・激痛・脱水は早めの受診を',
                            ].map((item) => (
                                <div key={item.slice(0, 20)} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <PhoneCall className="w-5 h-5 text-blue-500 mr-2" />
                            症状別の受診先
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            症状に合った診療科を持つ病院を都市別にまとめています。
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <Link href="/symptom" className="rounded-full border bg-white px-3 py-1.5 hover:border-primary hover:text-primary">
                                症状から探す（一覧）
                            </Link>
                            <Link href="/nearby" className="rounded-full border bg-white px-3 py-1.5 hover:border-primary hover:text-primary">
                                現在地から近い病院
                            </Link>
                            <Link href="/embassy" className="rounded-full border bg-white px-3 py-1.5 hover:border-primary hover:text-primary">
                                大使館・領事館
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-xl border bg-gray-50 p-5">
                        <h2 className="font-bold text-gray-800 mb-3 flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                            まとめ
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>・命に関わる症状は迷わず現地の救急番号へ</li>
                            <li>・受診前に保険会社へ連絡するとキャッシュレスの可能性が上がる</li>
                            <li>・日本語対応病院は都市・症状別にこのサイトで探せる</li>
                            <li>・診断書と領収書は全て保管して帰国後に請求</li>
                        </ul>
                    </section>
                </article>
            </div>
        </>
    );
}
