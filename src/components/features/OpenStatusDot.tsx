"use client";

import { getOpenLabel, getOpenState, OpenState } from '@/lib/open-status';
import { Clinic } from '@/types';

const DOT_CLASS: Record<OpenState, string> = {
    open: 'bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]',
    closed: 'bg-slate-300',
    unknown: 'bg-amber-400',
};

export function OpenStatusDot({
    clinic,
    showLabel = true,
    size = 'sm',
}: {
    clinic: Clinic;
    showLabel?: boolean;
    size?: 'sm' | 'md';
}) {
    const state = getOpenState(clinic);
    const label = getOpenLabel(state);
    const dimension = size === 'md' ? 'h-3 w-3' : 'h-2.5 w-2.5';

    return (
        <span
            className="inline-flex items-center gap-1.5 shrink-0"
            title={state === 'open' ? '現地時間で診療中' : state === 'closed' ? '現地時間で時間外' : '営業時間は要確認'}
        >
            <span className="relative flex items-center justify-center">
                {state === 'open' && (
                    <span className={`absolute inline-flex ${dimension} rounded-full bg-emerald-400 opacity-70 animate-ping`} />
                )}
                <span className={`relative inline-flex ${dimension} rounded-full ${DOT_CLASS[state]}`} />
            </span>
            {showLabel && (
                <span
                    className={`text-[11px] font-semibold ${
                        state === 'open' ? 'text-emerald-700' : state === 'closed' ? 'text-slate-500' : 'text-amber-700'
                    }`}
                >
                    {label}
                </span>
            )}
        </span>
    );
}
