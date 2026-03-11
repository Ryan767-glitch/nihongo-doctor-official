"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { stringToColor } from "@/lib/utils";
import { COUNTRY_JA_MAP } from "@/lib/constants";

interface CountrySelectorProps {
    countries: { name: string; count: number }[];
    onSelect: (country: string) => void;
    activeCountry: string | null;
}

export function CountrySelector({ countries, onSelect, activeCountry }: CountrySelectorProps) {
    const { t, language } = useLanguage();

    const translateCountry = (c: string) => {
        if (language === 'ja') {
            return COUNTRY_JA_MAP[c] || c;
        }
        return c;
    };

    return (
        <div className="w-full pb-4">
            <div className="flex flex-wrap gap-2">
                {countries.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => onSelect(c.name)}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border
              ${activeCountry === c.name
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                            }
            `}
                    >
                        {translateCountry(c.name)}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCountry === c.name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {c.count}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
