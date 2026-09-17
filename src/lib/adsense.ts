/**
 * Google AdSense client ID.
 * 本番 Publisher ID をデフォルトにし、環境変数で上書き可能。
 */
export const ADSENSE_CLIENT_ID =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || 'ca-pub-5561465664199648';

export function isAdSenseEnabled() {
    return /^ca-pub-\d+$/.test(ADSENSE_CLIENT_ID);
}
