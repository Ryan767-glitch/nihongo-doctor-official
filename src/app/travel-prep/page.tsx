import Link from 'next/link';
import { Phone, MapPin, Wifi, ShieldAlert } from 'lucide-react';
import { AffiliateStrip } from '@/components/features/AffiliateStrip';
import { hasAffiliateOffers } from '@/lib/affiliates';

export default function TravelPrepPage() {
    const showOffers = hasAffiliateOffers();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    渡航前の通信準備
                </h1>

                <p className="text-gray-600 mb-10 leading-relaxed">
                    海外で具合が悪くなったとき、まず必要になるのは「つながる回線」です。病院の電話、地図、翻訳、保険会社の日本語デスクへの連絡に使います。
                    このページは通信手段の整理用であり、特定の保険商品や医療機関を推奨するものではありません。
                </p>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mr-3 text-sm">
                            1
                        </span>
                        病院を探す前に整えておくこと
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                icon: Phone,
                                title: '通話できる回線',
                                body: '現地の病院や保険会社に電話できる状態にしておきます。ホテルのWi‑Fiだけでは発信できないことがあります。',
                            },
                            {
                                icon: MapPin,
                                title: '地図アプリ',
                                body: '都市ページの住所をコピーし、オフラインでも見られるようにしておくと、タクシーや徒歩で迷いにくくなります。',
                            },
                            {
                                icon: Wifi,
                                title: 'eSIM / 海外WiFi',
                                body: '渡航前にプロファイルや受取方法を確認しておくと、到着直後でも保険会社や病院へ連絡しやすくなります。',
                            },
                            {
                                icon: ShieldAlert,
                                title: '保険証券と緊急番号',
                                body: '保険の使い方は別ページにまとめています。通信がつながったあと、まず保険会社へ連絡するのが基本です。',
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="flex flex-col sm:flex-row gap-4 p-5 rounded-lg border border-gray-100 bg-gray-50/50"
                                >
                                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-sky-50 text-primary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">通信手段と保険は別物です</h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        eSIMや海外WiFiは、受診や保険手続きのための「連絡手段」です。補償内容やキャッシュレス可否は各保険会社の契約条件で決まります。
                        保険の使い方は
                        <Link href="/insurance" className="text-primary hover:underline mx-1">
                            海外保険ガイド
                        </Link>
                        を、緊急時の番号は
                        <Link href="/emergency" className="text-primary hover:underline mx-1">
                            緊急時ガイド
                        </Link>
                        を参照してください。
                    </p>
                </section>

                {showOffers ? (
                    <AffiliateStrip title="eSIM・海外WiFiの案内" />
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-muted-foreground">
                        提携後のアフィリエイトリンク（A8.net など）を環境変数に設定すると、ここに eSIM / 海外WiFi の案内が表示されます。
                        未設定のときは枠を出しません。
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-100">
                    <Link
                        href="/insurance"
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-sky-50 rounded-lg border border-gray-200 transition-colors"
                    >
                        <span className="font-bold text-gray-700">海外保険ガイド</span>
                        <span className="text-gray-400">›</span>
                    </Link>
                    <Link
                        href="/phrases"
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-sky-50 rounded-lg border border-gray-200 transition-colors"
                    >
                        <span className="font-bold text-gray-700">医療フレーズ集</span>
                        <span className="text-gray-400">›</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
