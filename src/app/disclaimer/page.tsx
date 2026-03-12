import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '免責事項 | にほんごドクター.com',
    description: 'にほんごドクター.comの免責事項',
};

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    免責事項 / Disclaimer
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-8">にほんごドクター.com 免責事項</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. 医療情報について</h2>
                    <p>
                        本サイトに掲載されている情報は、一般的な参考情報の提供を目的としたものであり、医療上のアドバイス、診断、または治療の代替となるものではありません。医療に関する判断は、必ず資格を持つ医療専門家にご相談ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. 情報の正確性について</h2>
                    <p>
                        本サイトは掲載情報の正確性・最新性の維持に最善を尽くしておりますが、医療機関の診療時間・対応言語・スタッフ・サービス内容等は予告なく変更される場合があります。掲載情報の完全性・正確性・適時性について、当サイトは一切の保証をいたしません。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. 緊急時の対応について</h2>
                    <p>
                        医療上の緊急事態が発生した場合は、本サイトの情報に依存せず、直ちに現地の救急サービス（119番相当）または最寄りの救急病院に連絡してください。海外渡航中の緊急時には、在外日本国大使館・総領事館にもご連絡ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. 受診前の事前確認について</h2>
                    <p>
                        各医療施設の診療状況（営業時間・日本語対応の可否・保険の取り扱い・予約の要否等）は変動する場合があります。受診前に必ず各施設へ直接お問い合わせのうえ、最新の情報をご確認ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">5. 外部リンクについて</h2>
                    <p>
                        本サイトには外部サイトへのリンクが含まれる場合があります。リンク先のコンテンツ・サービスについて当サイトは責任を負いません。リンク先サイトの利用は、各サイトの利用規約・ポリシーに従ってください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">6. 損害について</h2>
                    <p>
                        本サイトの情報を利用したことにより生じた損害（医療上の結果を含む）について、当サイト運営者は一切の責任を負いません。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">7. 免責事項の変更</h2>
                    <p>
                        本免責事項は、運営者の判断により予告なく変更される場合があります。変更後の内容は本ページに掲載した時点で効力を生じます。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年3月12日
                    </div>
                </div>
            </div>
        </div>
    );
}
