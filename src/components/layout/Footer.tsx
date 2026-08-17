import { Disclaimer } from "@/components/layout/Disclaimer";
import Link from "next/link";

const groups = [
    {
        title: "病院を探す",
        links: [
            ["/asia", "アジア"],
            ["/north-america", "北米"],
            ["/europe", "ヨーロッパ"],
            ["/oceania", "オセアニア"],
            ["/latin-america", "中南米"],
            ["/africa-middle-east", "アフリカ・中東"],
            ["/nearby", "現在地から探す"],
        ],
    },
    {
        title: "いざという時",
        links: [
            ["/emergency", "緊急時ガイド"],
            ["/embassy", "大使館・領事館"],
            ["/phrases", "医療フレーズ集"],
            ["/insurance", "海外保険ガイド"],
        ],
    },
    {
        title: "このサイトについて",
        links: [
            ["/contact", "お問い合わせ"],
            ["/privacy", "プライバシーポリシー"],
            ["/terms", "利用規約"],
            ["/disclaimer", "免責事項"],
        ],
    },
] as const;

export function Footer() {
    return (
        <footer className="w-full flex flex-col">
            <Disclaimer />
            <div className="border-t bg-white">
                <div className="container mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <p className="font-bold text-foreground mb-2">
                            にほんごドクター<span className="text-primary">.com</span>
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            海外で日本語が通じる病院・クリニックを探すサイトです。受診前は必ず各医療機関へご確認ください。
                        </p>
                    </div>
                    {groups.map((group) => (
                        <div key={group.title}>
                            <p className="font-semibold text-foreground mb-3">{group.title}</p>
                            <ul className="space-y-2 text-muted-foreground">
                                {group.links.map(([href, label]) => (
                                    <li key={href}>
                                        <Link href={href} className="hover:text-primary hover:underline">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t">
                    <div className="container mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                        <p>© 2026 にほんごドクター.com</p>
                        <p>最終更新: 2026年8月17日</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
