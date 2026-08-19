'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CreditCard, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InsuranceGuidePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    海外保険ガイド
                </h1>

                <p className="text-gray-600 mb-10 leading-relaxed">
                    海外での受診は想定以上に費用がかかることがあります。こちらのページでは、
                    海外旅行保険の基本的な使い方と、キャッシュレス受診時の確認ポイントをまとめています。
                </p>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <ShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
                        保険利用の基本フロー
                    </h2>
                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                        <ol className="relative border-l-2 border-blue-200 ml-3 space-y-6">
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">1. 受診前に保険会社へ連絡</h3>
                                <p className="text-sm text-gray-600">保険証券やアプリに記載された24時間サポート窓口へ連絡し、案内に従ってください。</p>
                            </li>
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">2. 提携病院かどうかを確認</h3>
                                <p className="text-sm text-gray-600">キャッシュレス受診が可能か、後日請求になるかを受診前に確認すると手続きがスムーズです。</p>
                            </li>
                            <li className="pl-6 relative">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-800 mb-2">3. 必要書類を保管</h3>
                                <p className="text-sm text-gray-600">診断書、領収書、処方箋などは、帰国後の請求手続きでも必要になる場合があります。</p>
                            </li>
                        </ol>
                        <div className="mt-6 pt-6 border-t border-blue-100">
                            <h4 className="font-bold text-red-600 text-sm mb-2 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />キャッシュレス受診ができない場合</h4>
                            <p className="text-sm text-gray-600">一度自己負担で支払うケースもあります。受診後は<strong className="text-gray-800">診断書</strong>と<strong className="text-gray-800">領収書</strong>を必ず保管してください。</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <CreditCard className="w-6 h-6 text-green-500 mr-2" />
                        キャッシュレス受診の確認ポイント
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="border border-green-100 rounded-xl p-5 bg-gradient-to-b from-green-50/50 to-white">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2 text-xs">確認</span>
                                提携病院かどうか
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                カードを持っているだけでは適用されず、保険会社が指定する<strong className="text-gray-800">提携医療機関</strong>である必要があります。
                            </p>
                            <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg border border-yellow-100">
                                受診前に保険会社へ連絡し、対象の医療機関かどうか確認してください。
                            </div>
                        </div>

                        <div className="border border-green-100 rounded-xl p-5 bg-gradient-to-b from-green-50/50 to-white">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2 text-xs">確認</span>
                                補償内容と上限額
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                一般診療、歯科、妊娠関連、既往症などは補償対象外になることがあります。上限額も事前確認が必要です。
                            </p>
                            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-100">
                                高額な検査や入院の前には、保険会社へ再確認するのが安全です。
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <FileText className="w-6 h-6 text-purple-500 mr-2" />
                        受診時に持っていくと安心なもの
                    </h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">受診時に用意しておきたいもの</h3>
                                {[
                                    'パスポートまたは身分証',
                                    '海外旅行保険の証書またはアプリ画面',
                                    '保険会社の連絡先',
                                    '服用中の薬や既往歴のメモ',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                                        <span className="text-sm text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 mt-6 sm:mt-0">
                                <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">受診後に保管したいもの</h3>
                                {[
                                    '診断書',
                                    '領収書',
                                    '処方箋や明細書',
                                    '保険会社とのやり取りの記録',
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

                <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-100">
                    <Link href="/emergency" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-red-100 transition-colors">
                                <AlertTriangle className="w-5 h-5 text-gray-700 group-hover:text-red-700" />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-red-700">緊急時ガイド</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-red-500">›</span>
                    </Link>
                    <Link href="/phrases" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-blue-100 transition-colors">
                                <FileText className="w-5 h-5 text-gray-700 group-hover:text-blue-700" />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-blue-700">医療フレーズ集</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-blue-500">›</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
