import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '海外の病院で使える医療フレーズ集',
    description: '海外の病院・クリニックで使う日本語と現地語の医療フレーズ。症状の伝え方、受付、薬、救急時の言い方をまとめています。',
    alternates: { canonical: '/phrases' },
};

export default function PhrasesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
