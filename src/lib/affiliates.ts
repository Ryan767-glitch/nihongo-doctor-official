export type EsimRegion =
    | 'africa'
    | 'asia'
    | 'europe'
    | 'north-america'
    | 'oceania'
    | 'latin-america';

export type EsimDestination = EsimRegion | 'egypt' | 'kenya' | 'uae';

const JG_GOODS =
    'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BH6ULU+5HZI+BW0YB&a8ejpredirect=';
const ARUKI_GOODS =
    'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BK60MQ+5460+NSP1V&a8ejpredirect=';

function jgGoods(path: string) {
    return `${JG_GOODS}${encodeURIComponent(`https://esim-globals.com${path}`)}`;
}

function arukiGoods(path: string) {
    return `${ARUKI_GOODS}${encodeURIComponent(`https://www.esimmart.net${path}`)}`;
}

export const ESIM_OFFERS = {
    japanGlobal: {
        id: 's00000025659001',
        name: 'JAPAN&GLOBAL eSIM',
        short: '周遊プランが豊富',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BH6ULU+5HZI+5YJRM',
        africa: jgGoods('/products/africa28-esim'),
        asia: jgGoods('/products/asia-25-countries-esim'),
        europe: jgGoods('/products/euro-40countries-esim'),
        'north-america': jgGoods('/products/usa-canada-esim'),
        oceania: jgGoods('/products/oceania4-esim'),
        'latin-america': jgGoods('/products/nasacb37-esim'),
        egypt: jgGoods('/products/egypt-esim'),
        kenya: jgGoods('/products/kenya-esim'),
        uae: jgGoods('/products/united-arab-emirates-esim'),
        pixel: 'https://www13.a8.net/0.gif?a8mat=4BAFPF+BH6ULU+5HZI+5YJRM',
        rate: '購入15%',
        note: '日本語サイト。地域周遊プランと国別プランがあり、病院検索前の通信確保に向く。',
    },
    arukikata: {
        id: 's00000023868003',
        name: '地球の歩き方eSIM',
        short: '24時間日本語サポート',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BK60MQ+5460+HV7V6',
        africa: arukiGoods('/esim-africa/'),
        asia: arukiGoods('/esim-asia/'),
        europe: arukiGoods('/esim-europe/'),
        'north-america': arukiGoods('/esim-north-america/'),
        oceania: arukiGoods('/esim-oceania/'),
        'latin-america': arukiGoods('/esim-south-america/'),
        pixel: 'https://www11.a8.net/0.gif?a8mat=4BAFPF+BK60MQ+5460+HV7V6',
        rate: '購入15%',
        note: '世界200以上の国と地域。会員登録不要で最短購入。メール・チャットなど24時間日本語サポート。',
    },
    trifa: {
        id: 's00000027266001',
        name: 'トリファ（trifa）',
        short: '24時間日本語チャット',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BJKL0Y+5UDW+5YJRM',
        pixel: 'https://www15.a8.net/0.gif?a8mat=4BAFPF+BJKL0Y+5UDW+5YJRM',
        rate: '初回購入7.5%',
        note: '国内eSIMアプリ利用者数No.1。国別プラン中心。現地で繋がらないときの日本語チャット向き。',
    },
    saily: {
        id: 's00000026058001',
        name: 'Saily',
        short: 'Nord Security系のeSIM',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BKRG8I+5L2C+5YJRM',
        pixel: 'https://www13.a8.net/0.gif?a8mat=4BAFPF+BKRG8I+5L2C+5YJRM',
        rate: '新規購入10%',
        note: 'NordVPN同一グループ。アプリで渡航先を選んでインストールまで完結。病院・保険デスク連絡用に先に通信を確保したい人向け。',
    },
    tora: {
        id: 's00000026367001',
        name: 'TORA eSIM',
        short: '出発前にオンライン購入',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BGLF02+5NG6+5YRHE',
        pixel: 'https://www16.a8.net/0.gif?a8mat=4BAFPF+BGLF02+5NG6+5YRHE',
        rate: '購入15%',
        note: '現地SIM不要。料金が分かりやすいプランから選べる。',
    },
} as const;

export const ESIM_PIXELS = [
    ESIM_OFFERS.japanGlobal.pixel,
    ESIM_OFFERS.arukikata.pixel,
    ESIM_OFFERS.trifa.pixel,
    ESIM_OFFERS.saily.pixel,
    ESIM_OFFERS.tora.pixel,
] as const;

export function japanGlobalHref(destination: EsimDestination = 'africa') {
    const offer = ESIM_OFFERS.japanGlobal;
    if (destination in offer) {
        return offer[destination as keyof typeof offer] as string;
    }
    return offer.href;
}

export function arukikataHref(region: EsimRegion = 'africa') {
    return ESIM_OFFERS.arukikata[region];
}

export function esimRegionFromContinent(continentSlug?: string): EsimRegion {
    if (continentSlug === 'asia') return 'asia';
    if (continentSlug === 'europe') return 'europe';
    if (continentSlug === 'north-america') return 'north-america';
    if (continentSlug === 'oceania') return 'oceania';
    if (continentSlug === 'latin-america') return 'latin-america';
    return 'africa';
}

export function esimDestinationFromCountry(countrySlug?: string): EsimDestination {
    if (countrySlug === 'egypt') return 'egypt';
    if (countrySlug === 'kenya') return 'kenya';
    if (countrySlug === 'uae') return 'uae';
    return 'africa';
}
