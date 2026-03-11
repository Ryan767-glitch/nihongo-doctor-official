"use client";

import React, { createContext, useContext } from 'react';

type Language = 'ja';

interface LanguageContextType {
    language: Language;
    t: (ja: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const t = (ja: string, _en: string) => ja;

    return (
        <LanguageContext.Provider value={{ language: 'ja', t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
