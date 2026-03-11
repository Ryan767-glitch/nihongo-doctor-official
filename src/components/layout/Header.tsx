import Link from 'next/link';
import { Stethoscope, Search, Menu } from 'lucide-react';
import { GlobalSearch } from '@/components/features/GlobalSearch';
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
            <div className="border-b border-border/40">
                <div className="container flex h-16 items-center px-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Stethoscope className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-foreground">
                            NihongoDoctor<span className="text-primary">.com</span>
                        </span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <GlobalSearch variant="icon" />
                        <nav className="flex items-center space-x-3">
                            <LanguageSwitcher />
                        </nav>
                    </div>
                </div>
            </div>
            {/* Secondary Region Navigation */}
            <div className="border-b border-border/20 bg-muted/20 overflow-x-auto scrollbar-hide">
                <div className="container px-4 flex items-center h-10 gap-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
                    <Link href="/asia" className="hover:text-primary transition-colors">アジア (Asia)</Link>
                    <Link href="/north-america" className="hover:text-primary transition-colors">北米 (N. America)</Link>
                    <Link href="/latin-america" className="hover:text-primary transition-colors">中南米 (LatAm)</Link>
                    <Link href="/europe" className="hover:text-primary transition-colors">ヨーロッパ (Europe)</Link>
                    <Link href="/oceania" className="hover:text-primary transition-colors">オセアニア (Oceania)</Link>
                    <Link href="/africa-middle-east" className="hover:text-primary transition-colors">アフリカ・中東 (Africa/ME)</Link>
                </div>
            </div>
            <GlobalSearch variant="modal" />
        </header>
    );
}
