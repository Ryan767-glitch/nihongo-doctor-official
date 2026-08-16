import { Clinic } from '@/types';
import { CITY_MAP, COUNTRY_MAP } from '@/lib/constants';

export const CONTINENT_SLUG_BY_NAME: Record<string, string> = {
    Asia: 'asia',
    'North America': 'north-america',
    Europe: 'europe',
    Oceania: 'oceania',
    'Latin America': 'latin-america',
    'Africa & Middle East': 'africa-middle-east',
};

export const CONTINENT_NAME_BY_SLUG: Record<string, string> = {
    asia: 'Asia',
    'north-america': 'North America',
    europe: 'Europe',
    oceania: 'Oceania',
    'latin-america': 'Latin America',
    'south-america': 'Latin America',
    africa: 'Africa & Middle East',
    'middle-east': 'Africa & Middle East',
    'africa-middle-east': 'Africa & Middle East',
};

export const CONTINENT_JA: Record<string, string> = {
    Asia: 'アジア',
    'North America': '北米',
    Europe: 'ヨーロッパ',
    Oceania: 'オセアニア',
    'Latin America': '中南米',
    'Africa & Middle East': 'アフリカ・中東',
};

export const COUNTRY_SLUG_BY_NAME: Record<string, string> = {
    タイ: 'thailand',
    ベトナム: 'vietnam',
    マレーシア: 'malaysia',
    インドネシア: 'indonesia',
    フィリピン: 'philippines',
    中国: 'china',
    '中国（香港）': 'hong-kong',
    カンボジア: 'cambodia',
    ラオス: 'laos',
    ミャンマー: 'myanmar',
    シンガポール: 'singapore',
    韓国: 'south-korea',
    台湾: 'taiwan',
    エジプト: 'egypt',
    ケニア: 'kenya',
    南アフリカ: 'south-africa',
    エチオピア: 'ethiopia',
    タンザニア: 'tanzania',
    ナイジェリア: 'nigeria',
    'United States': 'united-states',
    Canada: 'canada',
    英国: 'united-kingdom',
    フランス: 'france',
    ドイツ: 'germany',
    オランダ: 'netherlands',
    スイス: 'switzerland',
    スペイン: 'spain',
    イタリア: 'italy',
    オーストリア: 'austria',
    ベルギー: 'belgium',
    ブラジル: 'brazil',
    アルゼンチン: 'argentina',
    チリ: 'chile',
    ペルー: 'peru',
    コロンビア: 'colombia',
    オーストラリア: 'australia',
    ニュージーランド: 'new-zealand',
    UAE: 'uae',
    アラブ首長国連邦: 'uae',
};

export const CITY_SLUG_BY_NAME: Record<string, string> = {
    バンコク: 'bangkok',
    シラチャ: 'sriracha',
    チェンマイ: 'chiang-mai',
    プーケット: 'phuket',
    サムイ島: 'samui',
    パタヤ: 'pattaya',
    ハノイ: 'hanoi',
    ホーチミン: 'ho-chi-minh',
    ダナン: 'da-nang',
    クアラルンプール: 'kuala-lumpur',
    ペナン: 'penang',
    ジョホールバル: 'johor-bahru',
    コタキナバル: 'kota-kinabalu',
    ジャカルタ: 'jakarta',
    バリ: 'bali',
    スラバヤ: 'surabaya',
    マニラ: 'manila',
    セブ: 'cebu',
    上海: 'shanghai',
    北京: 'beijing',
    広州: 'guangzhou',
    香港: 'hong-kong',
    プノンペン: 'phnom-penh',
    シェムリアップ: 'siem-reap',
    ビエンチャン: 'vientiane',
    ヤンゴン: 'yangon',
    シンガポール: 'singapore',
    ソウル: 'seoul',
    釜山: 'busan',
    台北: 'taipei',
    高雄: 'kaohsiung',
    台中: 'taichung',
    カイロ: 'cairo',
    ナイロビ: 'nairobi',
    ヨハネスブルグ: 'johannesburg',
    プレトリア: 'pretoria',
    センチュリオン: 'centurion',
    アディスアベバ: 'addis-ababa',
    ダルエスサラーム: 'dar-es-salaam',
    ラゴス: 'lagos',
    ロンドン: 'london',
    パリ: 'paris',
    デュッセルドルフ: 'dusseldorf',
    ミュンヘン: 'munich',
    フランクフルト: 'frankfurt',
    ベルリン: 'berlin',
    アムステルダム: 'amsterdam',
    アムステルダムフェーン: 'amstelveen',
    ジュネーブ: 'geneva',
    チューリッヒ: 'zurich',
    バルセロナ: 'barcelona',
    'バルセロナ（通訳）': 'barcelona-interpreter',
    マドリード: 'madrid',
    ミラノ: 'milan',
    ローマ: 'rome',
    ウィーン: 'vienna',
    ブリュッセル: 'brussels',
    サンパウロ: 'sao-paulo',
    ブエノスアイレス: 'buenos-aires',
    サンティアゴ: 'santiago',
    リマ: 'lima',
    クスコ: 'cusco',
    ボゴタ: 'bogota',
    クリチバ: 'curitiba',
    ポルトアレグレ: 'porto-alegre',
    リオデジャネイロ: 'rio-de-janeiro',
    シドニー: 'sydney',
    メルボルン: 'melbourne',
    ACT: 'canberra',
    NSW: 'sydney',
    QLD: 'brisbane',
    VIC: 'melbourne',
    'Auckland Region': 'auckland',
    Christchurch: 'christchurch',
    Wellington: 'wellington',
    ニューヨーク: 'new-york',
    ニュージャージー: 'new-jersey',
    ロサンゼルス: 'los-angeles',
    'サンフランシスコ/ベイエリア': 'san-francisco',
    'ワシントンDC/MD/VA': 'washington-dc',
    'シカゴ/中西部': 'chicago',
    'ハワイ（ホノルル）': 'honolulu',
    ホノルル: 'honolulu',
    'マイアミ/フロリダ': 'miami',
    グアム: 'guam',
    サイパン: 'saipan',
    'エドモントン（AB州）': 'edmonton',
    'オタワ（ON州）': 'ottawa',
    'カルガリー（AB州）': 'calgary',
    'トロント（ON州）': 'toronto',
    'バンクーバー（BC州）': 'vancouver',
    'モントリオール（QC州）': 'montreal',
    Dubai: 'dubai',
    ドバイ: 'dubai',
    アブダビ: 'abu-dhabi',
};

function asciiSlug(value: string) {
    return value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[（(].*?[）)]/g, ' ')
        .replace(/[^\w\s-]/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/[\s/_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function slugifyLabel(value: string) {
    if (COUNTRY_SLUG_BY_NAME[value]) return COUNTRY_SLUG_BY_NAME[value];
    if (CITY_SLUG_BY_NAME[value]) return CITY_SLUG_BY_NAME[value];
    if (CITY_MAP[value]) return asciiSlug(CITY_MAP[value]);
    if (COUNTRY_MAP[value]) return asciiSlug(COUNTRY_MAP[value]);
    return asciiSlug(value) || 'unknown';
}

export function getContinentSlug(continent: string) {
    return CONTINENT_SLUG_BY_NAME[continent] || asciiSlug(continent);
}

export function getCountrySlug(country: string) {
    return COUNTRY_SLUG_BY_NAME[country] || slugifyLabel(country);
}

export function getCitySlug(city: string) {
    return CITY_SLUG_BY_NAME[city] || slugifyLabel(city);
}

export function getClinicSlug(clinic: Pick<Clinic, 'id' | 'nameEn' | 'nameJa'>) {
    const base = slugifyLabel(clinic.nameEn || clinic.nameJa);
    return `${base || 'clinic'}-${clinic.id}`;
}

export function getClinicHref(clinic: Pick<Clinic, 'id' | 'nameEn' | 'nameJa' | 'continent' | 'country' | 'city'>) {
    return `/${getContinentSlug(clinic.continent)}/${getCountrySlug(clinic.country)}/${getCitySlug(clinic.city)}/${getClinicSlug(clinic)}`;
}

export function getCountryHref(continent: string, country: string) {
    return `/${getContinentSlug(continent)}/${getCountrySlug(country)}`;
}

export function getCityHref(continent: string, country: string, city: string) {
    return `/${getContinentSlug(continent)}/${getCountrySlug(country)}/${getCitySlug(city)}`;
}

export function displayClinicName(clinic: Pick<Clinic, 'nameJa' | 'nameEn'>) {
    const ja = clinic.nameJa?.replace(/\s*\n+\s*/g, ' ').trim() || '';
    const match = ja.match(/^(.*?)[（(](.*?)[）)]$/);
    if (match && /[\u3040-\u30ff\u4e00-\u9faf]/.test(match[2])) {
        return match[2];
    }
    if (/[\u3040-\u30ff\u4e00-\u9faf]/.test(ja)) return ja;
    return ja || clinic.nameEn;
}
