import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外の日本大使館・領事館の連絡先',
    description: '渡航先の日本国大使館・総領事館の電話番号と公式サイト。入院やパスポート紛失のときの連絡先を国別に確認できます。',
    alternates: { canonical: '/embassy' },
};

export default function EmbassyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
