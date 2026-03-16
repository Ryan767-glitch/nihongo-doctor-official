'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, AlertTriangle, MessageSquareText } from 'lucide-react';
import { emergencies, steps } from './data';

export default function EmergencyPage() {
    const [activeTab, setActiveTab] = useState(emergencies[0].region);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    緊急時ガイド
                </h1>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 text-sm">1</span>
                        緊急時の初動フロー
                    </h2>

                    <div className="space-y-4">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${step.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 mb-1">
                                            ステップ{step.id}: {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                            {step.description}
                                        </p>
                                        {step.link && (
                                            <Link
                                                href={step.link.href}
                                                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm transition-all"
                                            >
                                                {step.link.label}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">2</span>
                        国・地域別の緊急連絡先
                    </h2>

                    <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 mb-6 pb-[1px]">
                        <div className="flex space-x-8 px-2">
                            {emergencies.map((region) => (
                                <button
                                    key={region.region}
                                    onClick={() => setActiveTab(region.region)}
                                    className={`
                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === region.region
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                  `}
                                >
                                    {region.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {emergencies.find((region) => region.region === activeTab)?.countries.map((country) => (
                            <div key={country.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                                    <span className="text-2xl">{country.flag}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-800 leading-tight">{country.name}</h3>
                                        <span className="text-xs text-gray-500">{country.nameEn}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {country.numbers.map((num, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                            <span className="text-gray-600">{num.label}</span>
                                            <a
                                                href={`tel:${num.number.replace(/[^0-9]/g, '')}`}
                                                className="font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded"
                                            >
                                                <PhoneCall className="w-3.5 h-3.5" />
                                                {num.number}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-100">
                    <Link href="/insurance" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-red-100 transition-colors">
                                <AlertTriangle className="w-5 h-5 text-gray-700 group-hover:text-red-700" />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-red-700">海外保険ガイド</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-red-500">›</span>
                    </Link>
                    <Link href="/phrases" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 rounded-lg border border-gray-200 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-md shadow-sm group-hover:bg-blue-100 transition-colors">
                                <MessageSquareText className="w-5 h-5 text-gray-700 group-hover:text-blue-700" />
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
