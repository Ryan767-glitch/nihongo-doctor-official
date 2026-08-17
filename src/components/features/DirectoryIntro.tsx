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
