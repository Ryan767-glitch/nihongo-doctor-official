'use client';

import React, { useState } from 'react';
import { PhoneCall, MapPin, Building } from 'lucide-react';
import { embassies } from './data';

const countryCodeMap: Record<string, string> = {
    'Indonesia': 'id', 'Cambodia': 'kh', 'Thailand': 'th', 'Philippines': 'ph', 'Vietnam': 'vn',
    'Malaysia': 'my', 'Myanmar': 'mm', 'Laos': 'la', 'China': 'cn', 'Hong Kong': 'hk',
    'USA': 'us', 'Canada': 'ca', 'Argentina': 'ar', 'Colombia': 'co', 'Chile': 'cl',
    'Brazil': 'br', 'Peru': 'pe', 'Italy': 'it', 'Netherlands': 'nl', 'Austria': 'at',
    'Switzerland': 'ch', 'Spain': 'es', 'Germany': 'de', 'France': 'fr', 'Belgium': 'be',
    'UK': 'gb', 'Australia': 'au', 'New Zealand': 'nz', 'UAE': 'ae', 'Egypt': 'eg',
    'Ethiopia': 'et', 'Kenya': 'ke', 'Tanzania': 'tz', 'Nigeria': 'ng', 'South Africa': 'za',
};

export default function EmbassyPage() {
    const [activeTab, setActiveTab] = useState(embassies[0].region);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    大使館・領事館情報
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    パスポートの紛失や事故、事件、災害などの緊急時に確認しやすいよう、各国の日本大使館・総領事館の情報をまとめています。
                    <br className="hidden sm:block" />
                    <span className="text-sm bg-yellow-50 text-yellow-800 px-2 py-1 rounded inline-block mt-2 border border-yellow-200">
                        最新情報や受付時間は、必ず各公館の公式サイトでご確認ください。
                    </span>
                </p>

                <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 mb-8 pb-[1px]">
                    <div className="flex space-x-6 px-2">
                        {embassies.map((region) => (
                            <button
                                key={region.region}
                                onClick={() => setActiveTab(region.region)}
                                className={`
                  whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {embassies.find((region) => region.region === activeTab)?.countries.map((country) => (
                        <div key={country.name} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50/50">
                            <div className="flex items-center gap-3 mb-5 border-b pb-3">
                                {countryCodeMap[country.nameEn] ? (
                                    <img
                                        src={`https://flagcdn.com/w40/${countryCodeMap[country.nameEn]}.png`}
                                        alt={country.name}
                                        className="w-8 h-auto drop-shadow-sm rounded-[2px]"
                                    />
                                ) : (
                                    <span className="text-3xl drop-shadow-sm">{country.flag}</span>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{country.name}</h3>
                                    <span className="text-xs font-medium text-gray-500">{country.nameEn}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Building className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 mb-0.5">公館名</div>
                                        <div className="text-sm font-medium text-gray-800">{country.embassyName}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 mb-0.5">所在地</div>
                                        <div className="text-sm text-gray-700 leading-relaxed">{country.address}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <a
                                        href={`tel:${country.phone.replace(/[^0-9+]/g, '')}`}
                                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-100 group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-bold">電話をかける</span>
                                        </div>
                                        <span className="text-sm font-bold tracking-tight">{country.phone}</span>
                                    </a>

                                    <a
                                        href={country.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200 group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold">公式サイト</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500 truncate w-full text-center px-1">詳細を見る</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
