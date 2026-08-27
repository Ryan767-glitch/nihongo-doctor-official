import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外eSIM',
    description:
        'アジア・北米・ヨーロッパ・オセアニア・中南米・アフリカで日本語が通じる病院を探す前に、到着直後の通信を確保する海外eSIMの選び方。',
    alternates: { canonical: '/esim' },
};

export default function EsimLayout({ children }: { children: React.ReactNode }) {
    return children;
}
