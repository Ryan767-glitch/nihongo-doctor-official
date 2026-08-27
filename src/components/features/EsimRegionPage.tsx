import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Globe2, ShieldCheck, Smartphone } from 'lucide-react';
import {
    ESIM_OFFERS,
    ESIM_PIXELS,
    type EsimRegion,
    arukikataHref,
    japanGlobalHref,
} from '@/lib/affiliates';
import type { EsimRegionConfig } from '@/lib/esim-regions';
import { ESIM_REGIONS } from '@/lib/esim-regions';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

function OfferCard({
    name,
    short,
    note,
    href,
    recommended,
}: {
    name: string;
    short: string;
    note: string;
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
            <h3 className="text-lg font-bold text-slate-800">{name}</h3>
            <p className="mt-1 text-sm font-medium text-[#1aa3c7]">{short}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{note}</p>
            <a
                href={href}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="mt-4 inline-flex items-center rounded-full bg-[#1aa3c7] px-5 py-3 text-sm font-semibold text-white"
            >
                {name}の公式を見る
            </a>
        </article>
    );
}

export function EsimRegionPage({ region }: { region: EsimRegion }) {
    const config: EsimRegionConfig = ESIM_REGIONS[region];
    const heroSrc = region === 'africa' ? '/esim/africa-coverage.jpg' : '/esim/hospital-search.jpg';
    const otherRegions = Object.values(ESIM_REGIONS).filter((r) => r.slug !== region);

    return (
        <div className="relative container mx-auto max-w-4xl px-4 py-8">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '海外eSIM', href: '/esim' },
                    { name: config.label, href: `/esim/${region}` },
                ])}
            />
            <JsonLd data={faqJsonLd(config.faqs)} />

            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">トップ</Link>
                <span>/</span>
                <Link href="/esim" className="hover:text-primary">海外eSIM</Link>
                <span>/</span>
                <Link href={config.continentHref} className="hover:text-primary">{config.continentLabel}</Link>
                <span>/</span>
                <span className="text-foreground">{config.label}</span>
            </div>

            <article className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                <p className="mb-3">
                    <span className="inline-block rounded bg-[#1aa3c7] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">PR</span>
                    <span className="ml-2 text-xs text-slate-500">広告を含みます</span>
                </p>
                <h1 className="mb-6 border-b pb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                    {config.title}
                </h1>
                <p className="mb-8 leading-relaxed text-gray-600">{config.intro}</p>

                <figure className="mb-10 overflow-hidden rounded-xl border border-slate-100">
                    <Image
                        src={heroSrc}
                        alt={`${config.continentLabel}で通信を確保して病院を探すイメージ`}
                        width={1200}
                        height={675}
                        className="h-auto w-full"
                        priority
                    />
                    <figcaption className="bg-slate-50 px-4 py-2 text-xs text-slate-500">
                        {config.heroCaption}
                    </figcaption>
                </figure>

                <section className="mb-12">
                    <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                        <Smartphone className="mr-2 h-6 w-6 text-[#1aa3c7]" />
                        病院検索の前にeSIMを入れる理由
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">{config.why}</p>
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
                        {config.continentLabel}向けeSIMの選び方
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-cyan-100 bg-gradient-to-b from-cyan-50/50 to-white p-5">
                            <h3 className="mb-2 font-bold text-gray-800">周遊する人</h3>
                            <p className="text-sm text-gray-600">{config.chooseTour}</p>
                        </div>
                        <div className="rounded-xl border border-cyan-100 bg-gradient-to-b from-cyan-50/50 to-white p-5">
                            <h3 className="mb-2 font-bold text-gray-800">現地で日本語サポートが欲しい人</h3>
                            <p className="text-sm text-gray-600">{config.chooseSupport}</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">比較：いま掲載できる{config.continentLabel}向けeSIM</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <OfferCard
                            name={ESIM_OFFERS.japanGlobal.name}
                            short={config.jgShort}
                            note={ESIM_OFFERS.japanGlobal.note}
                            href={japanGlobalHref(region)}
                            recommended
                        />
                        <OfferCard
                            name={ESIM_OFFERS.arukikata.name}
                            short={ESIM_OFFERS.arukikata.short}
                            note={ESIM_OFFERS.arukikata.note}
                            href={arukikataHref(region)}
                            recommended
                        />
                        <OfferCard
                            name={ESIM_OFFERS.trifa.name}
                            short={ESIM_OFFERS.trifa.short}
                            note={ESIM_OFFERS.trifa.note}
                            href={ESIM_OFFERS.trifa.href}
                        />
                        <OfferCard
                            name={ESIM_OFFERS.saily.name}
                            short={ESIM_OFFERS.saily.short}
                            note={ESIM_OFFERS.saily.note}
                            href={ESIM_OFFERS.saily.href}
                            recommended
                        />
                        <OfferCard
                            name={ESIM_OFFERS.tora.name}
                            short={ESIM_OFFERS.tora.short}
                            note={ESIM_OFFERS.tora.note}
                            href={ESIM_OFFERS.tora.href}
                        />
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
                        病院を探す用途では、Sailyを第一候補として使えます。SailyはNord Security（NordVPN）と同じグループの海外eSIMで、アプリから渡航先を選んで購入・インストールまで完結します。
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
                                Sailyの公式から{config.continentLabel}、または滞在国を選びます。複数国を回る場合は、各国が同じプランに含まれるかを先に確認してください。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">2. 日数と容量を決めて購入する</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                地図とメッセージ中心なら数GBでも足りることが多いです。病院の予約サイトやビデオ通話を使うなら多めにします。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">3. 出発前にインストールする</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                QRまたはアプリの案内でeSIMを端末に追加します。eSIM対応かつSIMロック解除済みか、購入前に確認してください。
                            </p>
                        </li>
                        <li className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                            <h3 className="font-bold text-slate-800">4. 到着後にデータ通信をオンにする</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                現地でSailyの回線を選択し、モバイルデータとデータローミングをオンにします。つながったら、このサイトの{config.continentLabel}ページから都市を開き、日本語対応病院と緊急番号を確認します。
                            </p>
                        </li>
                    </ol>
                    <a
                        href={ESIM_OFFERS.saily.href}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-[#1aa3c7] px-6 py-3 text-sm font-semibold text-white"
                    >
                        Sailyで{config.continentLabel}向けeSIMを見る
                    </a>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">到着後の使い方</h2>
                    <div className="flex flex-wrap gap-3 text-sm">
                        {config.hospitalLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-primary hover:underline">
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/emergency" className="text-primary hover:underline">緊急時ガイド</Link>
                        <Link href="/insurance" className="text-primary hover:underline">海外保険の使い方</Link>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">他の地域のeSIM</h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                        {otherRegions.map((r) => (
                            <Link
                                key={r.slug}
                                href={`/esim/${r.slug}`}
                                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 hover:border-[#1aa3c7] hover:text-[#1aa3c7]"
                            >
                                {r.label}
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">よくある質問</h2>
                    <div className="space-y-4">
                        {config.faqs.map((faq) => (
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
