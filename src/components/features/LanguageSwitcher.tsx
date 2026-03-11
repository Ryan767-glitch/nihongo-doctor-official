"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language } = useLanguage();

    return (
        <button
            onClick={() => { }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-medium transition-colors cursor-not-allowed opacity-50"
            aria-label="Switch Language (Coming Soon)"
            disabled
        >
            <Globe className="w-4 h-4 text-primary" />
            <span>{language === 'ja' ? 'English' : '日本語'}</span>
        </button>
    );
}
