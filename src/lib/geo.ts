import { Clinic } from '@/types';

export type Coordinates = { lat: number; lng: number };

const CITY_COORDINATES: Record<string, Coordinates> = {
    バンコク: { lat: 13.7563, lng: 100.5018 },
    シラチャ: { lat: 13.1738, lng: 100.9311 },
    チェンマイ: { lat: 18.7883, lng: 98.9853 },
    プーケット: { lat: 7.8804, lng: 98.3923 },
    サムイ島: { lat: 9.512, lng: 100.0136 },
    パタヤ: { lat: 12.9236, lng: 100.8825 },
    ハノイ: { lat: 21.0278, lng: 105.8342 },
    ホーチミン: { lat: 10.8231, lng: 106.6297 },
    クアラルンプール: { lat: 3.139, lng: 101.6869 },
    ペナン: { lat: 5.4141, lng: 100.3288 },
    コタキナバル: { lat: 5.9804, lng: 116.0735 },
    ジャカルタ: { lat: -6.2088, lng: 106.8456 },
    バリ: { lat: -8.6705, lng: 115.2126 },
    スラバヤ: { lat: -7.2575, lng: 112.7521 },
    マニラ: { lat: 14.5995, lng: 120.9842 },
    北京: { lat: 39.9042, lng: 116.4074 },
    香港: { lat: 22.3193, lng: 114.1694 },
    プノンペン: { lat: 11.5564, lng: 104.9282 },
    シェムリアップ: { lat: 13.3633, lng: 103.8564 },
    ビエンチャン: { lat: 17.9757, lng: 102.6331 },
    ヤンゴン: { lat: 16.8409, lng: 96.1735 },
    シンガポール: { lat: 1.3521, lng: 103.8198 },
    ソウル: { lat: 37.5665, lng: 126.978 },
    釜山: { lat: 35.1796, lng: 129.0756 },
    台北: { lat: 25.033, lng: 121.5654 },
    高雄: { lat: 22.6273, lng: 120.3014 },
    ニューヨーク: { lat: 40.7128, lng: -74.006 },
    ニュージャージー: { lat: 40.7357, lng: -74.1724 },
    ロサンゼルス: { lat: 34.0522, lng: -118.2437 },
    'サンフランシスコ/ベイエリア': { lat: 37.7749, lng: -122.4194 },
    'ワシントンDC/MD/VA': { lat: 38.9072, lng: -77.0369 },
    'シカゴ/中西部': { lat: 41.8781, lng: -87.6298 },
    'ハワイ（ホノルル）': { lat: 21.3069, lng: -157.8583 },
    ホノルル: { lat: 21.3069, lng: -157.8583 },
    'マイアミ/フロリダ': { lat: 25.7617, lng: -80.1918 },
    グアム: { lat: 13.4443, lng: 144.7937 },
    サイパン: { lat: 15.1778, lng: 145.750967 },
    'トロント（ON州）': { lat: 43.6532, lng: -79.3832 },
    'バンクーバー（BC州）': { lat: 49.2827, lng: -123.1207 },
    'カルガリー（AB州）': { lat: 51.0447, lng: -114.0719 },
    'エドモントン（AB州）': { lat: 53.5461, lng: -113.4938 },
    'オタワ（ON州）': { lat: 45.4215, lng: -75.6972 },
    'モントリオール（QC州）': { lat: 45.5017, lng: -73.5673 },
    ロンドン: { lat: 51.5074, lng: -0.1278 },
    パリ: { lat: 48.8566, lng: 2.3522 },
    ベルリン: { lat: 52.52, lng: 13.405 },
    ミュンヘン: { lat: 48.1351, lng: 11.582 },
    フランクフルト: { lat: 50.1109, lng: 8.6821 },
    デュッセルドルフ: { lat: 51.2277, lng: 6.7735 },
    アムステルダム: { lat: 52.3676, lng: 4.9041 },
    アムステルダムフェーン: { lat: 52.308, lng: 4.849 },
    ジュネーブ: { lat: 46.2044, lng: 6.1432 },
    バルセロナ: { lat: 41.3874, lng: 2.1686 },
    'バルセロナ（通訳）': { lat: 41.3874, lng: 2.1686 },
    ミラノ: { lat: 45.4642, lng: 9.19 },
    ローマ: { lat: 41.9028, lng: 12.4964 },
    ウィーン: { lat: 48.2082, lng: 16.3738 },
    ブリュッセル: { lat: 50.8503, lng: 4.3517 },
    シドニー: { lat: -33.8688, lng: 151.2093 },
    NSW: { lat: -33.8688, lng: 151.2093 },
    VIC: { lat: -37.8136, lng: 144.9631 },
    QLD: { lat: -27.4698, lng: 153.0251 },
    ACT: { lat: -35.2809, lng: 149.13 },
    'Auckland Region': { lat: -36.8509, lng: 174.7645 },
    Christchurch: { lat: -43.5321, lng: 172.6362 },
    Wellington: { lat: -41.2865, lng: 174.7762 },
    サンパウロ: { lat: -23.5558, lng: -46.6396 },
    リオデジャネイロ: { lat: -22.9068, lng: -43.1729 },
    クリチバ: { lat: -25.4284, lng: -49.2733 },
    ポルトアレグレ: { lat: -30.0346, lng: -51.2177 },
    ブエノスアイレス: { lat: -34.6037, lng: -58.3816 },
    サンティアゴ: { lat: -33.4489, lng: -70.6693 },
    リマ: { lat: -12.0464, lng: -77.0428 },
    クスコ: { lat: -13.5319, lng: -71.9675 },
    ボゴタ: { lat: 4.711, lng: -74.0721 },
    Dubai: { lat: 25.2048, lng: 55.2708 },
    ドバイ: { lat: 25.2048, lng: 55.2708 },
    カイロ: { lat: 30.0444, lng: 31.2357 },
    ナイロビ: { lat: -1.2921, lng: 36.8219 },
    ヨハネスブルグ: { lat: -26.2041, lng: 28.0473 },
    プレトリア: { lat: -25.7479, lng: 28.2293 },
    センチュリオン: { lat: -25.8603, lng: 28.1894 },
    アディスアベバ: { lat: 9.0192, lng: 38.7525 },
    ダルエスサラーム: { lat: -6.7924, lng: 39.2083 },
    ラゴス: { lat: 6.5244, lng: 3.3792 },
};

export function getClinicCoordinates(clinic: Clinic): Coordinates | null {
    if (typeof clinic.lat === 'number' && typeof clinic.lng === 'number') {
        return { lat: clinic.lat, lng: clinic.lng };
    }
    return CITY_COORDINATES[clinic.city] ?? null;
}

export function haversineKm(from: Coordinates, to: Coordinates) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earthRadius = 6371;
    const dLat = toRad(to.lat - from.lat);
    const dLng = toRad(to.lng - from.lng);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2;
    return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sortClinicsByDistance(clinics: Clinic[], origin: Coordinates) {
    return clinics
        .map((clinic) => {
            const coords = getClinicCoordinates(clinic);
            return {
                clinic,
                distanceKm: coords ? haversineKm(origin, coords) : Number.POSITIVE_INFINITY,
            };
        })
        .filter((item) => Number.isFinite(item.distanceKm))
        .sort((a, b) => a.distanceKm - b.distanceKm);
}
