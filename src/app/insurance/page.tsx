'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CreditCard, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InsuranceGuidePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    海外保険ガイド / Travel Insurance Guide
                </h1>

                <p className="text-gray-600 mb-10 leading-relaxed">
                    海外での医療費は非常に高額になるケースが多く、適切な保険の利用が重要です。<br />
                    このページでは、海外旅行保険の基本的な利用方法や、クレジットカード付帯保険の注意点について解説します。
                </p>

                {/* 1. 基本的な利用の流れ */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <ShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
                        保険利用の基本的な流れ
                    </h2>
                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                        <ol className="relative border-l-2 border-blue-200 ml-3 space-y-6">
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">1. 緊急アシスタンスセンターへ連絡</h3>
                                <p className="text-sm text-gray-600">保険証券やカードの裏面に記載されている24時間対応の日本語デスクに電話し、症状を伝えます。</p>
                            </li>
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">2. 提携病院の紹介・予約（キャッシュレス対応）</h3>
                                <p className="text-sm text-gray-600">現在地から近い「キャッシュレス診療」に対応した提携病院を案内してもらい、予約を入れてもらいます。</p>
                            </li>
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">3. 病院での受診</h3>
                                <p className="text-sm text-gray-600">パスポートと保険証券（または対象クレジットカード）を持参して受診します。キャッシュレスの場合は現地での支払いは発生しません。</p>
                            </li>
                        </ol>
                        <div className="mt-6 pt-6 border-t border-blue-100">
                            <h4 className="font-bold text-red-600 text-sm mb-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />キャッシュレス非対応の場合（立て替え払い）</h4>
                            <p className="text-sm text-gray-600">提携外の病院で受診した場合、一度全額を自費で支払い、後日保険会社へ請求する必要があります。必ず<strong className="text-gray-800">「診断書（Medical Certificate）」</strong>と<strong className="text-gray-800">「領収書（Receipt）」</strong>をもらって帰国してください。</p>
                        </div>
                    </div>
                </section>

                {/* 2. クレカ保険の注意点 */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <CreditCard className="w-6 h-6 text-green-500 mr-2" />
                        クレジットカード付帯保険の注意点
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="border border-green-100 rounded-xl p-5 bg-gradient-to-b from-green-50/50 to-white">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2 text-xs">注意1</span>
                                「自動付帯」と「利用付帯」
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                カードを持っているだけで保険が適用される<strong className="text-gray-800">自動付帯</strong>と、旅行代金（航空券やツアー代等）をそのカードで支払うことで適用される<strong className="text-gray-800">利用付帯</strong>があります。
                            </p>
                            <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg border border-yellow-100">
                                最近は「利用付帯」に切り替わるカードが増えています。必ず出発前に適用条件を確認してください。
                            </div>
                        </div>

                        <div className="border border-green-100 rounded-xl p-5 bg-gradient-to-b from-green-50/50 to-white">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2 text-xs">注意2</span>
                                「治療費用」の補償限度額
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                一般的なカード付帯保険の「傷害・疾病治療費用」の限度額は100万〜300万円程度です。<br />
                                （アメリカ等では盲腸の手術で数百万円かかることもあります）
                            </p>
                            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100">
                                複数枚のカードを持っている場合、治療費用の限度額は原則<strong className="font-bold">合算</strong>されます（法人カード等一部例外あり）。
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 持っていくもの・必要書類リスト */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <FileText className="w-6 h-6 text-purple-500 mr-2" />
                        受診時の持ち物・必要書類チェック
                    </h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">病院に行く前に用意するもの</h3>
                                {[
                                    'パスポート（原本）',
                                    '海外旅行保険の契約証（または付帯クレジットカード）',
                                    '現金・クレジットカード（立て替えや薬代用）',
                                    '常備薬や持病の英文リスト（あれば）'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 mt-6 sm:mt-0">
                                <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">帰国後の請求に必要なもの（立て替え時）</h3>
                                {[
                                    '① 医師の診断書（Medical Certificate）',
                                    '② 治療費の領収書（Receipt）',
                                    '③ 薬代の領収書と処方箋の控え',
                                    '④ 保険金請求書（帰国後に保険会社から取り寄せる）'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 関連リンク */}
                <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-100">
                    <Link href="/emergency" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-red-100 transition-colors">🏥</div>
                            <span className="font-bold text-gray-700 group-hover:text-red-700">緊急時ガイド</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-red-500">→</span>
                    </Link>
                    <Link href="/phrases" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-blue-100 transition-colors">💬</div>
                            <span className="font-bold text-gray-700 group-hover:text-blue-700">医療フレーズ集</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-blue-500">→</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
