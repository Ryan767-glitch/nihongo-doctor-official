import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Ambulance, Clock, ExternalLink, MapPin, Phone, Shield } from 'lucide-react';
import { ClinicCard } from '@/components/features/ClinicCard';
import { OpenStatusDot } from '@/components/features/OpenStatusDot';
import {
    findClinicBySlugs,
    getClinicParams,
    getEmbassiesForCountry,
    getRelatedClinics,
} from '@/lib/catalog';
import {
    CONTINENT_JA,
    displayClinicName,
    getCityHref,
    getClinicHref,
    getCountryHref,
} from '@/lib/slugs';
import { breadcrumbJsonLd, clinicPageCopy, medicalClinicJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/features/JsonLd';
import { stringToColor } from '@/lib/utils';

interface PageProps {
    params: Promise<{ continent: string; country: string; city: string; clinic: string }>;
}

export function generateStaticParams() {
    return getClinicParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent, country, city, clinic } = await params;
    const record = findClinicBySlugs(continent, country, city, clinic);
    if (!record) return {};
    const name = displayClinicName(record);
    const copy = clinicPageCopy(record, name);
    const path = getClinicHref(record);
    return {
        title: copy.title,
        description: copy.description,
        alternates: { canonical: path },
        openGraph: {
            title: `${copy.title} | にほんごドクター.com`,
            description: copy.description,
            url: `${SITE_URL}${path}`,
            locale: 'ja_JP',
            type: 'article',
        },
    };
}

export default async function ClinicPage({ params }: PageProps) {
    const { continent, country, city, clinic } = await params;
    const record = findClinicBySlugs(continent, country, city, clinic);
    if (!record) return notFound();

    const name = displayClinicName(record);
    const copy = clinicPageCopy(record, name);
    const countryJa = copy.countryJa;
    const cityLabel = copy.city;
    const related = getRelatedClinics(record);
    const embassies = getEmbassiesForCountry(record.country);
    const path = getClinicHref(record);
    const cityHref = getCityHref(record.continent, record.country, record.city);
    const countryHref = getCountryHref(record.continent, record.country);

    return (
        <div className="container mx-auto max-w-5xl py-10 px-4">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: CONTINENT_JA[record.continent], href: `/${continent}` },
                    { name: countryJa, href: countryHref },
                    { name: cityLabel, href: cityHref },
                    { name, href: path },
                ])}
            />
            <JsonLd data={medicalClinicJsonLd(record, name, path)} />

            <div className="text-xs sm:text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2 break-keep">
                <Link href="/" className="hover:text-primary">トップ</Link>
                <span>/</span>
                <Link href={`/${continent}`} className="hover:text-primary">{CONTINENT_JA[record.continent]}</Link>
                <span>/</span>
                <Link href={countryHref} className="hover:text-primary">{countryJa}</Link>
                <span>/</span>
                <Link href={cityHref} className="hover:text-primary">{cityLabel}</Link>
                <span>/</span>
                <span className="text-foreground">{name}</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <OpenStatusDot clinic={record} size="md" />
                    {record.supportLevel === 'medical' && (
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">日本語診察</span>
                    )}
                    {record.supportLevel === 'support' && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">日本語サポート</span>
                    )}
                    {record.emergencyAvailable && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                            <Ambulance className="w-3 h-3" /> 24時間救急
                        </span>
                    )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 break-keep">{name}</h1>
                {record.nameEn && record.nameEn !== name && (
                    <p className="text-muted-foreground mb-2">{record.nameEn}</p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {countryJa}・{cityLabel}にある日本語対応の医療機関です。
                    {record.japaneseSupportDetails ? `${record.japaneseSupportDetails}。` : ''}
                    受診前に予約の要否と保険の使い方を、電話または公式サイトで確認してください。
                </p>

                <div className="grid gap-4 text-sm">
                    {record.japaneseSupportDetails && (
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="font-semibold text-slate-700 mb-1">日本語対応</p>
                            <p className="text-slate-600 leading-relaxed">{record.japaneseSupportDetails}</p>
                        </div>
                    )}

                    <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                        <div>
                            <p>{record.address}</p>
                            <p className="text-muted-foreground">{countryJa} / {cityLabel}</p>
                        </div>
                    </div>

                    {record.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-primary" />
                            <a href={`tel:${record.phoneClean || record.phone}`} className="hover:text-primary hover:underline">
                                {record.phone}
                            </a>
                        </div>
                    )}

                    {(record.hoursDescription || record.openingHours) && (
                        <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 mt-0.5 text-primary" />
                            <div>
                                <p>{record.hoursDescription || '公式サイトで診療時間をご確認ください'}</p>
                                {(record.hoursVerifiedAt || record.lastReviewedAt) && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        最終確認: {record.hoursVerifiedAt || record.lastReviewedAt}
                                        {record.hoursSourceType === 'official_website' ? '（公式サイト）' : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {record.specialties?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {record.specialties.map((specialty) => (
                                <span key={specialty} className="px-2 py-1 bg-slate-50 border rounded-md text-xs text-slate-600">
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    )}

                    {record.notes && (
                        <p className="text-sm text-muted-foreground border-t pt-3">備考: {record.notes}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
                    {record.phone && (
                        <a href={`tel:${record.phoneClean || record.phone}`} className="inline-flex justify-center items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold min-h-[48px]">
                            <Phone className="w-4 h-4" /> 電話する
                        </a>
                    )}
                    {record.website && (
                        <a href={record.website} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold min-h-[48px]">
                            <ExternalLink className="w-4 h-4" /> 公式サイト
                        </a>
                    )}
                    {record.googleMapsUrl && (
                        <a href={record.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 border px-5 py-3 rounded-xl font-semibold min-h-[48px]">
                            <MapPin className="w-4 h-4" /> 地図
                        </a>
                    )}
                </div>
            </div>

            {embassies.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" /> この国の大使館・領事館
                    </h2>
                    <div className="grid gap-3">
                        {embassies.map((embassy) => (
                            <a
                                key={embassy.name}
                                href={embassy.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border rounded-2xl p-4 hover:bg-slate-50"
                            >
                                <p className="font-semibold">{embassy.name}</p>
                                <p className="text-sm text-muted-foreground">{embassy.address}</p>
                                <p className="text-sm mt-1">{embassy.phone}</p>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {related.length > 0 && (
                <section className="mt-10">
                    <h2 className="text-xl font-bold mb-4">{cityLabel}のほかの日本語対応医療機関</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {related.map((item) => (
                            <ClinicCard key={item.id} clinic={item} colorTheme={stringToColor(item.country)} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
