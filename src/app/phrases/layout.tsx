import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '医療フレーズ集',
    description: '海外での受診時に使える医療フレーズを、日本語と現地語の対訳で確認できます。',
};

export default function PhrasesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
