import { Disclaimer } from "@/components/layout/Disclaimer";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full flex flex-col">
            <Disclaimer />
            <div className="border-t py-6 md:py-0">
                <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-sm text-muted-foreground">
                    <p className="text-center leading-loose md:text-left">
                        © 2026 にほんごドクター.com
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/nearby" className="hover:underline">現在地から探す</Link>
                        <Link href="/emergency" className="hover:underline">緊急時</Link>
                        <Link href="/insurance" className="hover:underline">海外保険</Link>
                        <Link href="/embassy" className="hover:underline">大使館</Link>
                        <Link href="/phrases" className="hover:underline">フレーズ集</Link>
                        <Link href="/contact" className="hover:underline">お問い合わせ</Link>
                        <Link href="/privacy" className="hover:underline">プライバシー</Link>
                        <Link href="/terms" className="hover:underline">利用規約</Link>
                        <Link href="/disclaimer" className="hover:underline">免責事項</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
