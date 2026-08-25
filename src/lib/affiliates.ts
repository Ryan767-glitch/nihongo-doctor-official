export interface AffiliateOffer {
    id: string;
    label: string;
    description: string;
    href: string;
    cta: string;
}

/**
 * A8.net など提携後のアフィリエイトリンクは環境変数で渡す。
 * 未設定の枠は非表示（空カードを出さない）。
 */
export function getAffiliateOffers(): AffiliateOffer[] {
    const offers: AffiliateOffer[] = [];

    const esimUrl = process.env.NEXT_PUBLIC_AFFILIATE_ESIM_URL?.trim();
    const esimLabel = process.env.NEXT_PUBLIC_AFFILIATE_ESIM_LABEL?.trim() || '海外eSIM';
    if (esimUrl) {
        offers.push({
            id: 'esim',
            label: esimLabel,
            description: '渡航先で病院を探すとき、地図・翻訳・保険会社への連絡に使える通信手段です。',
            href: esimUrl,
            cta: 'eSIMの案内を見る',
        });
    }

    const wifiUrl = process.env.NEXT_PUBLIC_AFFILIATE_WIFI_URL?.trim();
    const wifiLabel = process.env.NEXT_PUBLIC_AFFILIATE_WIFI_LABEL?.trim() || '海外WiFi / ポケットWiFi';
    if (wifiUrl) {
        offers.push({
            id: 'wifi',
            label: wifiLabel,
            description: '家族や同行者と共有しやすい海外WiFiです。空港受取や宅配の案内は各サービス公式を確認してください。',
            href: wifiUrl,
            cta: '海外WiFiの案内を見る',
        });
    }

    return offers;
}

export function hasAffiliateOffers() {
    return getAffiliateOffers().length > 0;
}
