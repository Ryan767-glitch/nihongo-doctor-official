'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface ContinentHeaderProps {
    continentName: string;
}

export function ContinentHeader({ continentName }: ContinentHeaderProps) {
    const { t } = useLanguage();

    // Map for Japanese names
    const continentJaMap: Record<string, string> = {
        'Asia': 'アジア',
        'North America': '北米',
        'Europe': 'ヨーロッパ',
        'Oceania': 'オセアニア',
        'Africa': 'アフリカ',
        'South America': '南米'
    };

    const displayName = t(continentJaMap[continentName] || continentName, continentName);

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                {displayName}
            </h1>
            <p className="text-muted-foreground mt-2">
                {t(
                    `${displayName}の日本人向け医療機関`,
                    `Japanese-speaking medical facilities in ${continentName}.`
                )}
            </p>
        </div>
    );
}
