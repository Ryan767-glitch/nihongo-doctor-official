import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import {
    ESIM_OFFERS,
    type EsimDestination,
    japanGlobalHref,
} from '@/lib/affiliates';

const COPY: Record<EsimDestination, { title: string; body: string; cta: string }> = {
    africa: {
        title: 'アフリカ渡航前に、eSIMで通信を確保',
        body: '病院検索・地図・保険デスク連絡は、到着直後の通信がないと止まります。アフリカ周遊プランなら国をまたいでも同じeSIMで使えます。',
        cta: 'アフリカ周遊eSIMを見る',
    },
    egypt: {
        title: 'エジプト渡航前に、eSIMで通信を確保',
        body: 'カイロ到着後に地図や日本語対応病院を探すには、先にデータ通信が必要です。出発前にeSIMを入れておくと空港でもつながります。',
        cta: 'エジプトeSIMを見る',
    },
    kenya: {
        title: 'ケニア渡航前に、eSIMで通信を確保',
        body: 'ナイロビで病院や大使館に連絡するには通信が先です。現地SIMを探す前に、出発前のeSIMを入れておく方法があります。',
        cta: 'ケニアeSIMを見る',
    },
    uae: {
        title: 'UAE渡航前に、eSIMで通信を確保',
        body: 'ドバイ到着後の病院検索や保険デスク連絡に、先にデータ通信があると安心です。出発前にeSIMを入れておけます。',
        cta: 'UAE eSIMを見る',
    },
};

export function EsimCta({ destination = 'africa' }: { destination?: EsimDestination }) {
    const copy = COPY[destination];
    return (
        <aside className="relative mb-8 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/80 to-white p-5 sm:p-6">
            <p className="mb-2">
                <span className="inline-block rounded bg-[#1aa3c7] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                    PR
                </span>
            </p>
            <div className="flex items-start gap-3">
                <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-[#1aa3c7]" />
                <div className="min-w-0">
                    <h2 className="font-bold text-slate-800">{copy.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{copy.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <a
                            href={japanGlobalHref(destination)}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-[#1aa3c7] px-5 py-3 text-sm font-semibold text-white shadow-sm"
                        >
                            {copy.cta}
                        </a>
                        <Link
                            href="/esim/africa"
                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                        >
                            比較と使い方
                        </Link>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                        広告です。クリックすると各社の公式ページへ移動します。報酬が発生する場合があります。対応国・料金は購入前に公式で確認してください。
                    </p>
                </div>
            </div>
            <img src={ESIM_OFFERS.japanGlobal.pixel} width={1} height={1} alt="" className="absolute h-px w-px opacity-0" />
        </aside>
    );
}
