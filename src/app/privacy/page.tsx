import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | にほんごドクター.com',
    description: 'にほんごドクター.comのプライバシーポリシー',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    プライバシーポリシー / Privacy Policy
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-8">にほんごドクター.com プライバシーポリシー</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. 収集する情報</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li><strong>(1) お問い合わせフォーム:</strong> お名前、メールアドレス、メッセージ内容</li>
                        <li><strong>(2) アクセス解析:</strong> Google Analytics等の解析ツールにより、アクセスデータ（IPアドレス、ブラウザ情報、閲覧ページ、滞在時間等）を匿名で収集する場合があります。</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. 利用目的</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li>(1) お問い合わせへの返信・対応</li>
                        <li>(2) サイトの改善・利用状況の把握</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. 第三者への提供</h2>
                    <p>
                        取得した個人情報を、利用者の同意なく第三者に提供することはありません。ただし、法令に基づく場合を除きます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. Cookieの使用</h2>
                    <p>
                        本サイトではアクセス解析を目的としてCookieを使用する場合があります。Cookieはブラウザの設定から無効にすることができますが、一部の機能が正しく動作しなくなる可能性があります。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">5. 安全管理</h2>
                    <p>
                        取得した個人情報は、不正アクセス・紛失・漏洩等を防止するため、適切な安全管理措置を講じます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">6. ポリシーの変更</h2>
                    <p>
                        本ポリシーは、運営者の判断により予告なく変更される場合があります。変更後のポリシーは本ページに掲載した時点で効力を生じます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">7. お問い合わせ</h2>
                    <p>
                        プライバシーに関するお問い合わせは、お問い合わせページ（/contact）よりご連絡ください。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年2月24日
                    </div>
                </div>
            </div>
        </div>
    );
}
