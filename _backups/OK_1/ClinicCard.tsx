"use client";

import { Clinic } from '@/types';
import { MapPin, Phone, Clock, CreditCard, Stethoscope, AlertCircle, Calendar, ExternalLink, Ambulance, Info, Map } from 'lucide-react';
import { checkIsOpen } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ClinicCardProps {
    clinic: Clinic;
}

import { COUNTRY_MAP, SPECIALTY_MAP, CITY_MAP } from '@/lib/constants';

// ...

export function ClinicCard({ clinic }: ClinicCardProps) {
    const { t, language } = useLanguage();

    const translateCountry = (c: string) => {
        if (language === 'ja') return c;
        return COUNTRY_MAP[c] || c;
    };

    const translateCity = (c: string) => {
        if (language === 'ja') return c;
        // Handle composite like "マイアミ/フロリダ"
        // Try exact match
        if (CITY_MAP[c]) return CITY_MAP[c];

        // Try splitting by slash
        const parts = c.split(/[\/\uff0f]/);
        const translatedParts = parts.map(p => CITY_MAP[p.trim()] || p.trim());
        return translatedParts.join(' / ');
    };

    const translateSpecialty = (s: string) => {
        if (language === 'ja') return s;

        // 1. Try exact match
        if (SPECIALTY_MAP[s]) return SPECIALTY_MAP[s];

        // 2. Try partial match (longest match first to avoid "内科" matching "消化器内科" incorrectly if not careful, but key-based is exact)
        // Check if any key is contained in s
        const entries = Object.entries(SPECIALTY_MAP);
        // Sort by key length desc so "消化器内科" is checked before "内科"
        entries.sort((a, b) => b[0].length - a[0].length);

        for (const [key, val] of entries) {
            if (s.includes(key)) {
                // Return just the translated part? Or try to replace?
                // For now, if it contains the key, typically that IS the specialty. 
                // e.g. "一般内科" contains "内科" -> "Internal Medicine" might be close enough, 
                // but better if we had "一般内科": "General Internal Medicine".
                // Given the messy data, simple inclusion mapping is a good fallback.
                return val;
            }
        }

        return s; // Fallback
    };

    // Helper to split "English (Japanese)"
    const parseName = (name: string) => {
        const match = name.match(/^(.*?)[\uff08\(](.*?)[\uff09\)]$/);
        if (match) {
            return { en: match[1].trim(), ja: match[2].trim() };
        }
        return { en: name, ja: name };
    };

    // Name Logic
    let primaryName = '';
    let secondaryName: string | null = null;

    if (language === 'ja') {
        const parsed = parseName(clinic.nameJa);
        primaryName = parsed.ja; // e.g. "コトビアクリニック"
        // If parsed.ja is same as original (no brackets), use original
        if (parsed.ja === clinic.nameJa) primaryName = clinic.nameJa;

        // Secondary is English part if available
        if (parsed.en !== parsed.ja) secondaryName = parsed.en;
        else if (clinic.nameEn && clinic.nameEn !== clinic.nameJa) secondaryName = clinic.nameEn;
    } else {
        // English Mode
        const parsed = parseName(clinic.nameJa); // Check JA name for brackets too
        primaryName = clinic.nameEn || parsed.en;

        // If nameEn is missing/same-as-JA, try to use parsed EN part
        if ((!clinic.nameEn || clinic.nameEn === clinic.nameJa) && parsed.en !== parsed.ja) {
            primaryName = parsed.en;
        }

        // Secondary is JA part
        if (parsed.ja !== parsed.en) secondaryName = parsed.ja;
        else if (clinic.nameJa !== primaryName) secondaryName = clinic.nameJa;
    }

    const isOpen = checkIsOpen(clinic.openingHours);




    const getEmergencyStatus = (isEmergency: boolean) => {
        if (!isEmergency) return null;
        return language === 'ja' ? '24時間救急対応' : '24H Emergency';
    };

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

    // Filter notes for English speakers
    const displayNotes = language === 'ja'
        ? clinic.notes
        : (clinic.notes && !/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(clinic.notes) ? clinic.notes : null);


    return (
        <div className="bg-card rounded-3xl p-6 flex flex-col gap-4 group transition-all hover:shadow-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] ring-1 ring-slate-100">
            <div className="flex justify-between items-start">
                <div className="w-full">
                    {/* ... (keep existing header logic) ... */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {translateCountry(clinic.country)} / {translateCity(clinic.city)}
                        </span>

                        {/* Open Status / Hours */}
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
                        ) : clinic.hoursDescription ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 truncate max-w-[200px]" title={clinic.hoursDescription}>
                                <Clock className="w-3 h-3" />
                                {clinic.hoursDescription}
                            </span>
                        ) : null}

                        {/* Emergency Tag */}
                        {clinic.emergencyAvailable && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                <Ambulance className="w-3 h-3" />
                                {t('24時間救急', '24H Emergency')}
                            </span>
                        )}

                        {/* Cashless Tag */}
                        {clinic.cashlessAvailable && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <CreditCard className="w-3 h-3" />
                                {t('キャッシュレス', 'Cashless')}
                            </span>
                        )}
                    </div>

                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-snug mb-1 flex items-center gap-2">
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
                        <p className="text-sm text-muted-foreground">{secondaryName}</p>
                    )}
                </div>
            </div>

            <div className="space-y-3 text-sm flex-1 mt-2">
                {/* Japanese Support Info */}
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
                    <div className="flex items-center gap-2.5 text-muted-foreground">
                        <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                        <a href={`tel:${clinic.phone}`} className="hover:text-primary hover:underline font-medium">
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
            </div>

            <div className="mt-auto flex gap-3 pt-3">
                <a
                    href={`tel:${clinic.phone}`}
                    className="flex-1 inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
                >
                    <Phone className="w-4 h-4" />
                    {t('電話', 'Call')}
                </a>
                <a
                    href={clinic.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center gap-2 bg-white border border-border text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-muted transition-all shadow-sm active:scale-[0.98]"
                >
                    <Map className="w-4 h-4 text-primary" />
                    {t('地図', 'Map')}
                </a>
            </div>
        </div>
    );
}
