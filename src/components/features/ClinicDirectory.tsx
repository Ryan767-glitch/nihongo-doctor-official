import { Suspense, type ReactNode } from 'react';
import Link from 'next/link';
import { Clinic, Embassy } from '@/types';
import { ClinicList } from '@/components/features/ClinicList';
import { ContinentHeader } from '@/components/features/ContinentHeader';
import { HighlightScroller } from '@/components/features/HighlightScroller';
import { CONTINENT_JA } from '@/lib/slugs';

type Crumb = { href?: string; label: string };

export function ClinicDirectory({
    title,
    description,
    sourceNote = '出典: 外務省「世界の医療事情」、各国大使館・総領事館、各医療機関の公開情報',
    clinics,
    embassies,
    crumbs,
    countryCount,
    clinicCount,
    listHeading,
    showCountryCount = true,
    intro,
    afterList,
    footer,
}: {
    title: string;
    description: string;
    sourceNote?: string;
    clinics: Clinic[];
    embassies: Embassy[];
    crumbs: Crumb[];
    countryCount: number;
    clinicCount: number;
    /** City pages pass a short H2; default appends 「の日本語対応医療機関」 which breaks long titles. */
    listHeading?: string;
    showCountryCount?: boolean;
    intro?: ReactNode;
    afterList?: ReactNode;
    footer?: ReactNode;
}) {
    const heading = listHeading || `${title}の日本語対応医療機関`;

    return (
        <div className="container mx-auto max-w-7xl py-10 px-4 min-h-[100dvh]">
            <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                {crumbs.map((crumb, index) => (
                    <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                        {index > 0 && <span>/</span>}
                        {crumb.href ? (
                            <Link href={crumb.href} className="hover:text-primary transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-foreground">{crumb.label}</span>
                        )}
                    </span>
                ))}
            </div>

            <ContinentHeader displayName={title} description={description} />
            {intro}

            <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="font-bold text-slate-700">{heading}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{sourceNote}</p>
                </div>
                <div className="flex gap-4">
                    {showCountryCount && (
                        <div className="text-center">
                            <span className="block text-xs text-muted-foreground">掲載国数</span>
                            <span className="text-xl font-bold text-primary">
                                {countryCount}
                                <span className="text-xs font-normal">カ国</span>
                            </span>
                        </div>
                    )}
                    <div className={`text-center ${showCountryCount ? 'pl-4 border-l border-slate-200' : ''}`}>
                        <span className="block text-xs text-muted-foreground">掲載機関数</span>
                        <span className="text-xl font-bold text-primary">
                            {clinicCount}
                            <span className="text-xs font-normal">件</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Isolated Suspense: keeps ClinicList in prerendered HTML (no useSearchParams bailout). */}
            <Suspense fallback={null}>
                <HighlightScroller />
            </Suspense>
            <ClinicList clinics={clinics} embassies={embassies} />
            {afterList}
            {footer}
        </div>
    );
}

export function continentLabel(name: string) {
    return CONTINENT_JA[name] || name;
}
