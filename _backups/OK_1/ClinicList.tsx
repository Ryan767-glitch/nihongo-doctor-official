"use client";

import React, { useState, useMemo } from 'react';
import { Clinic, Embassy } from '@/types';
import { ClinicCard } from '@/components/features/ClinicCard';
import { Building, CreditCard, Ambulance, Info, Clock } from 'lucide-react';
import { checkIsOpen } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { COUNTRY_MAP } from '@/lib/constants';

interface ClinicListProps {
    clinics: Clinic[];
    embassies: Embassy[];
}

export function ClinicList({ clinics, embassies }: ClinicListProps) {
    const { t, language } = useLanguage();

    const translateCountry = (c: string) => {
        if (language === 'ja') return c;
        return COUNTRY_MAP[c] || c;
    };
    const [filterEmergency, setFilterEmergency] = useState(false);
    const [filterCashless, setFilterCashless] = useState(false);
    const [filterJapanese, setFilterJapanese] = useState(false);
    const [filterOpenNow, setFilterOpenNow] = useState(false);

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
    const countries = Array.from(new Set(filteredClinics.map(c => c.country)));

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
                    {t('診療中', 'Open Now')}
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
                        className="ml-auto text-xs text-muted-foreground hover:text-foreground underline"
                    >
                        {t('条件をクリア', 'Clear all')}
                    </button>
                )}
            </div>

            {countries.length === 0 ? (
                <div className="p-10 text-center border rounded-xl bg-card">
                    <p className="text-muted-foreground">{t('条件に一致するクリニックが見つかりませんでした。', 'No clinics found matching your filters.')}</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {countries.map(country => {
                        const countryClinics = filteredClinics.filter(c => c.country === country);
                        const countryEmbassies = embassies.filter(e => e.country === country);

                        return (
                            <section key={country} className="space-y-6">
                                <div className="flex items-baseline justify-between border-b pb-2">
                                    <h2 className="text-2xl font-semibold text-foreground">{translateCountry(country)}</h2>
                                    <span className="text-sm text-muted-foreground">{countryClinics.length} {t('件', 'clinics')}</span>
                                </div>

                                {/* Embassy Alert / Info Section - Always show unless verified empty */}
                                {countryEmbassies.map((embassy, idx) => (
                                    <div key={idx} className="bg-amber-50/50 border border-amber-200/60 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center text-amber-900 mb-4">
                                        <div className="bg-amber-100 p-2 rounded-full">
                                            <Building className="w-4 h-4 text-amber-700" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm">{embassy.name}</h3>
                                            <p className="text-xs mt-1 text-amber-800/80">{embassy.address} • {embassy.phone}</p>
                                        </div>
                                        <div className="flex gap-3 text-sm font-medium">
                                            <a href={embassy.website} target="_blank" className="hover:text-amber-700 transition-colors">{t('ウェブサイト', 'Website')}</a>
                                            {embassy.alertFeedUrl && (
                                                <>
                                                    <span className="text-amber-300">|</span>
                                                    <a href={embassy.alertFeedUrl} target="_blank" className="hover:text-amber-700 flex items-center gap-1 transition-colors">
                                                        {t('安全情報', 'Safety Info')} →
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {countryClinics.map(clinic => (
                                        <ClinicCard key={clinic.id} clinic={clinic} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
