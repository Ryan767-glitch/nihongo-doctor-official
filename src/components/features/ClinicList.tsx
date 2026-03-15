"use client";

import React, { useState, useMemo } from 'react';
import { Clinic, Embassy } from '@/types';
import { ClinicCard } from '@/components/features/ClinicCard';
import { Building, CreditCard, Ambulance, Info, Clock, AlertTriangle } from 'lucide-react';
import { checkIsOpen, stringToColor } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { COUNTRY_MAP, COUNTRY_JA_MAP } from '@/lib/constants';
import { CountrySelector } from './CountrySelector';
import { useSearchParams } from 'next/navigation';

interface ClinicListProps {
    clinics: Clinic[];
    embassies: Embassy[];
}

export function ClinicList({ clinics, embassies }: ClinicListProps) {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const highlightId = searchParams.get('highlight');

    const translateCountry = (c: string) => {
        if (language === 'ja') {
            return COUNTRY_JA_MAP[c] || c;
        }
        return COUNTRY_MAP[c] || c;
    };
    const [filterEmergency, setFilterEmergency] = useState(false);
    const [filterCashless, setFilterCashless] = useState(false);
    const [filterJapanese, setFilterJapanese] = useState(false);
    const [filterOpenNow, setFilterOpenNow] = useState(false);
    const [activeCountry, setActiveCountry] = useState<string | null>(null);

    // Filter Logic
    const filteredClinics = useMemo(() => {
        return clinics.filter(clinic => {
            if (filterEmergency && !clinic.emergencyAvailable) return false;
            if (filterCashless && !clinic.cashlessAvailable) return false;
            if (filterJapanese && !clinic.japaneseSupportDetails) return false;

            // Open Now Logic: Truly open via hours OR 24H Emergency
            if (filterOpenNow) {
                const isOpen = checkIsOpen(clinic.openingHours);
                if (!isOpen && !clinic.emergencyAvailable) return false;
            }

            return true;
        });
    }, [clinics, filterEmergency, filterCashless, filterJapanese, filterOpenNow]);

    // Group by Country
    const clinicsByCountry = useMemo(() => {
        const grouped: Record<string, Clinic[]> = {};
        filteredClinics.forEach(clinic => {
            if (!grouped[clinic.country]) grouped[clinic.country] = [];
            grouped[clinic.country].push(clinic);
        });
        return grouped;
    }, [filteredClinics]);

    // Sort countries
    const sortedCountries = Object.keys(clinicsByCountry).sort();

    // Prepare data for CountrySelector
    const countryStats = sortedCountries.map(c => ({
        name: c,
        count: clinicsByCountry[c].length
    }));

    const scrollToCountry = (country: string) => {
        const safeId = encodeURIComponent(country);
        const element = document.getElementById(safeId);
        if (element) {
            const headerOffset = 180; // Adjust for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveCountry(country);
        }
    };

    const scrollToCity = (country: string, city: string) => {
        const safeId = encodeURIComponent(`${country}-${city}`);
        const element = document.getElementById(safeId);
        if (element) {
            const headerOffset = 230; // Further adjust for sticky headers so it doesn't hide under the section header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    React.useEffect(() => {
        if (highlightId) {
            const element = document.getElementById(`clinic-${highlightId}`);
            if (element) {
                setTimeout(() => {
                    const headerOffset = 150;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 100); // slight delay to ensure render
            }
        }
    }, [highlightId, filteredClinics]);

    return (
        <div className="space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
                <span className="text-sm font-medium mr-2 flex items-center text-muted-foreground">{t('絞り込み:', 'Filters:')}</span>

                <button
                    onClick={() => setFilterOpenNow(!filterOpenNow)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filterOpenNow
                        ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                        : 'bg-white text-muted-foreground border hover:bg-slate-50'
                        }`}
                >
                    <Clock className="w-4 h-4" />
                    {t('今診療中', 'Open Now')}
                </button>

                <button
                    onClick={() => setFilterEmergency(!filterEmergency)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filterEmergency
                        ? 'bg-red-100 text-red-700 ring-1 ring-red-200'
                        : 'bg-white text-muted-foreground border hover:bg-slate-50'
                        }`}
                >
                    <Ambulance className="w-4 h-4" />
                    {t('24時間救急', '24H Emergency')}
                </button>

                <button
                    onClick={() => setFilterCashless(!filterCashless)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filterCashless
                        ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
                        : 'bg-white text-muted-foreground border hover:bg-slate-50'
                        }`}
                >
                    <CreditCard className="w-4 h-4" />
                    {t('キャッシュレス', 'Cashless')}
                </button>

                <button
                    onClick={() => setFilterJapanese(!filterJapanese)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filterJapanese
                        ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                        : 'bg-white text-muted-foreground border hover:bg-slate-50'
                        }`}
                >
                    <Info className="w-4 h-4" />
                    {t('日本語対応', 'Japanese Support')}
                </button>

                {(filterEmergency || filterCashless || filterJapanese || filterOpenNow) && (
                    <button
                        onClick={() => {
                            setFilterEmergency(false);
                            setFilterCashless(false);
                            setFilterJapanese(false);
                            setFilterOpenNow(false);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline ml-auto"
                    >
                        {t('リセット', 'Reset')}
                    </button>
                )}
            </div>

            {/* Country Selector (Sticky) */}
            {countryStats.length > 0 && (
                <div className="py-4 border-b border-border/40 -mx-4 px-4 md:mx-0 md:px-0">
                    <CountrySelector
                        countries={countryStats}
                        onSelect={scrollToCountry}
                        activeCountry={activeCountry}
                    />
                </div>
            )}

            {sortedCountries.length === 0 ? (
                <div className="p-10 text-center border rounded-xl bg-card">
                    <p className="text-muted-foreground">{t('条件に一致するクリニックが見つかりませんでした。', 'No clinics found matching your filters.')}</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {sortedCountries.map(country => {
                        const countryClinics = clinicsByCountry[country];
                        const countryEmbassies = embassies.filter(e => e.country === country);

                        return (
                            <section key={country} id={encodeURIComponent(country)} className="space-y-6 scroll-mt-48">
                                <div className="flex items-center gap-3 border-b border-border/60 pb-4 mb-2">
                                    <span className={`w-2 h-8 rounded-full ${stringToColor(country).split(' ')[0]}`}></span>
                                    <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
                                        {translateCountry(country)}
                                        <span className="text-sm font-medium text-muted-foreground bg-slate-100 px-3 py-1 rounded-full border">
                                            {countryClinics.length}件
                                        </span>
                                    </h2>
                                </div>

                                {countryEmbassies.length > 0 && (
                                    <div className="grid gap-3 mb-6">
                                        {countryEmbassies.map((embassy, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-xl text-sm">
                                                <div className="flex items-center gap-2 font-semibold text-amber-900 shrink-0">
                                                    <Building className="w-4 h-4" />
                                                    {embassy.name}
                                                </div>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-amber-800/80">
                                                    <a href={`tel:${embassy.phone}`} className="hover:underline flex items-center gap-1">
                                                        <span className="opacity-70 text-xs">Tel:</span> {embassy.phone}
                                                    </a>
                                                    {embassy.website && (
                                                        <a href={embassy.website} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors">{t('公式サイト', 'Website')}</a>
                                                    )}
                                                    {embassy.alertFeedUrl && (
                                                        <a href={embassy.alertFeedUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 flex items-center gap-1 transition-colors">
                                                            <AlertTriangle className="w-3 h-3" />
                                                            {t('安全情報', 'Safety Alert')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {(() => {
                                    const cities = Array.from(new Set(countryClinics.map(c => c.city).filter(Boolean))).sort();
                                    const hasSubregions = cities.length > 1;
                                    const colorTheme = stringToColor(country);

                                    return (
                                        <>
                                            {hasSubregions && (
                                                <div className="flex flex-wrap gap-2 mb-8 bg-slate-50/50 p-3 rounded-xl border border-border/40">
                                                    <span className="text-xs text-muted-foreground mr-2 py-1.5 px-1">{t('地域:', 'Regions:')}</span>
                                                    {cities.map(city => (
                                                        <button
                                                            key={city}
                                                            onClick={() => scrollToCity(country, city)}
                                                            className="text-xs bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm px-3 py-1.5 rounded-full text-slate-700 transition-all active:scale-95"
                                                        >
                                                            {city}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {hasSubregions ? (
                                                <div className="space-y-12">
                                                    {cities.map(city => {
                                                        const cityClinics = countryClinics.filter(c => c.city === city);
                                                        return (
                                                            <div key={city} id={encodeURIComponent(`${country}-${city}`)} className="scroll-mt-48">
                                                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-700">
                                                                    <div className={`w-1 h-5 rounded-full ${colorTheme.split(' ')[0]}`}></div>
                                                                    {city}
                                                                </h3>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                                                    {cityClinics.map((clinic) => (
                                                                        <ClinicCard key={clinic.id} clinic={clinic} colorTheme={colorTheme} isHighlighted={clinic.id === highlightId} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {/* Clinics without city */}
                                                    {countryClinics.filter(c => !c.city).length > 0 && (
                                                        <div id={`${country}-other`.replace(/[^a-zA-Z0-9]/g, '-')} className="scroll-mt-48 pt-6">
                                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-700">
                                                                <div className={`w-1 h-5 rounded-full ${colorTheme.split(' ')[0]}`}></div>
                                                                {t('その他', 'Other')}
                                                            </h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                                                {countryClinics.filter(c => !c.city).map((clinic) => (
                                                                    <ClinicCard key={clinic.id} clinic={clinic} colorTheme={colorTheme} isHighlighted={clinic.id === highlightId} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                                    {countryClinics.map((clinic) => (
                                                        <ClinicCard key={clinic.id} clinic={clinic} colorTheme={colorTheme} isHighlighted={clinic.id === highlightId} />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
