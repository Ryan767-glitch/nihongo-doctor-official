import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'このサイトについて',
    description:
        'にほんごドクター.com の運営方針と掲載の考え方。海外で日本語が通じる病院を探すための情報サイトです。医療行為や特定病院の推奨は行いません。',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    このサイトについて
                </h1>

                <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 space-y-6 text-[15px] leading-relaxed">
                    <p>
                        にほんごドクター.com は、海外旅行・駐在・留学先で日本語が通じる医療機関を探すための情報サイトです。
                        特定の医療機関や保険商品を推奨するものではなく、公開情報をもとに連絡先・日本語対応の内容・救急番号などを整理して掲載しています。
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-3">運営者</h2>
                        <p>
                            個人運営の情報サイトです。法人名・商号をここに記載できるだけの公表情報が整っていないため、
                            会社名の創作はしていません。掲載内容や修正のご連絡は
                            <Link href="/contact" className="text-primary hover:underline mx-1">
                                お問い合わせ
                            </Link>
                            から受け付けています。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-3">掲載データの出典</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>外務省「世界の医療事情」</li>
                            <li>各国の日本国大使館・総領事館の公開案内</li>
                            <li>各医療機関の公式サイト・日本語ページ</li>
                        </ul>
                        <p className="mt-3">
                            確認できた電話番号・公式URL・最終確認日を付与するよう努めています。時間が経った情報は再確認の対象です。
                            受診前は必ず各施設へ直接ご確認ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-3">やらないこと</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>医療行為・診断・治療の助言</li>
                            <li>特定病院のランキングや有料掲載による順位操作</li>
                            <li>特定の保険証券・保険募集に該当する勧誘</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-3">関連ページ</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/disclaimer" className="text-primary hover:underline">
                                    免責事項
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-primary hover:underline">
                                    プライバシーポリシー
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-primary hover:underline">
                                    利用規約
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-primary hover:underline">
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <div className="mt-12 pt-6 border-t text-sm text-gray-500 text-right">
                        最終更新日: 2026年8月25日
                    </div>
                </div>
            </div>
        </div>
    );
}
