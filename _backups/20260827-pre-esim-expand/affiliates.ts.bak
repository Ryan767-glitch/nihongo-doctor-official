export type EsimDestination = 'africa' | 'egypt' | 'kenya' | 'uae';

const JG_GOODS =
    'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BH6ULU+5HZI+BW0YB&a8ejpredirect=';

function goods(path: string) {
    return `${JG_GOODS}${encodeURIComponent(`https://esim-globals.com${path}`)}`;
}

export const ESIM_OFFERS = {
    japanGlobal: {
        id: 's00000025659001',
        name: 'JAPAN&GLOBAL eSIM',
        short: 'アフリカ周遊28地域',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BH6ULU+5HZI+5YJRM',
        africa: goods('/products/africa28-esim'),
        egypt: goods('/products/egypt-esim'),
        kenya: goods('/products/kenya-esim'),
        uae: goods('/products/united-arab-emirates-esim'),
        pixel: 'https://www13.a8.net/0.gif?a8mat=4BAFPF+BH6ULU+5HZI+5YJRM',
        rate: '購入15%',
        note: '日本語サイト。アフリカ周遊28地域とエジプト・ケニア・UAEの国別プランあり。',
    },
    trifa: {
        id: 's00000027266001',
        name: 'トリファ（trifa）',
        short: '24時間日本語サポート',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BJKL0Y+5UDW+5YJRM',
        pixel: 'https://www15.a8.net/0.gif?a8mat=4BAFPF+BJKL0Y+5UDW+5YJRM',
        rate: '初回購入7.5%',
        note: '国内eSIMアプリ利用者数No.1。エジプト・ケニア・南アフリカなど国別プラン。現地で繋がらないときの日本語チャット向き。',
    },
    saily: {
        id: 's00000026058001',
        name: 'Saily',
        short: 'Nord Security系のeSIM',
        href: 'https://px.a8.net/svt/ejp?a8mat=4BAFPF+BKRG8I+5L2C+5YJRM',
        pixel: 'https://www13.a8.net/0.gif?a8mat=4BAFPF+BKRG8I+5L2C+5YJRM',
        rate: '新規購入10%',
        note: 'NordVPN同一グループ。アプリで渡航先を選んでインストールまで完結。病院・保険デスクへの連絡用に先に通信を確保したい人向け。',
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
    ESIM_OFFERS.trifa.pixel,
    ESIM_OFFERS.saily.pixel,
    ESIM_OFFERS.tora.pixel,
] as const;

export function japanGlobalHref(destination: EsimDestination = 'africa') {
    if (destination === 'egypt') return ESIM_OFFERS.japanGlobal.egypt;
    if (destination === 'kenya') return ESIM_OFFERS.japanGlobal.kenya;
    if (destination === 'uae') return ESIM_OFFERS.japanGlobal.uae;
    return ESIM_OFFERS.japanGlobal.africa;
}

export function esimDestinationFromCountry(countrySlug?: string): EsimDestination {
    if (countrySlug === 'egypt') return 'egypt';
    if (countrySlug === 'kenya') return 'kenya';
    if (countrySlug === 'uae') return 'uae';
    return 'africa';
}
