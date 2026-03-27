import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー',
    description: 'にほんごドクター.com のプライバシーポリシー',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    プライバシーポリシー
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-2">にほんごドクター.com プライバシーポリシー</p>
                    <p className="text-sm text-gray-600 mb-8">適用開始日: 2026年2月14日</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. 取得する情報</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li><strong>(1) お問い合わせ情報:</strong> お名前、メールアドレス、お問い合わせ内容</li>
                        <li><strong>(2) アクセス情報:</strong> 利用状況の把握や改善のため、アクセス解析ツール等を通じて、閲覧ページ、参照元、利用端末、ブラウザ情報などを取得する場合があります。</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. 利用目的</h2>
                    <ul className="list-none pl-0 space-y-2">
                        <li>(1) お問い合わせへの返信・対応</li>
                        <li>(2) サイト運営の改善、利用状況の確認</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. 第三者提供</h2>
                    <p>
                        取得した個人情報は、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
                        ただし、サービス運営上必要な範囲で外部サービスを利用する場合があります。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. Cookie の利用</h2>
                    <p>
                        当サイトでは、利便性向上やアクセス解析のため Cookie を利用する場合があります。
                        ブラウザの設定により Cookie を無効化することも可能ですが、一部機能が正しく動作しない場合があります。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">5. 安全管理</h2>
                    <p>
                        取得した情報の漏えい、滅失、毀損等を防ぐため、合理的な範囲で安全管理措置を講じます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">6. ポリシーの変更</h2>
                    <p>
                        本ポリシーは、必要に応じて内容を変更する場合があります。
                        変更後の内容は、本ページへ掲載した時点で効力を生じます。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">7. お問い合わせ</h2>
                    <p>
                        本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年3月16日
                    </div>
                </div>
            </div>
        </div>
    );
}
