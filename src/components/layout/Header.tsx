import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { GlobalSearch } from '@/components/features/GlobalSearch';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
            <div className="border-b border-border/40">
                <div className="container flex h-16 items-center px-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-foreground">
                            にほんごドクター<span className="text-primary">.com</span>
                        </span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium text-muted-foreground">
                            <Link href="/embassy" className="hover:text-primary transition-colors whitespace-nowrap">大使館情報</Link>
                            <Link href="/phrases" className="hover:text-primary transition-colors whitespace-nowrap">医療フレーズ集</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors whitespace-nowrap">お問い合わせ</Link>
                        </nav>
                        <GlobalSearch variant="icon" />
                    </div>
                </div>
            </div>
            {/* Secondary Region Navigation */}
            <div className="border-b border-border/20 bg-muted/20 overflow-x-auto scrollbar-hide">
                <div className="container px-4 flex items-center justify-center lg:justify-start h-10 gap-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
                    <Link href="/asia" className="hover:text-primary transition-colors">アジア</Link>
                    <Link href="/north-america" className="hover:text-primary transition-colors">北米</Link>
                    <Link href="/latin-america" className="hover:text-primary transition-colors">中南米</Link>
                    <Link href="/europe" className="hover:text-primary transition-colors">ヨーロッパ</Link>
                    <Link href="/oceania" className="hover:text-primary transition-colors">オセアニア</Link>
                    <Link href="/africa-middle-east" className="hover:text-primary transition-colors">アフリカ・中東</Link>
                </div>
            </div>
            <GlobalSearch variant="modal" />
        </header>
    );
}
