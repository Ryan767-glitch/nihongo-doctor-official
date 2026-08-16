import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container mx-auto max-w-xl py-20 px-4 text-center">
            <p className="text-sm text-primary font-semibold mb-2">404</p>
            <h1 className="text-3xl font-bold mb-4">ページが見つかりません</h1>
            <p className="text-muted-foreground mb-8">
                アドレスが変わったか、削除された可能性があります。トップから病院を探してください。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link href="/" className="bg-primary text-white px-5 py-3 rounded-xl font-semibold">トップへ</Link>
                <Link href="/nearby" className="border px-5 py-3 rounded-xl font-semibold">現在地から探す</Link>
                <Link href="/emergency" className="border px-5 py-3 rounded-xl font-semibold">緊急時ガイド</Link>
            </div>
        </div>
    );
}
