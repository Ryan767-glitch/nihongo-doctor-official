import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { getSymptomCityIndex, matchSymptom, SYMPTOMS, symptomSlug } from '@/lib/symptoms';

export const metadata: Metadata = {
    title: '症状から病院を探す｜海外で具合が悪いときの日本語対応病院',
    description:
        '発熱・腹痛・歯痛・ケガ・皮膚トラブルなど、症状別に海外で日本語が通じる病院を探せます。都市×症状ごとに受診できる医療機関と、症状別の対処法・早めに受診すべきサインをまとめています。',
    alternates: { canonical: '/symptom' },
    openGraph: {
        title: '症状から病院を探す | にほんごドクター.com',
        description: '発熱・腹痛・歯痛・ケガなど、症状別に海外で日本語が通じる病院を探せます。',
        url: `${SITE_URL}/symptom`,
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function SymptomIndexPage() {
    const cityIndex = getSymptomCityIndex();
    const symptomGroups = SYMPTOMS.map((def) => {
        const cities = [...cityIndex.values()]
            .map((city) => ({
                city,
                count: city.clinics.filter((c) => matchSymptom(c, def)).length,
            }))
            .filter((item) => item.count > 0)
            .sort((a, b) => b.count - a.count);
        return { def, cities, total: cities.reduce((sum, item) => sum + item.count, 0) };
    }).filter((group) => group.cities.length > 0);

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '症状から探す', href: '/symptom' },
                ])}
            />
            <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <span className="text-foreground">症状から探す</span>
                </div>

                <header className="mb-10 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">症状から病院を探す</h1>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                        海外で具合が悪くなったとき、「どの病院に行けばいいか」は症状で決まります。
                        発熱・腹痛・歯痛・ケガなどの症状別に、日本語が通じる受診先を都市ごとにまとめました。
                        各ページには、受診前の対処法と早めに受診すべきサインも掲載しています。
                    </p>
                </header>

                <div className="space-y-10">
                    {symptomGroups.map(({ def, cities, total }) => (
                        <section key={def.key} className="rounded-3xl border bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                            <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                <h2 className="text-xl font-bold text-foreground">{def.title}</h2>
                                <span className="text-sm text-muted-foreground">{cities.length}都市・{total}件</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{def.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {cities.map(({ city, count }) => (
                                    <Link
                                        key={city.slug}
                                        href={`/symptom/${symptomSlug(city.slug, def.key)}`}
                                        className="rounded-full border bg-slate-50/70 px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors"
                                    >
                                        {city.displayCity}
                                        <span className="text-muted-foreground ml-1">{count}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-10 rounded-2xl border bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-600">
                    <p>
                        命に関わる症状・意識がない・激しい出血などの緊急時は、病院を探す前に
                        <Link href="/emergency" className="text-primary hover:underline mx-1">現地の緊急番号</Link>
                        に連絡してください。現在地の近くから探す場合は
                        <Link href="/nearby" className="text-primary hover:underline mx-1">現在地から探す</Link>
                        が便利です。
                    </p>
                </section>
            </div>
        </>
    );
}
