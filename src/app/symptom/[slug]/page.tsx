import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Phone } from 'lucide-react';
import { ClinicCard } from '@/components/features/ClinicCard';
import { DirectoryFaq } from '@/components/features/DirectoryIntro';
import { JsonLd } from '@/components/features/JsonLd';
import { findEmergencyCountry } from '@/lib/seo';
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo';
import { getSymptomLinksForCity, getSymptomPageData, getSymptomParams } from '@/lib/symptoms';
import { stringToColor } from '@/lib/utils';
import { continentLabel } from '@/components/features/ClinicDirectory';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getSymptomParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = getSymptomPageData(slug);
    if (!data) return { title: 'ページが見つかりません' };
    const { city, symptom, clinics } = data;
    const title = `${city.displayCity}で${symptom.title}に対応できる日本語病院`;
    const description = `${city.countryJa}・${city.displayCity}で${symptom.description}を${clinics.length}件掲載。${symptom.warningSigns[0]}など重い症状は早めの受診を。電話・住所・日本語対応の内容つき。`;
    const path = `/symptom/${slug}`;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: `${title} | にほんごドクター.com`,
            description,
            url: `${SITE_URL}${path}`,
            locale: 'ja_JP',
            type: 'website',
        },
    };
}

export default async function SymptomPage({ params }: PageProps) {
    const { slug } = await params;
    const data = getSymptomPageData(slug);
    if (!data) return notFound();
    const { city, symptom, clinics } = data;
    const path = `/symptom/${slug}`;
    const title = `${city.displayCity}で${symptom.title}に対応できる病院`;
    const emergency = findEmergencyCountry(city.country);
    const otherSymptoms = getSymptomLinksForCity(city.slug).filter((item) => item.def.key !== symptom.key);

    const faqs = [
        {
            question: `${city.displayCity}で${symptom.shortTitle}のとき日本語で受診できますか？`,
            answer: `はい。このページでは${city.displayCity}で${symptom.title}に対応できる日本語対応の医療機関を${clinics.length}件掲載しています。日本人医師がいる施設と、通訳・日本語サポートがある施設があります。`,
        },
        {
            question: `${symptom.shortTitle}でどのくらいの症状なら受診すべきですか？`,
            answer: `${symptom.warningSigns.slice(0, 3).join('、')}などの症状がある場合は早めの受診をおすすめします。命に関わる症状は、まず現地の救急番号へ連絡してください。`,
        },
        {
            question: `海外旅行保険は使えますか？`,
            answer: `キャッシュレス診療に対応している施設では、保険会社の提携デスク経由で自己負担なく受診できる場合があります。受診前に保険会社の連絡先へ確認してください。掲載の「キャッシュレス対応」表記も目安になります。`,
        },
    ];

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '症状から探す', href: '/symptom' },
                    { name: city.displayCity, href: city.cityHref },
                    { name: symptom.title, href: path },
                ])}
            />
            <JsonLd data={itemListJsonLd(title, `${city.displayCity}の${symptom.title}に対応する医療機関`, path, clinics)} />
            <JsonLd data={faqJsonLd(faqs)} />

            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <Link href="/symptom" className="hover:text-primary transition-colors">症状から探す</Link>
                    <span>/</span>
                    <Link href={`/${city.continentSlug}`} className="hover:text-primary transition-colors">{continentLabel(city.continent)}</Link>
                    <span>/</span>
                    <Link href={`/${city.continentSlug}/${city.countrySlug}`} className="hover:text-primary transition-colors">{city.countryJa}</Link>
                    <span>/</span>
                    <Link href={city.cityHref} className="hover:text-primary transition-colors">{city.displayCity}</Link>
                    <span>/</span>
                    <span className="text-foreground">{symptom.title}</span>
                </div>

                <header className="mb-8">
                    <p className="text-sm font-semibold text-primary mb-1">{city.countryJa}・{city.displayCity}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        {city.displayCity}で{symptom.shortTitle}のときの日本語対応病院
                    </h1>
                    <p className="text-muted-foreground mt-3">
                        {symptom.description}を{clinics.length}件掲載しています。診療科の対応は施設ごとに異なるため、受診前に電話で症状を伝えて確認してください。
                    </p>
                </header>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <section className="rounded-2xl border bg-slate-50/70 p-5">
                        <h2 className="font-bold text-slate-800 mb-3">{symptom.shortTitle}のときの対処法</h2>
                        <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                            {symptom.advice.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                            ))}
                        </div>
                    </section>
                    <section className="rounded-2xl border border-red-100 bg-red-50/60 p-5">
                        <h2 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            早めに受診すべきサイン
                        </h2>
                        <ul className="space-y-2 text-sm text-red-900/80">
                            {symptom.warningSigns.map((sign) => (
                                <li key={sign} className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                                    {sign}
                                </li>
                            ))}
                        </ul>
                        {emergency && (
                            <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-red-800">
                                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                                命に関わる場合は{city.countryJa}の緊急番号:
                                {emergency.numbers.map((n) => `${n.label} ${n.number}`).join(' / ')}
                            </p>
                        )}
                    </section>
                </div>

                <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
                    <h2 className="font-bold text-slate-700">
                        {city.displayCity}で{symptom.title}に対応できる施設
                        <span className="ml-2 text-sm font-normal text-muted-foreground">{clinics.length}件</span>
                    </h2>
                    <Link href={city.cityHref} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {city.displayCity}の全ての病院を見る
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinics.map((clinic) => (
                        <ClinicCard key={clinic.id} clinic={clinic} colorTheme={stringToColor(clinic.country)} />
                    ))}
                </div>

                {otherSymptoms.length > 0 && (
                    <section className="mt-12 border-t pt-8">
                        <h2 className="text-lg font-bold mb-3">{city.displayCity}の他の症状で探す</h2>
                        <div className="flex flex-wrap gap-2">
                            {otherSymptoms.map((item) => (
                                <Link
                                    key={item.def.key}
                                    href={item.href}
                                    className="rounded-full border bg-white px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                                >
                                    {item.def.shortTitle}
                                    <span className="text-muted-foreground ml-1">{item.count}件</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-8 rounded-2xl border bg-sky-50/60 border-sky-100 p-5 text-sm leading-relaxed text-slate-600">
                    <p>
                        海外での受診前には、海外旅行保険の「キャッシュレス提携病院」かどうかを保険会社に確認すると自己負担を抑えられます。
                        <Link href="/insurance" className="text-primary hover:underline ml-1">海外保険の使い方</Link>・
                        <Link href="/guide/sick-abroad" className="text-primary hover:underline ml-1">海外で病気になったときの対処法</Link>
                        もあわせてご確認ください。
                    </p>
                </section>

                <DirectoryFaq faqs={faqs} />
            </div>
        </>
    );
}
