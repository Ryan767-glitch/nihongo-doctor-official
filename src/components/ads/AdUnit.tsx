'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID, isAdSenseEnabled } from '@/lib/adsense';

type AdUnitProps = {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
    responsive?: boolean;
    className?: string;
    /** 審査・配置確認用のラベル（本番でも薄いテキストで区別可能） */
    label?: string;
};

declare global {
    interface Window {
        adsbygoogle?: Record<string, unknown>[];
    }
}

/**
 * 手動ディスプレイ広告枠。Auto ads だけでは足りないときに使う。
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID と slot が揃っていないと描画しない。
 */
export function AdUnit({
    slot,
    format = 'auto',
    responsive = true,
    className = '',
    label = '広告',
}: AdUnitProps) {
    const pushed = useRef(false);

    useEffect(() => {
        if (!isAdSenseEnabled() || !slot || pushed.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch {
            // Ad blocker / 未読み込み時は無視
        }
    }, [slot]);

    if (!isAdSenseEnabled() || !slot) return null;

    return (
        <div className={`my-6 overflow-hidden text-center ${className}`.trim()}>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_CLIENT_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
            />
        </div>
    );
}
