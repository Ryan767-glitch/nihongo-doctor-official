import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約 | にほんごドクター.com',
    description: 'にほんごドクター.com の利用規約',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    利用規約
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-8">にほんごドクター.com 利用規約</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第1条 本サービスの目的</h2>
                    <p>
                        にほんごドクター.com は、海外で日本語対応の医療機関を探すための情報提供を目的としたサービスです。
                        利用者は、本規約に同意のうえ本サービスを利用するものとします。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第2条 情報の利用</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>本サービスの掲載情報は、受診先の検討を補助する目的で提供しています。</li>
                        <li>掲載情報の正確性、完全性、最新性について保証するものではありません。</li>
                        <li>医療判断、診断、治療、緊急対応は、必ず医療機関または公的機関へ直接ご確認ください。</li>
                        <li>利用者は自己の責任において本サービスを利用するものとします。</li>
                    </ol>

                    <h2 className="text-xl font-bold mt-8 mb-4">第3条 禁止事項</h2>
                    <p>
                        法令または公序良俗に反する行為、本サービスの運営を妨げる行為、
                        他者の権利を侵害する行為、その他当サイトが不適切と判断する行為を禁止します。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第4条 個人情報の取扱い</h2>
                    <p>
                        お問い合わせ等で取得する個人情報の取扱いについては、
                        プライバシーポリシーに従うものとします。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第5条 サービスの変更・停止</h2>
                    <p>
                        当サイトは、必要に応じて本サービスの内容変更、停止、終了を行うことがあります。
                        これにより生じた損害について、当サイトは責任を負いません。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">第6条 規約の改定</h2>
                    <p>
                        本規約は、必要に応じて予告なく改定する場合があります。
                        改定後の内容は、本ページに掲載した時点で効力を生じます。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年3月16日
                    </div>
                </div>
            </div>
        </div>
    );
}
