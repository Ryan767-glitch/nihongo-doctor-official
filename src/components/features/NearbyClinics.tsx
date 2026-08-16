"use client";

import { useMemo, useState } from 'react';
import { LocateFixed, Search } from 'lucide-react';
import { ClinicCard } from '@/components/features/ClinicCard';
import { publishedClinics } from '@/lib/catalog';
import { sortClinicsByDistance, type Coordinates } from '@/lib/geo';
import { stringToColor } from '@/lib/utils';
import { getOpenState } from '@/lib/open-status';

export function NearbyClinics() {
    const [origin, setOrigin] = useState<Coordinates | null>(null);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'denied'>('idle');
    const [openOnly, setOpenOnly] = useState(false);

    const results = useMemo(() => {
        const keyword = query.trim();
        const base = origin
            ? sortClinicsByDistance(publishedClinics, origin)
            : publishedClinics
                .filter((clinic) => {
                    if (!keyword) return false;
                    return `${clinic.nameJa} ${clinic.nameEn} ${clinic.city} ${clinic.country}`.includes(keyword);
                })
                .map((clinic) => ({ clinic, distanceKm: Number.NaN }));

        return base
            .filter(({ clinic }) => {
                if (openOnly && getOpenState(clinic) !== 'open') return false;
                if (!keyword || origin) {
                    if (!keyword) return true;
                    return `${clinic.nameJa} ${clinic.nameEn} ${clinic.city} ${clinic.country}`.includes(keyword);
                }
                return true;
            })
            .slice(0, 24);
    }, [origin, query, openOnly]);

    const locate = () => {
        if (!navigator.geolocation) {
            setStatus('error');
            return;
        }
        setStatus('loading');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
                setStatus('idle');
            },
            (error) => {
                setStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'error');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={locate}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold min-h-[48px]"
                >
                    <LocateFixed className="w-4 h-4" />
                    {status === 'loading' ? '位置を取得中...' : '現在地から探す'}
                </button>
                <label className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="都市名・国名でも絞り込み"
                        className="w-full border rounded-xl pl-11 pr-4 py-3 min-h-[48px]"
                    />
                </label>
                <button
                    onClick={() => setOpenOnly((value) => !value)}
                    className={`px-4 py-3 rounded-xl border font-medium ${openOnly ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white'}`}
                >
                    今あいている病院だけ
                </button>
            </div>

            {status === 'denied' && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    位置情報の許可が必要です。許可できない場合は、都市名を入力してください。
                </p>
            )}
            {status === 'error' && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                    位置情報を取得できませんでした。都市名で検索してください。
                </p>
            )}

            {!origin && !query && (
                <p className="text-sm text-muted-foreground">「現在地から探す」を押すか、バンコク・ソウルなどの都市名を入力してください。</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map(({ clinic, distanceKm }) => (
                    <div key={clinic.id} className="relative">
                        {Number.isFinite(distanceKm) && (
                            <span className="absolute top-4 right-4 z-10 text-xs font-semibold bg-white/90 border rounded-full px-2 py-1">
                                約{distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm)}km
                            </span>
                        )}
                        <ClinicCard clinic={clinic} colorTheme={stringToColor(clinic.country)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
