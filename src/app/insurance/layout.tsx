import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外保険ガイド',
    description: '海外旅行保険の基本的な使い方や、キャッシュレス受診前に確認したいポイントをまとめています。',
};

export default function InsuranceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
