'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { languages, phraseCategories } from './data';

export default function PhrasesPage() {
    const [activeLang, setActiveLang] = useState(languages[0].id);
    const [openCategories, setOpenCategories] = useState<string[]>(['emergency', 'reception']);

    const toggleCategory = (categoryId: string) => {
        setOpenCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-8 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    医療フレーズ集
                </h1>

                {/* 言語タブ */}
                <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200 mb-8 pb-[1px]">
                    <div className="flex space-x-2 px-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setActiveLang(lang.id)}
                                className={`
                                  whitespace-nowrap py-2 px-4 rounded-t-lg font-medium text-sm transition-colors border border-b-0
                                  ${activeLang === lang.id
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    }
                                `}
                            >
                                {lang.name} <span className="text-xs opacity-70 ml-1">({lang.nameNative})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* フレーズカテゴリ（アコーディオン） */}
                <div className="space-y-4">
                    {phraseCategories.map((category) => {
                        const isOpen = openCategories.includes(category.id);

                        return (
                            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                >
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {category.title}
                                    </h2>
                                    {isOpen ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="p-0 sm:p-4 border-t border-gray-200">
                                        <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase rounded-md mb-2">
                                            <div className="col-span-4">日本語</div>
                                            <div className="col-span-4">現地語</div>
                                            <div className="col-span-4">発音ガイド</div>
                                        </div>

                                        <ul className="divide-y divide-gray-100">
                                            {category.phrases.map((phrase, idx) => {
                                                const translation = (phrase.translations as Record<string, { text: string, pron: string }>)?.[activeLang] || { text: 'N/A', pron: 'N/A' };
                                                return (
                                                    <li key={idx} className="p-4 hover:bg-blue-50/30 transition-colors">
                                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center">
                                                            <div className="col-span-1 border-b border-dashed border-gray-200 pb-2 mb-2 sm:border-0 sm:pb-0 sm:mb-0 sm:col-span-4 font-medium text-gray-800">
                                                                {phrase.ja}
                                                            </div>
                                                            <div className="col-span-1 sm:col-span-4 font-bold text-blue-700 text-lg sm:text-base leading-tight">
                                                                {translation.text}
                                                            </div>
                                                            <div className="col-span-1 sm:col-span-4 text-sm text-gray-500 font-medium truncate sm:whitespace-normal">
                                                                {translation.pron}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
