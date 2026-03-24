"use client";

import * as React from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Search, MapPin, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Clinic } from "@/types";
import clinicsData from "@/data/clinics.json";
import { useLanguage } from "@/contexts/LanguageContext";
import { filterJapaneseCompatibleClinics } from "@/lib/clinic-support";
import { enrichClinicsWithHoursSync } from "@/lib/clinic-hours";

interface GlobalSearchProps {
    variant?: 'default' | 'hero' | 'icon' | 'modal';
}

export function GlobalSearch({ variant = 'default' }: GlobalSearchProps) {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [mounted, setMounted] = React.useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    // Load data - in a real app ensuring this is memoized or loaded efficiently
    const clinics = React.useMemo(
        () => enrichClinicsWithHoursSync(filterJapaneseCompatibleClinics(clinicsData as Clinic[])),
        []
    );

    React.useEffect(() => {
        setMounted(true);
        const handleOpen = () => setOpen(true);
        window.addEventListener('open-global-search', handleOpen);

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => {
            window.removeEventListener('open-global-search', handleOpen);
            document.removeEventListener("keydown", down);
        };
    }, []);

    const triggerOpen = () => {
        window.dispatchEvent(new CustomEvent('open-global-search'));
    };

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    if (variant === 'modal') {
        if (!mounted) return null;
        return (
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label={t('サイト内検索', 'Site search')}
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
                shouldFilter={true}
            >
                <VisuallyHidden.Root>
                    <Dialog.Title>{t('病院・クリニックを検索', 'Search medical facilities')}</Dialog.Title>
                    <Dialog.Description>
                        {t('国名、都市名、病院名、診療科から医療機関を検索できます。', 'Search by country, city, clinic name, or specialty.')}
                    </Dialog.Description>
                </VisuallyHidden.Root>

                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center border-b px-3 gap-2">
                        <Search className="h-5 w-5 shrink-0 opacity-50 ml-2" />
                        <Command.Input
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            placeholder={t('国、都市、病院名で検索...', 'Search by country, city, or clinic name...')}
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-base md:text-lg outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            onClick={() => setOpen(false)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 transition-colors"
                            aria-label={t('検索を閉じる', 'Close search')}
                        >
                            <span className="sr-only">{t('検索を閉じる', 'Close search')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <Command.List className={`max-h-[60vh] overflow-y-auto overflow-x-hidden py-2 px-2 transition-opacity duration-200 ${searchQuery.trim().length === 0 ? 'hidden' : 'block'}`}>
                        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                            {t('クリニックが見つかりません。', 'No clinics found.')}
                        </Command.Empty>

                        <Command.Group className="space-y-1">
                            {clinics.map((clinic) => (
                                <Command.Item
                                    key={clinic.id}
                                    value={`${clinic.nameJa} ${clinic.nameEn} ${clinic.city} ${clinic.country} ${clinic.address || ''} ${clinic.specialties?.join(' ') ?? ''}`}
                                    onSelect={() => {
                                        const slug = clinic.continent.toLowerCase().replace(' ', '-');
                                        runCommand(() => router.push(`/${slug}?highlight=${clinic.id}`));
                                        setOpen(false);
                                    }}
                                    className="relative flex cursor-default select-none items-start rounded-lg px-3 py-3 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors cursor-pointer overflow-hidden mt-1"
                                >
                                    <Building2 className="mr-3 h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-foreground text-base truncate">{clinic.nameJa}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap shrink-0 ${stringToColor(clinic.country)}`}>
                                                {clinic.country}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground truncate w-full">{clinic.nameEn}</span>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
                                            <span className="flex items-center gap-1 shrink-0">
                                                <MapPin className="w-3 h-3" /> {clinic.city}
                                            </span>
                                            {clinic.specialties[0] && (
                                                <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 truncate max-w-full">
                                                    <span className="truncate">{clinic.specialties[0]}</span>
                                                    {clinic.specialties.length > 1 && <span className="shrink-0">{` +${clinic.specialties.length - 1}`}</span>}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>

                    {searchQuery.trim().length === 0 && (
                        <div className="py-10 text-center text-sm text-muted-foreground border-t border-slate-100">
                            {t('検索キーワードを入力してください...', 'Type to start searching...')}
                        </div>
                    )}
                </div>
            </Command.Dialog>
        );
    }

    return (
        <>
            {variant === 'hero' ? (
                <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
                    <button
                        onClick={triggerOpen}
                        className="flex items-center w-full bg-white h-14 sm:h-16 rounded-full shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 pr-2 pl-6 group overflow-hidden"
                    >
                        <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="flex-1 text-left text-muted-foreground ml-3 text-sm sm:text-base">
                            {t('症状、診療科、病院名で検索...', 'Search by symptom, specialty, or clinic name...')}
                        </span>
                        <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 md:py-2.5 rounded-full font-medium transition-colors ml-2 shrink-0 h-10 sm:h-12 flex items-center justify-center">
                            {t('検索', 'Search')}
                        </div>
                    </button>
                    <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs sm:text-sm">
                        <button onClick={triggerOpen} className="px-3 py-1.5 bg-white/60 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-600 transition-colors shadow-sm">
                            #内科
                        </button>
                        <button onClick={triggerOpen} className="px-3 py-1.5 bg-white/60 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-600 transition-colors shadow-sm">
                            #小児科
                        </button>
                        <button onClick={triggerOpen} className="px-3 py-1.5 bg-white/60 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-600 transition-colors shadow-sm">
                            #歯科
                        </button>
                        <button onClick={triggerOpen} className="px-3 py-1.5 bg-white/60 hover:bg-white backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-600 transition-colors shadow-sm">
                            #24時間
                        </button>
                    </div>
                </div>
            ) : variant === 'icon' ? (
                <button
                    onClick={triggerOpen}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                    aria-label={t('病院を検索', 'Search clinics')}
                >
                    <Search className="w-5 h-5" />
                </button>
            ) : (
                <button
                    onClick={triggerOpen}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-muted/50 border border-border rounded-full hover:bg-muted hover:text-foreground transition-colors w-full md:w-64 lg:w-80 group"
                >
                    <Search className="w-4 h-4" />
                    <span className="flex-1 text-left">{t('クリニックを検索...', 'Search clinics...')}</span>
                    <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-foreground">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>
            )}
        </>
    );
}

// Helper needed because we modified utils but need to import it
import { stringToColor } from "@/lib/utils";
