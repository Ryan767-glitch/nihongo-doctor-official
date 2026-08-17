"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LocateFixed, MapPin, Search } from 'lucide-react';
import { ClinicCard } from '@/components/features/ClinicCard';
import { publishedClinics } from '@/lib/catalog';
import { sortClinicsByDistance } from '@/lib/geo';
import {
    clinicMatchesQuery,
    distanceLabel,
    featuredNearbyCities,
    nearestDistance,
    queryIsOnlyPlaceName,
    resolveCityOrigin,
    resolveCountryName,
    type NearbyOrigin,
} from '@/lib/nearby-search';
import { getOpenState } from '@/lib/open-status';
import { stringToColor } from '@/lib/utils';

const SESSION_KEY = 'nihongo-doctor-nearby-origin';

type Status = 'idle' | 'loading' | 'ready' | 'denied' | 'unavailable' | 'timeout' | 'insecure';

function readStoredOrigin(): NearbyOrigin | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as NearbyOrigin;
        if (typeof parsed?.lat === 'number' && typeof parsed?.lng === 'number') return parsed;
    } catch {
        return null;
    }
    return null;
}

function storeOrigin(origin: NearbyOrigin | null) {
    if (typeof window === 'undefined') return;
    if (!origin) {
        sessionStorage.removeItem(SESSION_KEY);
        return;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(origin));
}

function getCurrentPosition(options: PositionOptions) {
    return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export function NearbyClinics() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') ?? '';
    const [origin, setOrigin] = useState<NearbyOrigin | null>(null);
    const [query, setQuery] = useState(initialQuery);
    const [status, setStatus] = useState<Status>('idle');
    const [openOnly, setOpenOnly] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const setAndStoreOrigin = useCallback((next: NearbyOrigin | null) => {
        setOrigin(next);
        storeOrigin(next);
    }, []);

    const locate = useCallback(async () => {
        if (typeof window === 'undefined') return;
        if (!window.isSecureContext) {
            setStatus('insecure');
            return;
        }
        if (!navigator.geolocation) {
            setStatus('unavailable');
            return;
        }

        setStatus('loading');
        const attempts: PositionOptions[] = [
            { enableHighAccuracy: false, timeout: 12000, maximumAge: 180000 },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
        ];

        let lastError: GeolocationPositionError | null = null;
        for (const options of attempts) {
            try {
                const position = await getCurrentPosition(options);
                const next: NearbyOrigin = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    source: 'gps',
                    label: '現在地',
                };
                setAndStoreOrigin(next);
                setStatus('ready');
                return;
            } catch (error) {
                lastError = error as GeolocationPositionError;
                if (lastError?.code === 1) {
                    setStatus('denied');
                    return;
                }
            }
        }

        setStatus(lastError?.code === 3 ? 'timeout' : 'unavailable');
    }, [setAndStoreOrigin]);

    useEffect(() => {
        const stored = readStoredOrigin();
        const cityFromQuery = resolveCityOrigin(initialQuery);
        if (cityFromQuery) {
            setOrigin(cityFromQuery);
        } else if (stored) {
            setOrigin(stored);
            if (stored.source === 'gps') setStatus('ready');
        }
        setHydrated(true);

        if (cityFromQuery || stored?.source === 'gps') return;
        if (!navigator.geolocation || !navigator.permissions?.query) return;
        navigator.permissions
            .query({ name: 'geolocation' })
            .then((permission) => {
                if (permission.state === 'granted') void locate();
            })
            .catch(() => undefined);
    }, [initialQuery, locate]);

    const applyCity = (label: string) => {
        const cityOrigin = resolveCityOrigin(label);
        setQuery(label);
        if (cityOrigin) {
            setAndStoreOrigin(cityOrigin);
            setStatus('idle');
        }
    };

    const typedCity = resolveCityOrigin(query);
    const typedCountry = resolveCountryName(query);
    const effectiveOrigin = origin ?? typedCity;

    const results = useMemo(() => {
        const keyword = query.trim();
        let list = effectiveOrigin
            ? sortClinicsByDistance(publishedClinics, effectiveOrigin)
            : publishedClinics
                .filter((clinic) => keyword && clinicMatchesQuery(clinic, keyword))
                .map((clinic) => ({ clinic, distanceKm: Number.NaN }));

        if (typedCountry && !typedCity) {
            list = list.filter(({ clinic }) => clinic.country === typedCountry);
        }
        if (keyword && !queryIsOnlyPlaceName(keyword) && !typedCountry) {
            list = list.filter(({ clinic }) => clinicMatchesQuery(clinic, keyword));
        }
        if (openOnly) {
            list = list.filter(({ clinic }) => getOpenState(clinic) === 'open');
        }
        return list.slice(0, 24);
    }, [effectiveOrigin, query, openOnly, typedCity, typedCountry]);

    const nearest = effectiveOrigin ? nearestDistance(effectiveOrigin) : null;
    const tooFar = Boolean(effectiveOrigin?.source === 'gps' && nearest && nearest.km > 80);
    const cities = featuredNearbyCities();

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    onClick={() => void locate()}
                    disabled={status === 'loading'}
                    className="inline-flex w-full items-center justify-center gap-2 bg-primary text-white px-5 py-3.5 rounded-2xl font-semibold min-h-[52px] disabled:opacity-70"
                >
                    <LocateFixed className="w-5 h-5" />
                    {status === 'loading' ? '位置を取得しています…' : '現在地から近い病院を探す'}
                </button>

                <label className="relative block">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="バンコク、シカゴ、Bangkok など都市名でも探す"
                        enterKeyHint="search"
                        autoCapitalize="none"
                        autoCorrect="off"
                        className="w-full border rounded-2xl pl-11 pr-4 py-3 min-h-[52px] text-base"
                    />
                </label>

                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                    {cities.map((place) => (
                        <button
                            key={place.city}
                            type="button"
                            onClick={() => applyCity(place.displayCity)}
                            className={`shrink-0 rounded-full border px-3 py-2 text-sm min-h-[40px] ${
                                typedCity?.label === place.label || origin?.label === place.label
                                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                                    : 'bg-white text-slate-600'
                            }`}
                        >
                            {place.displayCity}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => setOpenOnly((value) => !value)}
                    className={`self-start px-4 py-2.5 rounded-xl border text-sm font-medium min-h-[44px] ${
                        openOnly ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white'
                    }`}
                >
                    今あいている病院だけ
                </button>
            </div>

            {status === 'loading' && (
                <p className="text-sm text-slate-600 bg-slate-50 border rounded-xl p-3">
                    位置情報の許可を求められたら「許可」を押してください。取得まで十数秒かかることがあります。
                </p>
            )}
            {status === 'ready' && origin?.source === 'gps' && (
                <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    現在地を取得しました。近い順に表示しています。
                    {nearest ? ` いちばん近い掲載は${nearest.label}（約${distanceLabel(nearest.km)}）です。` : ''}
                </p>
            )}
            {status === 'denied' && (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    位置情報の許可が必要です。スマホは「設定 → Safari / Chrome → 位置情報 → 許可」、PCはアドレスバー左のマークから許可してください。許可できないときは下の都市名をタップしてください。
                </p>
            )}
            {status === 'timeout' && (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    位置の取得が時間切れになりました。屋内やVPNだと失敗しやすいです。もう一度押すか、都市名で探してください。
                </p>
            )}
            {(status === 'unavailable' || status === 'insecure') && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                    この端末では位置情報を使えません。バンコクやソウルなど、都市名を入力するか下の都市を選んでください。
                </p>
            )}
            {tooFar && nearest && (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    いまの位置から80km以内に掲載がありません。いちばん近いのは{nearest.label}（約{distanceLabel(nearest.km)}）です。旅行先の都市名を選ぶと、その街の病院が出ます。
                </p>
            )}

            {hydrated && !effectiveOrigin && !query && (
                <p className="text-sm text-muted-foreground">
                    上の青いボタンで現在地を使うか、よく行く都市をタップしてください。
                </p>
            )}

            {effectiveOrigin && (
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="w-4 h-4 text-primary" />
                    {effectiveOrigin.source === 'gps' ? '現在地から近い順' : `${effectiveOrigin.label}から近い順`}
                    <span className="text-muted-foreground font-normal">{results.length}件</span>
                </div>
            )}

            {hydrated && (effectiveOrigin || query) && results.length === 0 && (
                <p className="text-sm text-muted-foreground border rounded-xl p-4">
                    該当する病院が見つかりませんでした。都市名を変えるか、「今あいている病院だけ」をオフにしてみてください。
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map(({ clinic, distanceKm }) => (
                    <div key={clinic.id} className="relative">
                        {Number.isFinite(distanceKm) && (
                            <span className="absolute top-4 right-4 z-10 text-xs font-semibold bg-white/90 border rounded-full px-2 py-1">
                                約{distanceLabel(distanceKm)}
                            </span>
                        )}
                        <ClinicCard clinic={clinic} colorTheme={stringToColor(clinic.country)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
