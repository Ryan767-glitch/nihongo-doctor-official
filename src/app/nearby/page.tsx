import type { Metadata } from 'next';
import { NearbyClinics } from '@/components/features/NearbyClinics';

export const metadata: Metadata = {
    title: '現在地から近い日本語対応病院',
    description: 'いまいる場所から近い、海外の日本語対応病院・クリニックを探します。スマホの位置情報を使って近くの受診先を表示します。',
};

export default function NearbyPage() {
    return (
        <div className="container mx-auto max-w-5xl py-10 px-4">
            <h1 className="text-3xl font-bold mb-3">現在地から近い病院</h1>
            <p className="text-muted-foreground mb-8">
                位置情報はブラウザ内だけで距離計算に使い、サーバーには送りません。許可できない場合は都市名でも探せます。
            </p>
            <NearbyClinics />
        </div>
    );
}
