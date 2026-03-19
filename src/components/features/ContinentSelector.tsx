"use client";

import Link from 'next/link';
import { Map, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const continents = [
    { name: 'Asia', ja: 'アジア', slug: 'asia', icon: Map, color: 'bg-blue-50 text-blue-600' },
    { name: 'North America', ja: '北米', slug: 'north-america', icon: Map, color: 'bg-green-50 text-green-600' },
    { name: 'Europe', ja: 'ヨーロッパ', slug: 'europe', icon: Building2, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Oceania', ja: 'オセアニア', slug: 'oceania', icon: Map, color: 'bg-orange-50 text-orange-600' },
    { name: 'Africa', ja: 'アフリカ', slug: 'africa', icon: Map, color: 'bg-yellow-50 text-yellow-600' },
    { name: 'South America', ja: '南米', slug: 'south-america', icon: Map, color: 'bg-emerald-50 text-emerald-600' },
];

export function ContinentSelector() {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {continents.map((c) => (
                <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="group relative flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 border border-border rounded-xl transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                    <div className={cn("p-4 rounded-full mb-3 transition-colors", c.color)}>
                        <c.icon className="w-8 h-8" />
                    </div>
                    <span className="font-semibold text-foreground text-lg">{t(c.ja, c.name)}</span>
                    <span className="text-xs text-muted-foreground mt-1">{t('クリニックを見る', 'View Clinics')}</span>
                </Link>
            ))}
        </div>
    );
}
