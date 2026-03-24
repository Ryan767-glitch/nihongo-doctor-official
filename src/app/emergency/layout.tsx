import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '緊急時ガイド',
    description: '海外での緊急時に確認したい初動フローと、国・地域別の緊急連絡先をまとめています。',
};

export default function EmergencyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
