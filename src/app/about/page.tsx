import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '運営者情報',
    description:
        'にほんごドクター.com の運営目的、掲載方針、お問い合わせ先。海外で日本語が通じる病院を探すサイトです。',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    運営者情報
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <h2 className="text-xl font-bold mt-2 mb-4">サイト名</h2>
                    <p>にほんごドクター.com（nihongo-doctor.com）</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">運営目的</h2>
                    <p>
                        海外旅行・駐在・留学先で、日本語が通じる病院・クリニックをすばやく見つけられるようにするための情報サイトです。
                        国・都市・症状・緊急時ガイドなど、実際の受診前に役立つ情報を整理して公開しています。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">掲載方針</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            外務省「世界の医療事情」、各国大使館・総領事館、日本人会、各医療機関の公開情報をもとに掲載しています。
                        </li>
                        <li>特定の医療機関を推奨するものではなく、受診先探しの補助情報です。</li>
                        <li>医療行為・診断・治療の助言は行いません。</li>
                        <li>広告・アフィリエイトと医療機関の掲載順位は独立しています。</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">運営者</h2>
                    <p>
                        にほんごドクター.com 運営チーム
                        <br />
                        連絡先:{' '}
                        <Link href="/contact" className="text-blue-600 hover:underline">
                            お問い合わせフォーム
                        </Link>
                        （info@nihongo-doctor.com）
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">関連ページ</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                                プライバシーポリシー
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="text-blue-600 hover:underline">
                                利用規約
                            </Link>
                        </li>
                        <li>
                            <Link href="/disclaimer" className="text-blue-600 hover:underline">
                                免責事項
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-blue-600 hover:underline">
                                お問い合わせ
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年9月17日
                    </div>
                </div>
            </div>
        </div>
    );
}
