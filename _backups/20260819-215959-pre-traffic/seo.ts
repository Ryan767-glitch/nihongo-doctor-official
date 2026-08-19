import { emergencies } from '@/app/emergency/data';
import { COUNTRY_JA_MAP } from '@/lib/constants';
import {
    CONTINENT_JA,
    getCityDisplayName,
    getCityHref,
    getCitySlug,
    getClinicHref,
    getCountryHref,
} from '@/lib/slugs';
import { Clinic, Embassy } from '@/types';

export const SITE_URL = 'https://nihongo-doctor.com';

const PRIORITY_SPECIALTIES = ['皮膚科', '歯科', '小児科', '内科', '産婦人科', '眼科', '耳鼻科', '救急'] as const;

const COUNTRY_EMERGENCY_ALIASES: Record<string, string> = {
    'United States': 'アメリカ',
    USA: 'アメリカ',
    アメリカ: 'アメリカ',
    UK: '英国',
    'United Kingdom': '英国',
    イギリス: '英国',
    英国: '英国',
    UAE: 'UAE',
    アラブ首長国連邦: 'UAE',
};

const CITY_NOTES: Record<string, string> = {
    bangkok:
        '大型のインターナショナル病院に日本語窓口がある一方、日本人クリニックも点在します。観光・長期滞在どちらでも、受診前に予約と保険の使い方を確認してください。',
    pattaya: '観光客向けの総合病院が中心です。夜間や休日は救急外来の有無を先に見てください。',
    phuket: '島内の総合病院が受け皿になります。重傷時はバンコクへの移送が必要になることがあります。',
    chiangmai: '長期滞在者向けのクリニックと総合病院が混在します。予約制の施設が多いです。',
    'ho-chi-minh': '日本人クリニックとインターナショナル病院の両方があります。初診は予約が確実です。',
    hanoi: '日本語対応のクリニックが複数あります。救急は115、事前に病院名を現地語でも控えておくと安心です。',
    'kuala-lumpur': '日本人クリニックと民間総合病院がそろっています。キャッシュレス対応は施設ごとに違います。',
    jakarta: 'ジャカルタは交通渋滞の影響が大きいので、夜間救急と自宅・ホテルからの所要時間をセットで見てください。',
    bali: '観光客向け病院が中心です。保険のキャッシュレス提携があるかを出発前に確認するとスムーズです。',
    singapore: '英語診療が基本で、日本語サポートがある病院・クリニックを掲載しています。救急は995です。',
    seoul: '日本語対応のある病院・クリニックを掲載しています。救急・消防は119です。',
    taipei: '日本語対応のある病院を掲載しています。救急・消防は119です。',
    'hong-kong': '緊急時は999です。予約が必要な専門科と、当日受診できる一般診療を分けて探してください。',
    'new-york': 'マンハッタン周辺の日本人向けクリニックが中心です。予約必須の施設が多いので、渡航前に連絡を。',
    'los-angeles': '日系クリニックが複数あります。保険の種類によって窓口が変わるため、事前確認が必要です。',
    'san-francisco': 'ベイエリアの日本語対応医療機関をまとめています。専門科は予約が取りにくいことがあります。',
    chicago: '「日本クリニック シカゴ」のように、都市名で探す人が多い地域です。予約の空きは公式サイトで確認してください。',
    honolulu: '観光客向けの日本語クリニックがあります。ホテルドクターや夜間対応の有無もあわせて見てください。',
    london: 'NHSとプライベートクリニックが混在します。旅行者はプライベート側の日本語対応施設を先に確認するのが一般的です。',
    paris: '日本人医師の個人クリニックと総合病院が混在します。救急は15、EU共通は112です。',
    dusseldorf:
        '日本人コミュニティが大きく、皮膚科・内科を中心に日本語で診られる開業医があります。「デュッセルドルフ 皮膚科 日本語」での検索が多い都市です。',
    frankfurt: '日本人医師・日本語サポートのある一般診療所が中心です。救急・消防は112です。',
    munich: '日本語対応のクリニックがあります。専門科は予約制と考えてください。',
    berlin: '耳鼻科など専門クリニックを中心に掲載しています。救急は112です。',
    amsterdam: 'アムステルダム本体と近郊アムステルフェーンの日本人向けクリニックを分けて確認してください。',
    amstelveen: '在留邦人向けクリニックと、日本語デスクのある病院があります。',
    geneva: '日本人医師の個人クリニックがあります。「スイス 病院 日本人」で探している人向けの受け皿です。',
    sydney: '州の救急は000です。通訳サービス（131 450）も使えます。',
    melbourne: '総合病院と一般診療所が中心です。緊急時は000です。',
    brisbane: 'QLD（クイーンズランド）エリアの日本語対応医療機関を掲載しています。緊急時は000です。',
    auckland: '緊急時は111です。初診は予約が基本です。',
    dubai: '民間病院が中心です。救急は998、保険カードを必ず持参してください。',
    'sao-paulo': '日系社会向けの病院があります。ポルトガル語環境なので、日本語対応の有無を先に見てください。',
};

export interface DirectoryLink {
    name: string;
    href: string;
    count: number;
}

export interface DirectoryFaq {
    question: string;
    answer: string;
}

export interface DirectoryCopy {
    title: string;
    h1: string;
    description: string;
    intro: string[];
    faqs: DirectoryFaq[];
    specialtyLabels: string[];
    emergencyLine: string | null;
    medicalCount: number;
    supportCount: number;
    emergencyClinicCount: number;
    cityLinks: DirectoryLink[];
    countryLinks: DirectoryLink[];
}

export function countryLabel(country: string) {
    return COUNTRY_JA_MAP[country] || country;
}

export function collectSpecialties(clinics: Clinic[]) {
    const found = new Set<string>();
    for (const clinic of clinics) {
        for (const raw of clinic.specialties || []) {
            for (const key of PRIORITY_SPECIALTIES) {
                if (raw.includes(key.replace('科', '')) || raw.includes(key)) {
                    found.add(key);
                }
            }
        }
    }
    return PRIORITY_SPECIALTIES.filter((item) => found.has(item));
}

export function findEmergencyCountry(country: string) {
    const ja = countryLabel(country);
    const target = COUNTRY_EMERGENCY_ALIASES[country] || COUNTRY_EMERGENCY_ALIASES[ja] || ja || country;
    for (const region of emergencies) {
        const match = region.countries.find(
            (item) => item.name === target || item.nameEn === country || item.name === country || item.nameEn === ja
        );
        if (match) return match;
    }
    return null;
}

export function emergencySummary(country: string) {
    const match = findEmergencyCountry(country);
    if (!match) return null;
    return match.numbers.map((item) => `${item.label} ${item.number}`).join(' / ');
}

export function summarizeClinics(clinics: Clinic[]) {
    return {
        medicalCount: clinics.filter((clinic) => clinic.supportLevel === 'medical').length,
        supportCount: clinics.filter((clinic) => clinic.supportLevel === 'support').length,
        emergencyClinicCount: clinics.filter((clinic) => clinic.emergencyAvailable).length,
        specialtyLabels: collectSpecialties(clinics),
    };
}

function cityGroups(clinics: Clinic[]): DirectoryLink[] {
    const map = new Map<string, DirectoryLink>();
    for (const clinic of clinics) {
        const href = getCityHref(clinic.continent, clinic.country, clinic.city);
        const current = map.get(href);
        if (current) {
            current.count += 1;
        } else {
            map.set(href, { name: getCityDisplayName(clinic.city), href, count: 1 });
        }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
}

function countryGroups(clinics: Clinic[]): DirectoryLink[] {
    const map = new Map<string, DirectoryLink>();
    for (const clinic of clinics) {
        const href = getCountryHref(clinic.continent, clinic.country);
        const current = map.get(href);
        if (current) {
            current.count += 1;
        } else {
            map.set(href, { name: countryLabel(clinic.country), href, count: 1 });
        }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
}

function specialtyPhrase(labels: string[]) {
    if (labels.length === 0) return '';
    if (labels.length === 1) return labels[0];
    if (labels.length === 2) return `${labels[0]}・${labels[1]}`;
    return `${labels.slice(0, 3).join('・')}など`;
}

function supportPhrase(medicalCount: number, supportCount: number) {
    const parts: string[] = [];
    if (medicalCount > 0) parts.push(`日本語で直接診察できる施設が${medicalCount}件`);
    if (supportCount > 0) parts.push(`通訳・日本語サポートがある施設が${supportCount}件`);
    return parts.join('、');
}

export function buildCityCopy(opts: {
    continentName: string;
    countryName: string;
    cityName: string;
    clinics: Clinic[];
    embassies: Embassy[];
}): DirectoryCopy {
    const city = getCityDisplayName(opts.cityName);
    const countryJa = countryLabel(opts.countryName);
    const stats = summarizeClinics(opts.clinics);
    const emergencyLine = emergencySummary(opts.countryName);
    const specialties = specialtyPhrase(stats.specialtyLabels);
    const cityNote = CITY_NOTES[getCitySlug(opts.cityName)];
    const embassyName = opts.embassies[0]?.name;

    const titleCore = specialties
        ? `${city}で日本語が通じる病院・${stats.specialtyLabels[0]}`
        : `${city}で日本語が通じる病院`;
    const title = `${titleCore}・クリニック`;

    const description = [
        `${countryJa}・${city}で日本語が通じる病院・クリニックを${opts.clinics.length}件掲載。`,
        stats.medicalCount > 0 ? `日本人医師による診察あり。` : '',
        specialties ? `${specialties}の受診先を確認できます。` : '',
        emergencyLine ? `緊急時は${emergencyLine}。` : '',
        '電話・住所・診療時間・日本語対応の内容をまとめています。',
    ]
        .filter(Boolean)
        .join('');

    const intro = [
        `${city}には、日本語が通じる医療機関を${opts.clinics.length}件掲載しています。${supportPhrase(stats.medicalCount, stats.supportCount) || '日本語サポートの内容は施設ごとに異なります'}。`,
        specialties
            ? `掲載施設から${specialties}を探せます。大きな総合病院だけでなく、開業医・歯科も含まれます。`
            : `${city}の日本語対応病院・クリニックの連絡先と対応内容を一覧にしています。`,
        emergencyLine
            ? `${countryJa}の主な緊急番号は${emergencyLine}です。命に関わる症状は、まず現地の救急に連絡してください。`
            : `${city}で受診する前に、予約の要否と保険の使い方を各施設へ確認してください。`,
        cityNote,
        embassyName
            ? `パスポート紛失や入院時の支援は${embassyName}にも相談できます。連絡先はこのページ下部と大使館ページにあります。`
            : '',
    ].filter(Boolean) as string[];

    const faqs: DirectoryFaq[] = [
        {
            question: `${city}で日本語が通じる病院はありますか？`,
            answer: `はい。このページでは${city}の日本語対応病院・クリニックを${opts.clinics.length}件掲載しています。${supportPhrase(stats.medicalCount, stats.supportCount) || '対応の度合いは施設によって異なります'}。`,
        },
        {
            question: `${city}の病院は予約が必要ですか？`,
            answer: `専門科や日本人クリニックは予約制が多いです。救急外来がある総合病院でも、軽症は待ち時間が長くなることがあります。掲載の電話番号か公式サイトで、当日の受付を確認してください。`,
        },
        {
            question: `${city}で具合が悪くなったときの緊急番号は？`,
            answer: emergencyLine
                ? `${countryJa}では${emergencyLine}です。会話が難しい場合はホテルスタッフや同行者に番号を伝えてください。緊急でない受診先はこのページの一覧から選べます。`
                : `命に関わる症状は現地の救急へ。緊急でない場合は、このページの日本語対応病院から連絡してください。`,
        },
    ];

    return {
        title,
        h1: `${city}で日本語が通じる病院・クリニック`,
        description,
        intro,
        faqs,
        specialtyLabels: stats.specialtyLabels,
        emergencyLine,
        medicalCount: stats.medicalCount,
        supportCount: stats.supportCount,
        emergencyClinicCount: stats.emergencyClinicCount,
        cityLinks: [],
        countryLinks: [],
    };
}

export function buildCountryCopy(opts: {
    continentName: string;
    countryName: string;
    clinics: Clinic[];
    embassies: Embassy[];
}): DirectoryCopy {
    const countryJa = countryLabel(opts.countryName);
    const stats = summarizeClinics(opts.clinics);
    const emergencyLine = emergencySummary(opts.countryName);
    const cities = cityGroups(opts.clinics);
    const specialties = specialtyPhrase(stats.specialtyLabels);
    const cityNames = cities.slice(0, 6).map((item) => item.name).join('、');

    const title = `${countryJa}で日本語が通じる病院・日本人クリニック`;
    const description = [
        `${countryJa}の日本語対応病院・クリニックを${opts.clinics.length}件掲載。`,
        cityNames ? `${cityNames}など都市別に探せます。` : '',
        specialties ? `${specialties}に対応する施設あり。` : '',
        emergencyLine ? `緊急番号は${emergencyLine}。` : '',
        '日本人医師・通訳の有無、24時間救急、連絡先をまとめています。',
    ]
        .filter(Boolean)
        .join('');

    const intro = [
        `${countryJa}で日本語が通じる医療機関を${opts.clinics.length}件、${cities.length}都市分掲載しています。${supportPhrase(stats.medicalCount, stats.supportCount) || '日本語対応の内容は施設ごとに異なります'}。`,
        cityNames ? `都市別では${cityNames}などから探せます。旅行中は都市ページ、在住の方は診療科と予約の取りやすさで絞ると早いです。` : '',
        emergencyLine
            ? `${countryJa}の主な緊急番号は${emergencyLine}です。救急と通常診療は分けて考えてください。`
            : '',
        opts.embassies[0]
            ? `現地の公的な相談先として${opts.embassies[0].name}の連絡先も掲載しています。`
            : '',
    ].filter(Boolean) as string[];

    const faqs: DirectoryFaq[] = [
        {
            question: `${countryJa}に日本人の病院はありますか？`,
            answer: `${countryJa}では日本語対応の病院・クリニックを${opts.clinics.length}件確認できます。日本人医師がいる施設と、通訳が付く施設があります。`,
        },
        {
            question: `${countryJa}の救急番号は？`,
            answer: emergencyLine
                ? `${emergencyLine}です。緊急時はまずこの番号、日本語で相談したい場合は一覧の病院へ連絡してください。`
                : `緊急時は現地の救急番号を使ってください。日本語での受診は、このページの施設一覧から選べます。`,
        },
        {
            question: `どの都市から探せばいいですか？`,
            answer: cities.length
                ? `${countryJa}は${cities.map((item) => item.name).join('、')}のページに分かれています。いまいる街に近い都市を開いてください。`
                : `${countryJa}の掲載施設はこのページにまとめています。`,
        },
    ];

    return {
        title,
        h1: `${countryJa}で日本語が通じる病院・クリニック`,
        description,
        intro,
        faqs,
        specialtyLabels: stats.specialtyLabels,
        emergencyLine,
        medicalCount: stats.medicalCount,
        supportCount: stats.supportCount,
        emergencyClinicCount: stats.emergencyClinicCount,
        cityLinks: cities,
        countryLinks: [],
    };
}

export function buildContinentCopy(opts: { continentName: string; clinics: Clinic[] }): DirectoryCopy {
    const continentJa = CONTINENT_JA[opts.continentName] || opts.continentName;
    const stats = summarizeClinics(opts.clinics);
    const countries = countryGroups(opts.clinics);
    const countryNames = countries.slice(0, 8).map((item) => item.name).join('、');

    const title = `${continentJa}で日本語が通じる病院・クリニック`;
    const description = `${continentJa}で日本語が通じる病院・歯科・クリニックを${opts.clinics.length}件掲載。${countryNames}など${countries.length}カ国から、日本人医師・通訳の有無や24時間救急を確認できます。`;

    const intro = [
        `${continentJa}の日本語対応医療機関を${countries.length}カ国・${opts.clinics.length}件掲載しています。`,
        countryNames ? `国別では${countryNames}などから探せます。実際の検索では「都市名＋日本語＋病院」で来る人が多いので、都市ページも用意しています。` : '',
        `${supportPhrase(stats.medicalCount, stats.supportCount) || '日本語対応の内容は施設ごとに異なります'}。緊急時は国ごとの番号が違うため、国ページか緊急時ガイドもあわせて見てください。`,
    ].filter(Boolean) as string[];

    const faqs: DirectoryFaq[] = [
        {
            question: `${continentJa}で日本語がわかる病院はありますか？`,
            answer: `はい。${continentJa}では${opts.clinics.length}件を掲載しています。国や都市によって密度が違うので、行き先の国ページから見てください。`,
        },
        {
            question: `国名だけで探してもいいですか？`,
            answer: `国ページでも探せますが、「バンコク 日本語 病院」のように都市名で探す方が早く見つかります。`,
        },
    ];

    return {
        title,
        h1: `${continentJa}で日本語が通じる病院・クリニック`,
        description,
        intro,
        faqs,
        specialtyLabels: stats.specialtyLabels,
        emergencyLine: null,
        medicalCount: stats.medicalCount,
        supportCount: stats.supportCount,
        emergencyClinicCount: stats.emergencyClinicCount,
        cityLinks: cityGroups(opts.clinics).slice(0, 12),
        countryLinks: countries,
    };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
        })),
    };
}

export function itemListJsonLd(name: string, description: string, path: string, clinics: Clinic[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        description,
        url: `${SITE_URL}${path}`,
        numberOfItems: clinics.length,
        itemListElement: clinics.slice(0, 20).map((clinic, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: clinic.nameJa || clinic.nameEn,
            url: `${SITE_URL}${getClinicHref(clinic)}`,
        })),
    };
}

export function faqJsonLd(faqs: DirectoryFaq[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function medicalClinicJsonLd(clinic: Clinic, name: string, path: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name,
        alternateName: clinic.nameEn && clinic.nameEn !== name ? clinic.nameEn : undefined,
        url: `${SITE_URL}${path}`,
        telephone: clinic.phoneClean || clinic.phone || undefined,
        address: {
            '@type': 'PostalAddress',
            streetAddress: clinic.address,
            addressLocality: getCityDisplayName(clinic.city),
            addressCountry: countryLabel(clinic.country),
        },
        geo:
            clinic.lat && clinic.lng
                ? { '@type': 'GeoCoordinates', latitude: clinic.lat, longitude: clinic.lng }
                : undefined,
        medicalSpecialty: clinic.specialties?.length ? clinic.specialties : undefined,
        availableLanguage: ['ja', 'en'],
        openingHours: clinic.hoursDescription || undefined,
        sameAs: clinic.website || undefined,
    };
}

export function clinicPageCopy(clinic: Clinic, name: string) {
    const city = getCityDisplayName(clinic.city);
    const countryJa = countryLabel(clinic.country);
    const specialties = specialtyPhrase(collectSpecialties([clinic]));
    const title = `${name}｜${city}の日本語対応病院`;
    const description = [
        `${countryJa}・${city}の${name}。`,
        clinic.japaneseSupportDetails ? `${clinic.japaneseSupportDetails}。` : '日本語対応の医療機関です。',
        specialties ? `${specialties}に対応。` : '',
        clinic.phone ? `電話 ${clinic.phone}。` : '',
        '住所・診療時間・公式サイトを掲載しています。',
    ]
        .filter(Boolean)
        .join('');
    return { title, description, city, countryJa };
}

