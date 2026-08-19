import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外の病院で保険を使う前に',
    description: '海外旅行保険の使い方とキャッシュレス受診の確認ポイント。ソウル・バンコク・ハワイなど日本語が通じる病院を探す前に、保険会社への連絡方法をまとめています。',
    alternates: { canonical: '/insurance' },
};

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
