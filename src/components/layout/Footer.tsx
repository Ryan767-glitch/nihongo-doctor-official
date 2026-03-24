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
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
                        <Link href="/disclaimer" className="hover:underline">免責事項</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
