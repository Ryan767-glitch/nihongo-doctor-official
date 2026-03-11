import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約 | にほんごドクター.com',
    description: 'にほんごドクター.comの利用規約',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    利用規約 / Terms of Use
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-8">にほんごドクター.com 利用規約</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第1条（サービスの目的）</h2>
                    <p>
                        にほんごドクター.com（以下「本サイト」）は、海外在住・渡航中の日本語話者に対し、日本語での対応が可能な医療機関の情報を提供することを目的とするウェブサイトです。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第2条（情報の正確性・免責事項）</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>本サイトに掲載された情報は、外務省『世界の医療事情』等の公開資料を基に作成していますが、その正確性、最新性、完全性を保証するものではありません。</li>
                        <li>診療内容、対応言語、営業時間、電話番号等は予告なく変更される可能性があります。受診前に必ず各医療機関へ直接ご確認ください。</li>
                        <li>本サイトの情報に基づく行動によって生じたいかなる損害についても、運営者は一切の責任を負いません。</li>
                        <li>本サイトは医療行為の提供、医療機関の推奨・保証を行うものではありません。</li>
                    </ol>

                    <h2 className="text-xl font-bold mt-8 mb-4">第3条（著作権）</h2>
                    <p>
                        本サイトに掲載されたコンテンツ（テキスト、デザイン、画像等）の著作権は運営者に帰属します。無断転載・複製を禁じます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第4条（個人情報の取り扱い）</h2>
                    <p>
                        本サイトのお問い合わせフォーム等にて取得する個人情報の取り扱いについては、プライバシーポリシー（/privacy）をご参照ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第5条（禁止事項）</h2>
                    <p>
                        利用者は、本サイトの情報を商業目的で無断利用すること、虚偽の情報を送信すること、その他法令に反する行為を行ってはなりません。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第6条（規約の変更）</h2>
                    <p>
                        本規約は、運営者の判断により予告なく変更される場合があります。変更後の規約は本ページに掲載した時点で効力を生じます。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年2月24日
                    </div>
                </div>
            </div>
        </div>
    );
}
