import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '大使館・領事館情報',
    description: '各国の日本大使館・総領事館の連絡先や公式サイトを確認できます。緊急時の備えにご利用ください。',
};

export default function EmbassyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
