"use client";

import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Disclaimer() {
    const { t } = useLanguage();

    return (
        <section className="bg-slate-50 py-8 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex gap-4 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm text-slate-700">
                            {t('免責事項', 'Disclaimer')}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {t(
                                '掲載情報は外務省「世界の医療事情」、各国日本人会、および各医療機関の公開情報を基に作成していますが、内容の正確性・最新性を保証するものではありません。受診の際は、必ず事前に各医療機関へ直接ご確認ください。当サイトの利用により生じた損害について、運営者は一切の責任を負いません。また、当サイトは特定の医療機関を推奨するものではありません。',
                                'The information provided is based on public data from the Ministry of Foreign Affairs, Japanese associations, and medical institutions, but we do not guarantee its accuracy or currency. Please contact the medical institution directly before visiting. We are not responsible for any damages arising from the use of this site. This site does not endorse specific medical institutions.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
