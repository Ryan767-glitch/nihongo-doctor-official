import Link from 'next/link';
import { DirectoryCopy } from '@/lib/seo';

export function DirectoryIntro({
    copy,
    emergencyHref = '/emergency',
    embassyHref = '/embassy',
    nearbyHref = '/nearby',
}: {
    copy: DirectoryCopy;
    emergencyHref?: string;
    embassyHref?: string;
    nearbyHref?: string;
}) {
    return (
        <div className="mb-8 space-y-6">
            <div className="space-y-3 text-[15px] leading-relaxed text-slate-600">
                {copy.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
            </div>

            {copy.decisions.length > 0 && (
                <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                    <p className="text-sm font-semibold text-slate-800 mb-3">症状・状況別の目安</p>
                    <ul className="space-y-2.5">
                        {copy.decisions.map((item) => (
                            <li key={item.when} className="text-sm leading-relaxed text-slate-700">
                                <span className="font-semibold text-sky-900">{item.when}</span>
                                <span className="text-muted-foreground"> → </span>
                                <span>{item.then}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-[11px] text-muted-foreground mt-3">
                        目安であり、特定の病院を推奨するものではありません。受診前に各施設へご確認ください。
                    </p>
                </div>
            )}

            {(copy.specialtyLabels.length > 0 || copy.emergencyClinicCount > 0) && (
                <div className="flex flex-wrap gap-2">
                    {copy.specialtyLabels.map((label) => (
                        <span key={label} className="rounded-full bg-sky-50 text-sky-800 border border-sky-100 px-3 py-1 text-xs font-medium">
                            {label}
                        </span>
                    ))}
                    {copy.emergencyClinicCount > 0 && (
                        <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 text-xs font-medium">
                            24時間救急 {copy.emergencyClinicCount}件
                        </span>
                    )}
                    {copy.medicalCount > 0 && (
                        <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-medium">
                            日本語診察 {copy.medicalCount}件
                        </span>
                    )}
                </div>
            )}

            {copy.countryLinks.length > 0 && (
                <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">国から探す</p>
                    <div className="flex flex-wrap gap-2">
                        {copy.countryLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full border bg-white px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                            >
                                {item.name}
                                <span className="text-muted-foreground ml-1">{item.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {copy.cityLinks.length > 0 && (
                <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">都市から探す</p>
                    <div className="flex flex-wrap gap-2">
                        {copy.cityLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full border bg-white px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                            >
                                {item.name}
                                <span className="text-muted-foreground ml-1">{item.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {copy.relatedCityLinks.length > 0 && (
                <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">近くの都市の日本語対応病院</p>
                    <div className="flex flex-wrap gap-2">
                        {copy.relatedCityLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full border bg-white px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                            >
                                {item.name}
                                <span className="text-muted-foreground ml-1">{item.count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-3 text-sm">
                <Link href={nearbyHref} className="text-primary hover:underline">
                    現在地から近い病院
                </Link>
                <Link href={emergencyHref} className="text-primary hover:underline">
                    緊急番号を見る
                </Link>
                <Link href={embassyHref} className="text-primary hover:underline">
                    大使館・領事館
                </Link>
                <Link href="/insurance" className="text-primary hover:underline">
                    海外保険の使い方
                </Link>
                <Link href="/travel-prep" className="text-primary hover:underline">
                    渡航前の通信準備
                </Link>
            </div>
        </div>
    );
}

export function DirectoryFaq({ faqs }: { faqs: DirectoryCopy['faqs'] }) {
    if (faqs.length === 0) return null;
    return (
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
    );
}
