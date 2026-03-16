import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '免責事項 | にほんごドクター.com',
    description: 'にほんごドクター.com の免責事項',
};

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    免責事項
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                    <p className="font-bold text-gray-800 mb-8">にほんごドクター.com 免責事項</p>

                    <h2 className="text-xl font-bold mt-8 mb-4">1. 掲載情報について</h2>
                    <p>
                        当サイトに掲載している医療機関、大使館情報、緊急連絡先、保険案内、医療フレーズ等は、
                        公開情報や各種資料をもとに作成しています。正確性の確保に努めていますが、
                        内容の完全性、最新性、有用性を保証するものではありません。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">2. 医療判断について</h2>
                    <p>
                        当サイトは医療機関の受診先探しを補助する情報提供サービスであり、
                        医師による診断、治療、助言に代わるものではありません。体調不良や緊急時には、
                        必ず現地の医療機関や公的機関へ直接ご相談ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">3. 外部サイトへのリンクについて</h2>
                    <p>
                        当サイトには外部サイトへのリンクが含まれる場合があります。リンク先の内容、
                        正確性、安全性、利用可否について、当サイトは一切責任を負いません。
                        利用前に各公式サイト等で最新情報をご確認ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">4. 損害等の責任について</h2>
                    <p>
                        当サイトの利用、または利用できなかったことにより生じたいかなる損害についても、
                        当サイト運営者は責任を負いません。利用者ご自身の判断と責任においてご利用ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">5. 情報の変更・削除について</h2>
                    <p>
                        掲載内容は予告なく変更、修正、削除されることがあります。医療機関の受付時間、
                        診療科目、日本語対応状況などは変更される場合があるため、受診前に直接確認することをおすすめします。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">6. 著作権について</h2>
                    <p>
                        当サイトに掲載されている文章、構成、デザインその他の内容の著作権は、
                        特段の記載がない限り当サイト運営者または正当な権利者に帰属します。
                        無断転載、複製、再配布はご遠慮ください。
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">7. 免責事項の改定</h2>
                    <p>
                        本免責事項は、必要に応じて予告なく改定する場合があります。
                        改定後の内容は本ページに掲載した時点から効力を生じます。
                    </p>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年3月16日
                    </div>
                </div>
            </div>
        </div>
    );
}
