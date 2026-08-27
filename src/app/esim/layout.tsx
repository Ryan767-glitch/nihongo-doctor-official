import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外eSIM',
    description:
        'アフリカ・中東で日本語が通じる病院を探す前に、到着直後の通信を確保する海外eSIMの選び方。エジプト・ケニア・UAE向けプランを比較しています。',
    alternates: { canonical: '/esim/africa' },
};

export default function EsimLayout({ children }: { children: React.ReactNode }) {
    return children;
}
