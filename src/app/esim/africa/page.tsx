import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Globe2, ShieldCheck, Smartphone } from 'lucide-react';
import { ESIM_OFFERS, ESIM_PIXELS } from '@/lib/affiliates';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'アフリカで使えるeSIM｜病院を探す前に通信を確保',
    description:
        'エジプト・ケニア・UAEなどアフリカ・中東で日本語対応病院を探すなら、到着前のeSIMが先です。周遊28地域のJAPAN&GLOBAL、24時間日本語サポートのトリファ、Nord Security系のSailyを比較。',
    alternates: { canonical: '/esim/africa' },
    openGraph: {
        title: 'アフリカで使えるeSIM｜病院を探す前に通信を確保',
        description:
            'アフリカ・中東で病院検索・地図・保険デスク連絡をする前に、出発前のeSIMで通信を確保する方法。',
        url: `${SITE_URL}/esim/africa`,
        locale: 'ja_JP',
        type: 'article',
        images: [{ url: `${SITE_URL}/esim/africa-coverage.jpg`, width: 1200, height: 675 }],
    },
};

const faqs = [
    {
        question: 'アフリカ旅行でeSIMは必要ですか？',
        answer:
            '空港やホテルのWi-Fiだけに頼ると、到着直後に地図・翻訳・保険デスク・病院検索が使えません。エジプト・ケニア・UAEなど日本語対応病院が少ない地域ほど、出発前にeSIMを入れておくと初動が早くなります。',
    },
    {
        question: 'アフリカ周遊と国別プラン、どちらがいいですか？',
        answer:
            '1カ国滞在ならエジプト・ケニア・UAEなどの国別プランが単純です。サファリや複数都市をまたぐなら、JAPAN&GLOBAL eSIMのアフリカ周遊28地域のように1枚で国をまたげるプランが向きます。',
    },
    {
        question: 'SailyのeSIMはどう使いますか？',
        answer:
            'Sailyの公式サイトまたはアプリで渡航先を選び、プランを購入し、案内に従ってeSIMをインストールします。到着後はモバイルデータとデータローミングをオンにし、このサイトで都市名から日本語対応病院を検索してください。',
    },
    {
        question: '病院の電話や保険デスクはeSIMで連絡できますか？',
        answer:
            '掲載している海外eSIMはデータ通信が中心です。音声番号が付かないプランでは、WhatsAppや保険会社のアプリ、メールで連絡します。緊急時は現地の救急番号を優先してください。',
    },
];

function OfferCard({
    offer,
    href,
    recommended,
}: {
    offer: (typeof ESIM_OFFERS)[keyof typeof ESIM_OFFERS];
    href: string;
    recommended?: boolean;
}) {
    return (
        <article className={`rounded-2xl border p-5 ${recommended ? 'border-cyan-200 bg-cyan-50/40' : 'border-slate-200 bg-white'}`}>
            <div className="mb-3 flex items-center gap-2">
                {recommended && (
                    <span className="rounded-full bg-[#1aa3c7] px-2 py-0.5 text-[10px] font-bold text-white">おすすめ</span>
                )}
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">PR</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">{offer.name}</h3>
            <p className="mt-1 text-sm font-medium text-[#1aa3c7]">{offer.short}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{offer.note}</p>
            <a
                href={href}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-[#1aa3c7] px-5 py-3 text-sm font-semibold text-white"
            >
                {offer.name}の公式を見る
            </a>
        </article>
    );
}

export default function AfricaEsimPage() {
    return (
        <div className="relative container mx-auto max-w-4xl px-4 py-8">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: 'アフリカ・中東', href: '/africa-middle-east' },
                    { name: 'アフリカ向けeSIM', href: '/esim/africa' },
                ])}
            />
            <JsonLd data={faqJsonLd(faqs)} />

            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">トップ</Link>
                <span>/</span>
                <Link href="/africa-middle-east" className="hover:text-primary">アフリカ・中東</Link>
                <span>/</span>
                <span className="text-foreground">アフリカ向けeSIM</span>
            </div>

            <article className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                <p className="mb-3">
                    <span className="inline-block rounded bg-[#1aa3c7] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">PR</span>
                    <span className="ml-2 text-xs text-slate-500">広告を含みます</span>
                </p>
                <h1 className="mb-6 border-b pb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                    アフリカで使えるeSIM｜病院を探す前に通信を確保
                </h1>
                <p className="mb-8 leading-relaxed text-gray-600">
                    アフリカ・中東で日本語が通じる病院は件数が限られます。カイロ、ナイロビ、ドバイで受診先を探すとき、地図・翻訳・保険会社の日本語デスクはすべて通信が前提です。
                    現地SIMを空港で探すより、出発前にeSIMを入れておく方が初動が早くなります。このページでは、当サイトのアフリカ・中東ページと合わせて使える海外eSIMを比較します。
                </p>

                <figure className="mb-10 overflow-hidden rounded-xl border border-slate-100">
                    <Image
                        src="/esim/africa-coverage.jpg"
                        alt="アフリカ・中東の主要都市に通信と病院検索のピンを置いたイメージ"
                        width={1200}
                        height={675}
                        className="h-auto w-full"
                    />
                    <figcaption className="bg-slate-50 px-4 py-2 text-xs text-slate-500">
                        エジプト・ケニア・南アフリカなど、渡航先が複数なら周遊プランを先に確認します。
                    </figcaption>
                </figure>

                <section className="mb-12">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                        <Smartphone className="mr-2 h-6 w-6 text-[#1aa3c7]" />
                        病院検索の前にeSIMを入れる理由
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                        にほんごドクター.com のアフリカ・中東ページには、エジプト、ケニア、UAEの日本語対応医療機関を掲載しています。件数が少ないからこそ、到着後すぐ都市ページを開ける状態にしておく必要があります。
                        空港Wi-Fiは混雑し、接続に時間がかかることがあります。eSIMなら搭乗前にインストールし、着陸後にモバイルデータをオンにするだけです。
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {[
                            '都市ページから日本語対応病院の電話・地図を開く',
                            '保険会社の緊急デスクへ連絡し、提携病院かを確認する',
                            '翻訳や医療フレーズ集をオフライン以外でも使う',
                            '大使館・領事館の最新案内を公式サイトで見る',
                        ].map((item) => (
                            <li key={item} className="flex items-start">
                                <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-[#1aa3c7]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                        <Globe2 className="mr-2 h-6 w-6 text-[#1aa3c7]" />
                        アフリカ向けeSIMの選び方
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-cyan-100 bg-gradient-to-b from-cyan-50/50 to-white p-5">
                            <h3 className="mb-2 font-bold text-gray-800">周遊する人</h3>
                            <p className="text-sm text-gray-600">
                                ケニアとタンザニア、エジプトと周辺国など国をまたぐなら、JAPAN&GLOBAL eSIMのアフリカ周遊28地域が候補です。国を変えるたびに買い直す手間が減ります。
                            </p>
                        </div>
                        <div className="rounded-xl border border-cyan-100 bg-gradient-to-b from-cyan-50/50 to-white p-5">
                            <h3 className="mb-2 font-bold text-gray-800">現地で日本語サポートが欲しい人</h3>
                            <p className="text-sm text-gray-600">
                                繋がらない・設定が分からないときは、24時間日本語チャットのトリファが向きます。病院を探す途中のトラブルでも日本語で聞けます。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">比較：いま掲載できるアフリカ向けeSIM</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <OfferCard offer={ESIM_OFFERS.japanGlobal} href={ESIM_OFFERS.japanGlobal.africa} recommended />
                        <OfferCard offer={ESIM_OFFERS.trifa} href={ESIM_OFFERS.trifa.href} />
                        <OfferCard offer={ESIM_OFFERS.saily} href={ESIM_OFFERS.saily.href} recommended />
                        <OfferCard offer={ESIM_OFFERS.tora} href={ESIM_OFFERS.tora.href} />
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                        料金・対応国・速度制限は変更されます。購入前に各公式ページで渡航国が含まれているか確認してください。
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                        <ShieldCheck className="mr-2 h-6 w-6 text-[#1aa3c7]" />
                        Sailyの活用方法（おすすめ）
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                        アフリカで病院を探す用途では、Sailyを第一候補として使えます。SailyはNord Security（NordVPN）と同じグループの海外eSIMで、アプリから渡航先を選んで購入・インストールまで完結します。
                        公衆Wi-Fiに頼らず、自分の回線で保険会社サイトや地図を開ける点が、受診準備と相性が良いです。
                    </p>
                    <figure className="mb-6 overflow-hidden rounded-xl border border-slate-100">
                        <Image
                            src="/esim/setup-steps.jpg"
                            alt="出発前・到着直後・病院検索の3ステップでeSIMを使う流れ"
                            width={1200}
                            height={675}
                            className="h-auto w-full"
                        />
                        <figcaption className="bg-slate-50 px-4 py-2 text-xs text-slate-500">
                            Sailyは出発前に購入し、到着後にデータ通信をオンにしてから病院検索へ進みます。
                        </figcaption>
                    </figure>
                    <ol className="mb-6 space-y-4">
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">1. 渡航先を選ぶ</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Sailyの公式からアフリカ、またはエジプト・ケニアなど滞在国を選びます。複数国を回る場合は、各国が同じプランに含まれるかを先に確認してください。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">2. 日数と容量を決めて購入する</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                地図とメッセージ中心なら数GBでも足りることが多いです。病院の予約サイト、画像の診断資料、ビデオ通話を使うなら多めにします。Sailyはアプリ内で残量を見られます。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">3. 出発前にインストールする</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                QRまたはアプリの案内でeSIMを端末に追加します。日本のキャリア回線は残したまま、海外用プロファイルを追加する形が一般的です。eSIM対応かつSIMロック解除済みか、購入前に確認してください。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">4. 到着後にデータ通信をオンにする</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                現地でSailyの回線を選択し、モバイルデータとデータローミングをオンにします。つながったら、このサイトのアフリカ・中東ページから都市を開き、日本語対応病院と緊急番号を確認します。
                            </p>
                        </li>
                    </ol>
                    <a
                        href={ESIM_OFFERS.saily.href}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-[#1aa3c7] px-6 py-3 text-sm font-semibold text-white"
                    >
                        Sailyでアフリカ向けeSIMを見る
                    </a>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">到着後の使い方</h2>
                    <figure className="mb-6 overflow-hidden rounded-xl border border-slate-100">
                        <Image
                            src="/esim/hospital-search.jpg"
                            alt="海外の街でスマートフォンから日本語対応病院を探している様子"
                            width={1200}
                            height={675}
                            className="h-auto w-full"
                        />
                        <figcaption className="bg-slate-50 px-4 py-2 text-xs text-slate-500">
                            通信が確保できたら、都市名から日本語対応病院と保険デスクを確認します。
                        </figcaption>
                    </figure>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <Link href="/africa-middle-east" className="text-primary hover:underline">アフリカ・中東の病院一覧</Link>
                        <Link href="/africa-middle-east/egypt" className="text-primary hover:underline">エジプト</Link>
                        <Link href="/africa-middle-east/kenya" className="text-primary hover:underline">ケニア</Link>
                        <Link href="/africa-middle-east/uae" className="text-primary hover:underline">UAE</Link>
                        <Link href="/emergency" className="text-primary hover:underline">緊急時ガイド</Link>
                        <Link href="/insurance" className="text-primary hover:underline">海外保険の使い方</Link>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">よくある質問</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="rounded-2xl border bg-slate-50/70 p-4">
                                <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border border-amber-100 bg-amber-50/60 p-5 text-sm text-slate-600">
                    <h2 className="mb-2 font-bold text-slate-800">広告・アフィリエイト表記</h2>
                    <p className="leading-relaxed">
                        このページの外部リンクの一部はA8.netのアフィリエイトリンクです。リンク経由で商品が購入された場合、当サイトが紹介料を受け取ることがあります。料金は利用者負担にはなりません。
                        医療情報の掲載方針は病院データベースと独立しており、報酬の有無で医療機関の順位は変えていません。対応端末・対応国・通信速度は各社の公式情報を優先してください。
                    </p>
                </section>
            </article>

            {ESIM_PIXELS.map((src) => (
                <img key={src} src={src} width={1} height={1} alt="" className="absolute h-px w-px opacity-0" />
            ))}
        </div>
    );
}
