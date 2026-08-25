import { Wifi } from 'lucide-react';
import { getAffiliateOffers } from '@/lib/affiliates';

/**
 * 渡航前の通信手段（eSIM / 海外WiFi）向けアフィリエイト枠。
 * 医療コンテンツと混同しないよう「広告」をすぐ隣に表示する。
 * リンクは単純な <a href> のみ（第三者スクリプトは使わない）。
 */
export function AffiliateStrip({
    compact = false,
    title = '渡航先で病院を探す前の通信手段',
}: {
    compact?: boolean;
    title?: string;
}) {
    const offers = getAffiliateOffers();
    if (offers.length === 0) return null;

    return (
        <aside
            className={`rounded-2xl border border-slate-200 bg-slate-50/80 ${compact ? 'p-4' : 'p-5'} mt-8`}
            aria-label="広告"
        >
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className={`font-semibold text-slate-800 ${compact ? 'text-sm' : 'text-base'}`}>{title}</p>
                <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-amber-800">
                    広告
                </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                病院の電話・地図・保険会社への連絡に使うための通信案内です。特定の保険商品や医療機関を推奨するものではありません。
            </p>
            <div className={`grid gap-3 ${offers.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {offers.map((offer) => (
                    <a
                        key={offer.id}
                        href={offer.href}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-sky-50 text-primary flex items-center justify-center">
                            <Wifi className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-sm text-slate-800 flex flex-wrap items-center gap-2">
                                {offer.label}
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded">
                                    広告
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{offer.description}</p>
                            <p className="text-xs font-semibold text-primary mt-2">{offer.cta} →</p>
                        </div>
                    </a>
                ))}
            </div>
        </aside>
    );
}
