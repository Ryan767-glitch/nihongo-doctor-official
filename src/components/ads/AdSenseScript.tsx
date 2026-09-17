import Script from 'next/script';
import { ADSENSE_CLIENT_ID, isAdSenseEnabled } from '@/lib/adsense';

/**
 * Loads AdSense (Auto ads / サイト所有権確認用).
 * Publisher ID 未設定時は何も出さない。
 * beforeInteractive で初期 HTML に置き、AdSense の所有権確認に通りやすくする。
 */
export function AdSenseScript() {
    if (!isAdSenseEnabled()) return null;

    return (
        <Script
            id="adsense-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
    );
}
