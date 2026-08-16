'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { GlobalSearch } from '@/components/features/GlobalSearch';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full flex flex-col">
            <div className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-sky-100/80 pt-[env(safe-area-inset-top)]">
                <div className="container mx-auto max-w-7xl flex h-14 sm:h-16 items-center px-3 sm:px-4">
                    <Link href="/" className="mr-3 sm:mr-6 flex min-w-0 items-center">
                        <span className="font-bold text-[15px] sm:text-xl tracking-tight text-foreground truncate">
                            にほんごドクター<span className="text-primary">.com</span>
                        </span>
                    </Link>

                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6 text-sm font-medium text-muted-foreground mr-4">
                            <Link href="/nearby" className="hover:text-primary transition-colors whitespace-nowrap">現在地から探す</Link>
                            <Link href="/emergency" className="hover:text-primary transition-colors whitespace-nowrap">緊急時</Link>
                            <Link href="/embassy" className="hover:text-primary transition-colors whitespace-nowrap">大使館</Link>
                            <Link href="/phrases" className="hover:text-primary transition-colors whitespace-nowrap">フレーズ集</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors whitespace-nowrap">お問い合わせ</Link>
                        </nav>

                        <div className="flex items-center gap-2">
                            <GlobalSearch variant="icon" />

                            <button
                                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top duration-200">
                        <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
                            {[
                                ['/nearby', '現在地から探す'],
                                ['/emergency', '緊急時ガイド'],
                                ['/insurance', '海外保険'],
                                ['/embassy', '大使館情報'],
                                ['/phrases', '医療フレーズ集'],
                                ['/contact', 'お問い合わせ'],
                            ].map(([href, label]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="hover:text-primary transition-colors py-3 min-h-[48px] flex items-center border-b border-border/50 last:border-b-0"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            <div className="h-14 sm:h-16 shrink-0" />

            <div className="border-b border-sky-100/70 bg-white overflow-x-auto scrollbar-hide">
                <div className="container mx-auto max-w-7xl px-4 flex items-center justify-start h-10 gap-5 sm:gap-6 text-sm font-medium text-slate-500 whitespace-nowrap pr-8">
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
