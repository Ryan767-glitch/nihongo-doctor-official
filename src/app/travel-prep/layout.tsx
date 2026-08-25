import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '渡航前の通信準備（eSIM・海外WiFi）',
    description:
        '海外で病院を探す前に、eSIMや海外WiFiなど通信手段を整えるための案内。地図・翻訳・保険会社への連絡に使います。保険の勧誘ではありません。',
    alternates: { canonical: '/travel-prep' },
};

export default function TravelPrepLayout({ children }: { children: React.ReactNode }) {
    return children;
}
