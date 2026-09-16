import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Luggage, Stethoscope } from 'lucide-react';
import { JsonLd } from '@/components/features/JsonLd';
import { breadcrumbJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: '海外の病気・ケガ対策ガイド',
    description:
        '海外で病気やケガをしたときの対処法、出発前に準備すべき保険・通信・クレジットカードをまとめたガイド。日本語が通じる病院の探し方とあわせて、旅のトラブルに備えられます。',
    alternates: { canonical: '/guide' },
    openGraph: {
        title: '海外の病気・ケガ対策ガイド | にほんごドクター.com',
        description: '海外で病気やケガをしたときの対処法と、出発前の準備をまとめたガイド。',
        url: `${SITE_URL}/guide`,
        locale: 'ja_JP',
        type: 'website',
    },
};

const guides = [
    {
        href: '/guide/sick-abroad',
        icon: Stethoscope,
        title: '海外で病気・ケガをしたときの対処法',
        body: '症状別の受診先の選び方、保険会社への連絡順序、支払いと請求の流れ。まず何をすればいいかを手順で整理しました。',
    },
    {
        href: '/guide/prepare',
        icon: Luggage,
        title: '出発前の準備チェックリスト',
        body: '海外旅行保険・通信（eSIM）・クレジットカード・常備薬。病気やケガに備えるために、出発前にやっておくべきこと。',
    },
];

export default function GuideIndexPage() {
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'にほんごドクター.com', href: '/' },
                    { name: '海外の病気・ケガ対策ガイド', href: '/guide' },
                ])}
            />
            <div className="container mx-auto max-w-4xl py-10 px-4 min-h-[100dvh]">
                <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">トップ</Link>
                    <span>/</span>
                    <span className="text-foreground">ガイド</span>
                </div>

                <header className="mb-10">
                    <p className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        ガイド
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        海外の病気・ケガ対策ガイド
                    </h1>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                        旅先で具合が悪くなったとき、日本語が通じる病院の探し方だけでなく、
                        保険・通信・支払いの知識があると対応が速くなります。読んでおくと安心なガイドをまとめました。
                    </p>
                </header>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {guides.map((guide) => (
                        <Link
                            key={guide.href}
                            href={guide.href}
                            className="rounded-2xl border bg-white p-6 hover:border-primary hover:shadow-md transition-all"
                        >
                            <guide.icon className="h-6 w-6 text-primary mb-3" />
                            <h2 className="font-bold text-foreground">{guide.title}</h2>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{guide.body}</p>
                        </Link>
                    ))}
                </div>

                <section className="rounded-2xl border bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-600">
                    <p>
                        すでに症状が出ている場合は
                        <Link href="/symptom" className="text-primary hover:underline mx-1">症状から病院を探す</Link>
                        か
                        <Link href="/nearby" className="text-primary hover:underline mx-1">現在地から探す</Link>
                        から、日本語が通じる受診先を確認してください。緊急時は
                        <Link href="/emergency" className="text-primary hover:underline mx-1">各国の緊急番号</Link>
                        へ。
                    </p>
                </section>
            </div>
        </>
    );
}
