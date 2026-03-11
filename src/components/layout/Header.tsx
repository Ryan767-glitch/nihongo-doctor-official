'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { GlobalSearch } from '@/components/features/GlobalSearch';
import { cn } from '@/lib/utils';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
            <div className="border-b border-border/40">
                <div className="container mx-auto max-w-7xl flex h-16 items-center px-4">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-xl tracking-tight text-foreground">
                            にほんごドクター<span className="text-primary">.com</span>
                        </span>
                    </Link>

                    <div className="flex flex-1 items-center justify-end space-x-4">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-muted-foreground mr-4">
                            <Link href="/embassy" className="hover:text-primary transition-colors whitespace-nowrap">大使館情報</Link>
                            <Link href="/phrases" className="hover:text-primary transition-colors whitespace-nowrap">医療フレーズ集</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors whitespace-nowrap">お問い合わせ</Link>
                        </nav>
                        
                        <div className="flex items-center gap-2">
                            <GlobalSearch variant="icon" />
                            
                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-b border-border bg-background animate-in slide-in-from-top duration-200">
                    <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
                        <Link 
                            href="/embassy" 
                            className="hover:text-primary transition-colors py-2 border-b border-border/50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            大使館情報
                        </Link>
                        <Link 
                            href="/phrases" 
                            className="hover:text-primary transition-colors py-2 border-b border-border/50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            医療フレーズ集
                        </Link>
                        <Link 
                            href="/contact" 
                            className="hover:text-primary transition-colors py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            お問い合わせ
                        </Link>
                    </nav>
                </div>
            )}

            {/* Secondary Region Navigation */}
            <div className="border-b border-border/20 bg-muted/20 overflow-x-auto scrollbar-hide">
                <div className="container mx-auto max-w-7xl px-4 flex items-center justify-start h-10 gap-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
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

