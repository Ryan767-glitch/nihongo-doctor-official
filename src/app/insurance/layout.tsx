import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外の病院で保険を使う前に',
    description: '海外旅行保険・キャッシュレス診療の使い方。日本語が通じる病院を探す前に確認したい、保険会社への連絡と請求のポイントです。',
    alternates: { canonical: '/insurance' },
};

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
