import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外の救急番号・緊急時ガイド',
    description: '海外で急病になったときの初動と、国別の救急・警察番号。日本語が通じる病院を探す前に使う緊急時ガイドです。',
    alternates: { canonical: '/emergency' },
};

export default function EmergencyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
