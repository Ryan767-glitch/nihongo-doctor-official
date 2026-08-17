import { publishedClinics } from '@/lib/catalog';
import { CITY_MAP, COUNTRY_JA_MAP, COUNTRY_MAP } from '@/lib/constants';
import { getClinicCoordinates, haversineKm, type Coordinates } from '@/lib/geo';
import { getCityDisplayName, getCitySlug } from '@/lib/slugs';
import { Clinic } from '@/types';

export type NearbyOrigin = Coordinates & {
    source: 'gps' | 'city';
    label: string;
};

export type NearbyPlace = {
    city: string;
    country: string;
    label: string;
    displayCity: string;
    coords: Coordinates;
    aliases: string[];
};

const EXTRA_ALIASES: Record<string, string> = {
    bangkok: 'バンコク',
    pattaya: 'パタヤ',
    phuket: 'プーケット',
    'chiang mai': 'チェンマイ',
    chiangmai: 'チェンマイ',
    hanoi: 'ハノイ',
    'ho chi minh': 'ホーチミン',
    saigon: 'ホーチミン',
    ホーチミン市: 'ホーチミン',
    singapore: 'シンガポール',
    seoul: 'ソウル',
    busan: '釜山',
    taipei: '台北',
    'hong kong': '香港',
    hongkong: '香港',
    jakarta: 'ジャカルタ',
    bali: 'バリ',
    manila: 'マニラ',
    'kuala lumpur': 'クアラルンプール',
    kl: 'クアラルンプール',
    dubai: 'ドバイ',
    honolulu: 'ホノルル',
    hawaii: 'ハワイ（ホノルル）',
    ハワイ: 'ハワイ（ホノルル）',
    nyc: 'ニューヨーク',
    'new york': 'ニューヨーク',
    ny: 'ニューヨーク',
    'los angeles': 'ロサンゼルス',
    la: 'ロサンゼルス',
    'san francisco': 'サンフランシスコ/ベイエリア',
    sf: 'サンフランシスコ/ベイエリア',
    chicago: 'シカゴ/中西部',
    シカゴ: 'シカゴ/中西部',
    miami: 'マイアミ/フロリダ',
    マイアミ: 'マイアミ/フロリダ',
    london: 'ロンドン',
    paris: 'パリ',
    dusseldorf: 'デュッセルドルフ',
    duesseldorf: 'デュッセルドルフ',
    düsseldorf: 'デュッセルドルフ',
    frankfurt: 'フランクフルト',
    munich: 'ミュンヘン',
    berlin: 'ベルリン',
    amsterdam: 'アムステルダム',
    amstelveen: 'アムステルダムフェーン',
    geneva: 'ジュネーブ',
    sydney: 'NSW',
    シドニー: 'NSW',
    nsw: 'NSW',
    melbourne: 'VIC',
    メルボルン: 'VIC',
    vic: 'VIC',
    brisbane: 'QLD',
    ブリスベン: 'QLD',
    qld: 'QLD',
    canberra: 'ACT',
    キャンベラ: 'ACT',
    auckland: 'Auckland Region',
    オークランド: 'Auckland Region',
    christchurch: 'Christchurch',
    クライストチャーチ: 'Christchurch',
    wellington: 'Wellington',
    ウェリントン: 'Wellington',
    'sao paulo': 'サンパウロ',
};

const COUNTRY_ALIASES: Record<string, string> = {
    usa: 'United States',
    us: 'United States',
    america: 'United States',
    アメリカ: 'United States',
    米国: 'United States',
    'united states': 'United States',
    uk: '英国',
    britain: '英国',
    england: '英国',
    イギリス: '英国',
    'united kingdom': '英国',
    uae: 'UAE',
    アラブ首長国連邦: 'UAE',
    korea: '韓国',
    韓国: '韓国',
    南韓: '韓国',
    taiwan: '台湾',
    thailand: 'タイ',
    vietnam: 'ベトナム',
    malaysia: 'マレーシア',
    indonesia: 'インドネシア',
    germany: 'ドイツ',
    france: 'フランス',
    switzerland: 'スイス',
    australia: 'オーストラリア',
    'new zealand': 'ニュージーランド',
    nz: 'ニュージーランド',
};

export function normalizeNearbyQuery(value: string) {
    return value
        .normalize('NFKC')
        .replace(/[、,]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function uniqueAliases(...values: Array<string | undefined | null>) {
    const set = new Set<string>();
    for (const value of values) {
        if (!value) continue;
        const normalized = normalizeNearbyQuery(value);
        if (normalized) set.add(normalized);
    }
    return [...set];
}

let cachedPlaces: NearbyPlace[] | null = null;

export function listNearbyPlaces(): NearbyPlace[] {
    if (cachedPlaces) return cachedPlaces;
    const seen = new Set<string>();
    const places: NearbyPlace[] = [];

    for (const clinic of publishedClinics) {
        const coords = getClinicCoordinates(clinic);
        if (!coords) continue;
        const key = `${clinic.country}|${clinic.city}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const displayCity = getCityDisplayName(clinic.city);
        const countryJa = COUNTRY_JA_MAP[clinic.country] || clinic.country;
        places.push({
            city: clinic.city,
            country: clinic.country,
            displayCity,
            label: `${displayCity}（${countryJa}）`,
            coords,
            aliases: uniqueAliases(
                clinic.city,
                displayCity,
                CITY_MAP[clinic.city],
                CITY_MAP[displayCity],
                getCitySlug(clinic.city),
                countryJa,
                COUNTRY_MAP[clinic.country],
                clinic.country
            ),
        });
    }

    cachedPlaces = places;
    return places;
}

export function resolveCityOrigin(query: string): NearbyOrigin | null {
    const normalized = normalizeNearbyQuery(query);
    if (!normalized) return null;

    const aliasedCity = EXTRA_ALIASES[normalized];
    const places = listNearbyPlaces();

    const match = places.find((place) => {
        if (aliasedCity && (place.city === aliasedCity || place.displayCity === aliasedCity)) return true;
        return place.aliases.some((alias) => {
            if (alias === normalized) return true;
            if (normalized.startsWith(`${alias} `)) return true;
            return normalized.length >= 2 && alias.startsWith(normalized);
        });
    });
    if (match) {
        return { ...match.coords, source: 'city', label: match.label };
    }

    return null;
}

export function queryIsOnlyPlaceName(query: string) {
    const normalized = normalizeNearbyQuery(query);
    if (!normalized) return false;
    const origin = resolveCityOrigin(query);
    if (!origin) return false;
    const places = listNearbyPlaces();
    return places.some((place) => place.label === origin.label && place.aliases.includes(normalized));
}

export function resolveCountryName(query: string): string | null {
    const normalized = normalizeNearbyQuery(query);
    if (!normalized) return null;
    const aliased = COUNTRY_ALIASES[normalized];
    if (aliased) return aliased;

    for (const clinic of publishedClinics) {
        const names = uniqueAliases(
            clinic.country,
            COUNTRY_JA_MAP[clinic.country],
            COUNTRY_MAP[clinic.country]
        );
        if (names.includes(normalized)) return clinic.country;
    }
    return null;
}

export function clinicMatchesQuery(clinic: Clinic, query: string) {
    const normalized = normalizeNearbyQuery(query);
    if (!normalized) return true;
    const haystack = uniqueAliases(
        clinic.nameJa,
        clinic.nameEn,
        clinic.city,
        getCityDisplayName(clinic.city),
        CITY_MAP[clinic.city],
        clinic.country,
        COUNTRY_JA_MAP[clinic.country],
        COUNTRY_MAP[clinic.country],
        clinic.address,
        ...(clinic.specialties || [])
    ).join(' ');
    return normalized.split(' ').filter(Boolean).every((token) => haystack.includes(token));
}

export function featuredNearbyCities() {
    const preferred = [
        'バンコク',
        'シンガポール',
        'ソウル',
        '台北',
        'ホノルル',
        'ニューヨーク',
        'シカゴ/中西部',
        'ロンドン',
        'パリ',
        'デュッセルドルフ',
        'NSW',
        'ドバイ',
    ];
    const places = listNearbyPlaces();
    return preferred
        .map((city) => places.find((place) => place.city === city))
        .filter((place): place is NearbyPlace => Boolean(place));
}

export function distanceLabel(km: number) {
    if (km < 1) return `${Math.max(100, Math.round(km * 1000))}m`;
    if (km < 10) return `${km.toFixed(1)}km`;
    return `${Math.round(km)}km`;
}

export function nearestDistance(origin: Coordinates) {
    let best = Number.POSITIVE_INFINITY;
    let label = '';
    for (const clinic of publishedClinics) {
        const coords = getClinicCoordinates(clinic);
        if (!coords) continue;
        const km = haversineKm(origin, coords);
        if (km < best) {
            best = km;
            label = `${getCityDisplayName(clinic.city)}`;
        }
    }
    return Number.isFinite(best) ? { km: best, label } : null;
}
