import { CreditCard } from 'lucide-react';
import { TRAVEL_OFFERS } from '@/lib/affiliates';

export function EposCardCta({
    title = '年会費無料で海外旅行保険が自動付帯するカード',
    body,
}: {
    title?: string;
    body?: string;
}) {
    const offer = TRAVEL_OFFERS.eposCard;
    return (
        <aside className="relative rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/70 to-white p-5 sm:p-6">
            <p className="mb-2">
                <span className="inline-block rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                    PR
                </span>
            </p>
            <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div className="min-w-0">
                    <h2 className="font-bold text-slate-800">{offer.name}｜{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {body || offer.note}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{offer.coverage}</p>
                    <div className="mt-4">
                        <a
                            href={offer.href}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm"
                        >
                            公式サイトで補償内容を確認する
                        </a>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                        広告です。クリックすると公式ページへ移動します。報酬が発生する場合があります。補償の条件・上限は公式ページで必ず確認してください。
                    </p>
                </div>
            </div>
            <img src={offer.pixel} width={1} height={1} alt="" className="absolute h-px w-px opacity-0" />
        </aside>
    );
}
