import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お問い合わせ',
    description: '掲載情報の修正依頼、新規掲載のご相談、医療機関からのお問い合わせを受け付けています。',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
