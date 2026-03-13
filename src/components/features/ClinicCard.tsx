"use client";

import { Clinic } from '@/types';
import { MapPin, Phone, Clock, CreditCard, Stethoscope, AlertCircle, Calendar, ExternalLink, Ambulance, Info, Map, Globe } from 'lucide-react';
import { checkIsOpen } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { COUNTRY_MAP, COUNTRY_JA_MAP, SPECIALTY_MAP, CITY_MAP } from '@/lib/constants';

interface ClinicCardProps {
    clinic: Clinic;
    colorTheme?: string;
    isHighlighted?: boolean;
}

export function ClinicCard({ clinic, colorTheme, isHighlighted }: ClinicCardProps) {
    const { t, language } = useLanguage();
    const normalizedHoursDescription = clinic.hoursDescription?.replace(/\s+/g, '');
    const showsEmergencyHoursLabel =
        !!normalizedHoursDescription && /24.*救急|救急.*24/.test(normalizedHoursDescription);

    const translateCountry = (c: string) => {
        if (language === 'ja') {
            return COUNTRY_JA_MAP[c] || c;
        }
        return COUNTRY_MAP[c] || c;
    };

    const translateCity = (c: string) => {
        if (language === 'ja') return c;
        // Handle composite like "マイアミ/フロリダ"
        if (CITY_MAP[c]) return CITY_MAP[c];
        const parts = c.split(/[\/\uff0f]/);
        const translatedParts = parts.map(p => CITY_MAP[p.trim()] || p.trim());
        return translatedParts.join(' / ');
    };

    const translateSpecialty = (s: string) => {
        if (language === 'ja') return s;
        if (SPECIALTY_MAP[s]) return SPECIALTY_MAP[s];
        const entries = Object.entries(SPECIALTY_MAP);
        entries.sort((a, b) => b[0].length - a[0].length);
        for (const [key, val] of entries) {
            if (s.includes(key)) return val;
        }
        return s;
    };

    const parseName = (name: string) => {
        const match = name.match(/^(.*?)[\uff08\(](.*?)[\uff09\)]$/);
        if (match) {
            return { en: match[1].trim(), ja: match[2].trim() };
        }
        return { en: name, ja: name };
    };

    let primaryName = '';
    let secondaryName: string | null = null;

    if (language === 'ja') {
        const parsed = parseName(clinic.nameJa);
        primaryName = parsed.ja;
        if (parsed.ja === clinic.nameJa) primaryName = clinic.nameJa;
        if (parsed.en !== parsed.ja) secondaryName = parsed.en;
        else if (clinic.nameEn && clinic.nameEn !== clinic.nameJa) secondaryName = clinic.nameEn;
    } else {
        const parsed = parseName(clinic.nameJa);
        primaryName = clinic.nameEn || parsed.en;
        if ((!clinic.nameEn || clinic.nameEn === clinic.nameJa) && parsed.en !== parsed.ja) {
            primaryName = parsed.en;
        }
        if (parsed.ja !== parsed.en) secondaryName = parsed.ja;
        else if (clinic.nameJa !== primaryName) secondaryName = clinic.nameJa;
    }

    const isOpen = checkIsOpen(clinic.openingHours);

    const getJapaneseSupportSummary = (details?: string) => {
        if (!details) return null;
        if (language === 'ja') return details;

        const features = [];
        if (details.includes('医師') || details.includes('Dr')) features.push('Japanese Doctor');
        if (details.includes('看護師') || details.includes('Nurse')) features.push('Japanese Nurse');
        if (details.includes('通訳') || details.includes('interpreter')) features.push('Interpreter Available');
        if (details.includes('スタッフ')) features.push('Japanese Staff');
        if (details.includes('キャッシュレス')) features.push('Cashless OK');
        if (details.includes('日本語')) features.push('Japanese Speaking');

        return features.length > 0 ? features.join(', ') : 'Japanese Support Available';
    };

    const supportSummary = getJapaneseSupportSummary(clinic.japaneseSupportDetails);

    const displayNotes = language === 'ja'
        ? clinic.notes
        : (clinic.notes && !/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(clinic.notes) ? clinic.notes : null);

    const borderColorClass = colorTheme ? colorTheme.split(' ')[0].replace('bg-', 'border-t-') : '';
    const highlightClass = isHighlighted ? 'ring-4 ring-primary bg-primary/5 transition-all duration-1000' : 'ring-1 ring-slate-100 bg-card';

    return (
        <div id={`clinic-${clinic.id}`} className={`rounded-3xl p-6 flex flex-col gap-4 group transition-all hover:shadow-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] flex-1 h-full ${colorTheme ? `border-t-[4px] ${borderColorClass}` : ''} ${highlightClass}`}>
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {translateCountry(clinic.country)} / {translateCity(clinic.city)}
                        </span>

                        {clinic.openingHours ? (
                            isOpen ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                    {t('診療中', 'Open Now')}
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                                    {t('診療時間外', 'Closed')}
                                </span>
                            )
                        ) : clinic.hoursDescription && !(clinic.emergencyAvailable && showsEmergencyHoursLabel) ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 truncate max-w-[200px]" title={clinic.hoursDescription}>
                                <Clock className="w-3 h-3" />
                                {clinic.hoursDescription}
                            </span>
                        ) : null}

                        {clinic.emergencyAvailable && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                <Ambulance className="w-3 h-3" />
                                {t('24時間救急', '24H Emergency')}
                            </span>
                        )}

                        {clinic.cashlessAvailable && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <CreditCard className="w-3 h-3" />
                                {t('キャッシュレス', 'Cashless')}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                {clinic.website ? (
                                    <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                        {primaryName}
                                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                                    </a>
                                ) : (
                                    primaryName
                                )}
                            </h3>
                            {secondaryName && (
                                <p className="text-sm text-muted-foreground mt-0.5">{secondaryName}</p>
                            )}
                        </div>
                        {clinic.supportLevel === 'medical' && (
                            <span className="shrink-0 bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded-full font-bold border border-emerald-200">
                                {t('日本語診察', 'Japanese Doctor')}
                            </span>
                        )}
                        {clinic.supportLevel === 'support' && (
                            <span className="shrink-0 bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-bold border border-blue-200">
                                {t('日本語サポート', 'Japanese Support')}
                            </span>
                        )}
                        {clinic.supportLevel === 'none' && (
                            <span className="shrink-0 bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-bold border border-slate-200">
                                {t('英語対応', 'English Only')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3 text-sm flex-1 mt-2">
                {supportSummary && (
                    <div className="bg-muted p-3 rounded-lg text-muted-foreground text-xs leading-relaxed">
                        <span className="font-semibold text-foreground flex items-center gap-1 mb-1">
                            <Info className="w-3 h-3" /> {t('日本語対応', 'Japanese Support')}:
                        </span>
                        {supportSummary}
                    </div>
                )}

                <div className="flex items-start gap-2.5 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
                    <a
                        href={clinic.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                    >
                        {clinic.address}
                    </a>
                </div>

                {clinic.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                            href={`tel:${clinic.phoneClean || clinic.phone}`}
                            className="hover:text-primary hover:underline"
                        >
                            {clinic.phone}
                        </a>
                    </div>
                )}

                {clinic.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {clinic.specialties.map((s, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-border rounded-md text-xs text-muted-foreground">
                                {translateSpecialty(s)}
                            </span>
                        ))}
                    </div>
                )}

                {displayNotes && (
                    <p className="text-xs text-muted-foreground italic border-t border-border pt-2 mt-2">
                        {t('備考', 'Note')}: {displayNotes}
                    </p>
                )}

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "MedicalClinic",
                            "name": primaryName,
                            "alternateName": secondaryName,
                            "address": clinic.address,
                            "telephone": clinic.phone,
                            "url": clinic.website,
                            "publicAccess": true,
                            "isAccessibleForFree": false,
                            "availableService": {
                                "@type": "MedicalProcedure",
                                "name": "Medical Consultation"
                            }
                        })
                    }}
                />
            </div>

            <div className="mt-auto flex gap-2 pt-3">
                {clinic.phone && (
                    <a
                        href={`tel:${clinic.phoneClean || clinic.phone}`}
                        className="flex-1 inline-flex justify-center items-center gap-1.5 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98] min-h-[48px]"
                        aria-label={t(`電話をかける: ${clinic.phone}`, `Call: ${clinic.phone}`)}
                    >
                        <Phone className="w-4 h-4" />
                        {t('電話', 'Call')}
                    </a>
                )}

                {clinic.website && (
                    <a
                        href={clinic.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex justify-center items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 py-3 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-all shadow-sm active:scale-[0.98] min-h-[48px]"
                        aria-label={t('公式サイト', 'Website')}
                    >
                        <Globe className="w-4 h-4" />
                        {t('WEB', 'Web')}
                    </a>
                )}

                {clinic.googleMapsUrl && (
                    <a
                        href={clinic.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex justify-center items-center gap-1.5 bg-white border border-border text-foreground py-3 rounded-xl text-sm font-semibold hover:bg-muted transition-all shadow-sm active:scale-[0.98] min-h-[48px]"
                        aria-label={t('Googleマップ', 'Map')}
                    >
                        <Map className="w-4 h-4 text-primary" />
                        {t('地図', 'Map')}
                    </a>
                )}
            </div>
        </div>
    );
}
