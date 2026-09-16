import { publishedClinics } from '@/lib/catalog';
import {
    getCityDisplayName,
    getCityHref,
    getCitySlug,
    getContinentSlug,
    getCountrySlug,
} from '@/lib/slugs';
import { countryLabel } from '@/lib/seo';
import { Clinic } from '@/types';

export interface SymptomDef {
    key: string;
    title: string;
    shortTitle: string;
    description: string;
    keywords: string[];
    excludeKeywords?: string[];
    advice: string[];
    warningSigns: string[];
}

export const SYMPTOMS: SymptomDef[] = [
    {
        key: 'fever',
        title: '発熱・かぜ症状',
        shortTitle: '発熱',
        description: '発熱・のどの痛み・せきなどのかぜ症状で受診できる日本語対応の病院',
        keywords: ['内科', '総合', '一般', '家庭医', '救急'],
        excludeKeywords: ['心療', '精神', '歯', '眼', '皮膚', '整形', '耳鼻', '婦人', '産科'],
        advice: [
            '発熱では、まず水分補給と安静が基本です。38.5度以上の熱、3日以上続く発熱、意識のもやもやがある場合は早めに受診してください。',
            '受診時には「いつから」「何度まで上がったか」「他の症状（せき・のど・下痢など）」を伝えると診察がスムーズです。服薬中の薬や持病があれば、英語か現地語でメモしておくと安心です。',
            '日本から持参した市販の解熱剤を使って構いませんが、症状が重いときは自己判断で様子を見ず、医療機関を受診してください。',
        ],
        warningSigns: ['39度以上の高熱が続く', '呼吸が苦しい・胸痛がある', '意識がぼんやりしている', '嘔吐や下痢で水分が取れない', '首が硬い・けいれんがある'],
    },
    {
        key: 'stomach',
        title: '腹痛・食あたり・消化器の不調',
        shortTitle: '腹痛・食あたり',
        description: '腹痛・下痢・嘔吐・食あたりで受診できる日本語対応の病院',
        keywords: ['内科', '総合', '一般', '家庭医', '消化器', '胃腸', '救急'],
        excludeKeywords: ['心療', '精神', '歯', '眼', '皮膚', '整形', '耳鼻', '婦人', '産科'],
        advice: [
            '旅行中の腹痛・下痢は食あたりが最も多い原因です。下痢止めを安易に飲まず、脱水を防ぐため経口補水液やスポーツドリンクを少しずつ飲んでください。',
            '血便、激しい腹痛、発熱を伴う下痢は細菌感染の可能性があり、抗生物質が必要な場合があります。我慢せず受診しましょう。',
            '受診時には「最後に食べたもの」「症状が始まった時間」「便の状態」を伝えると診断の助けになります。',
        ],
        warningSigns: ['血便・黒い便が出る', '激しい腹痛が続く', '水分がまったく取れない', '尿がほとんど出ない', '発熱を伴う激しい下痢'],
    },
    {
        key: 'dental',
        title: '歯の痛み・歯科治療',
        shortTitle: '歯痛',
        description: '歯痛・詰め物が取れた・歯を折ったときに受診できる日本語対応の歯科',
        keywords: ['歯'],
        advice: [
            '旅行中の歯痛は痛み止めでしのげても、原因（虫歯・膿）は残ります。帰国まで待たず、痛みが強いときや顔が腫れてきたら受診してください。',
            '詰め物や被せ物が取れた場合は、取れたものを持参すると再装着できることがあります。歯が折れた・抜けた場合は牛乳や生理食塩水に浸して持参すると再植できる可能性があります。',
            '海外の歯科は日本と費用体系が大きく異なります。治療前に見積もりを確認し、海外旅行保険の歯科治療補償の有無を保険会社に確認してください。',
        ],
        warningSigns: ['顔や首が腫れてきた', '発熱を伴う歯痛', '口が開けにくい', 'ケガで歯が抜けた・ぐらつく'],
    },
    {
        key: 'skin',
        title: '皮膚トラブル・発疹・アレルギー',
        shortTitle: '皮膚症状',
        description: '発疹・かゆみ・虫刺され・やけどなど皮膚トラブルで受診できる日本語対応の病院',
        keywords: ['皮膚', 'アレルギー'],
        advice: [
            '湿疹・かゆみ・じんま疹などの皮膚トラブルは、旅行先の気候・食事・虫刺されが原因になることが多いです。症状が広がる前に受診すると治療が早く済みます。',
            '発疹の写真を発生初期から撮っておくと、受診時に症状の経過を説明しやすくなります。化粧品や日焼け止めを変えた場合はそれも伝えてください。',
            'じんま疹が全身に広がる、唇やまぶたが腫れる、呼吸が苦しいなどの症状はアナフィラキシーの可能性があり、すぐに受診が必要です。',
        ],
        warningSigns: ['発疹が急速に全身へ広がる', '唇・舌・のどが腫れる', '呼吸困難がある', '発熱を伴う発疹', '水ぶくれや皮膚の剥離'],
    },
    {
        key: 'injury',
        title: 'ケガ・骨折・外傷',
        shortTitle: 'ケガ・骨折',
        description: '転倒・切り傷・骨折・捻挫などのケガで受診できる日本語対応の病院',
        keywords: ['外科', '整形', '救急'],
        excludeKeywords: ['美容', '乳腺', '歯'],
        advice: [
            '転倒・事故で痛みや腫れがある場合は、無理に動かさず受診してください。骨折していても歩けることがあり、放置すると治療が長引きます。',
            '切り傷で出血が止まらない場合は清潔な布で圧迫止血しながら医療機関へ。縫合が必要な傷は受傷後できるだけ早く受診が必要です。',
            '海外での外傷治療・レントゲンは高額になることがあります。受診前に海外旅行保険の連絡先へ電話すると、キャッシュレス対応できる病院を紹介してもらえる場合があります。',
        ],
        warningSigns: ['明らかな変形・骨が見える', '出血が止まらない', '頭を強く打った', '手足が動かせない・しびれる', '痛みが強く歩けない'],
    },
    {
        key: 'child',
        title: '子どもの急病・発熱',
        shortTitle: '子どもの急病',
        description: '子どもの発熱・ケガ・体調不良で受診できる日本語対応の小児科・病院',
        keywords: ['小児'],
        advice: [
            '子どもの発熱・体調不良は悪化が早いため、様子見の時間を短めにして早めの受診をおすすめします。特に乳幼児は脱水になりやすいので注意してください。',
            '受診時には体温の経過・食事量・尿の回数・いつもの様子との違いを伝えてください。母子手帳や予防接種歴があれば持参すると診察が正確になります。',
            '日本から持参した子ども用の常備薬は、年齢・体重に合ったものか確認してから使いましょう。症状が重いときは自己判断せず受診してください。',
        ],
        warningSigns: ['水分が取れずぐったりしている', 'けいれんを起こした', '呼吸が早い・苦しそう', '尿が半日以上出ていない', '3か月未満の赤ちゃんの発熱'],
    },
    {
        key: 'ent',
        title: '耳・鼻・のどの症状',
        shortTitle: '耳鼻症状',
        description: '耳痛・聞こえにくい・のどの痛み・鼻血などで受診できる日本語対応の耳鼻科',
        keywords: ['耳鼻'],
        advice: [
            '耳の痛み・聞こえにくさは中耳炎や外耳道炎の可能性があります。飛行機搭乗前に治療しておかないと痛みが強く出ることがあるため、早めの受診が安心です。',
            'のどの強い痛み・唾も飲み込めない状態は扁桃炎や深い感染症の可能性があります。鼻血が止まらない場合も受診してください。',
            '耳に水が入った・耳垢で詰まった感じがするなどの症状も、耳鼻科で簡単に処置できます。',
        ],
        warningSigns: ['突然聞こえなくなった', '激しいめまい・耳鳴り', '唾も飲み込めないのどの痛み', '鼻血が30分以上止まらない', '耳から膿や血が出る'],
    },
    {
        key: 'eye',
        title: '目の痛み・目のトラブル',
        shortTitle: '目の症状',
        description: '目の痛み・充血・ものもらい・視力低下で受診できる日本語対応の眼科',
        keywords: ['眼'],
        advice: [
            '目の痛み・強い充血・視力の変化は早めの受診が必要です。コンタクトレンズ装用中の痛みや充血は角膜感染の可能性があるため、すぐに装用を中止してください。',
            'ものもらい・結膜炎・アレルギーによるかゆみは点眼薬で改善しやすい症状です。目に異物が入った場合はこすらず受診してください。',
            '突然の視力低下・視野の欠け・飛蚊症の急増は網膜の病気の可能性があり、緊急の受診が必要です。',
        ],
        warningSigns: ['突然視力が落ちた・見えにくい', '激しい目の痛み・頭痛・吐き気', '目に強い光を見た後の痛み', 'ケガで目を負傷した', 'コンタクト装用中の強い痛み'],
    },
    {
        key: 'women',
        title: '女性の症状・婦人科',
        shortTitle: '婦人科系',
        description: '生理痛・膀胱炎・妊娠関連など女性の症状で受診できる日本語対応の婦人科',
        keywords: ['婦人', '産科', '産婦人', 'レディース', '女性'],
        advice: [
            '排尿痛・頻尿は膀胱炎の可能性が高く、旅行中に悪化しやすい症状です。抗生物質が必要なことが多いので早めに受診してください。',
            '不正出血・生理の異常・妊娠中の体調変化は婦人科での受診が必要です。妊娠中の方は週数と検診内容をメモしておくと診察がスムーズです。',
            '下着や水着のままの長時間着用・疲労は女性特有のトラブルを招きやすいです。市販薬で改善しない症状は受診を検討してください。',
        ],
        warningSigns: ['妊娠中の出血・腹痛', '激しい下腹痛', '発熱を伴う排尿痛・腰痛', '性行為後の強い痛みや出血'],
    },
    {
        key: 'mental',
        title: 'こころの不調・不眠・パニック',
        shortTitle: 'メンタル',
        description: '不眠・不安・パニック症状・メンタルの不調で相談できる日本語対応の医療機関',
        keywords: ['精神', '心療', 'メンタル'],
        advice: [
            '海外生活や長期旅行では、環境の変化から不眠・不安・気分の落ち込みが起きることがあります。日本語で相談できる心療内科・精神科は心強い相談先です。',
            'パニック発作（動悸・息苦しさ・強い不安）が初めて起きた場合、まず身体の病気でないか確認するための受診も有効です。',
            '服薬中の薬がある場合は薬名と用量を英語でメモしておきましょう。急な断薬は症状を悪化させるため、処方相談だけでも早めの受診を。',
        ],
        warningSigns: ['自傷・自殺の考えが出てきた', 'パニック発作が繰り返される', '数日間ほとんど眠れていない', '幻覚や妄想がある'],
    },
];

export const SYMPTOM_BY_KEY = new Map(SYMPTOMS.map((s) => [s.key, s]));

export function matchSymptom(clinic: Clinic, def: SymptomDef) {
    return (clinic.specialties || []).some((spec) => {
        if (!def.keywords.some((k) => spec.includes(k))) return false;
        return !(def.excludeKeywords || []).some((e) => spec.includes(e));
    });
}

export interface SymptomCity {
    slug: string;
    city: string;
    displayCity: string;
    country: string;
    countryJa: string;
    continent: string;
    continentSlug: string;
    countrySlug: string;
    cityHref: string;
    clinics: Clinic[];
}

let cityIndex: Map<string, SymptomCity> | null = null;

export function getSymptomCityIndex() {
    if (cityIndex) return cityIndex;
    cityIndex = new Map();
    for (const clinic of publishedClinics) {
        const slug = getCitySlug(clinic.city);
        const existing = cityIndex.get(slug);
        if (existing) {
            existing.clinics.push(clinic);
        } else {
            cityIndex.set(slug, {
                slug,
                city: clinic.city,
                displayCity: getCityDisplayName(clinic.city),
                country: clinic.country,
                countryJa: countryLabel(clinic.country),
                continent: clinic.continent,
                continentSlug: getContinentSlug(clinic.continent),
                countrySlug: getCountrySlug(clinic.country),
                cityHref: getCityHref(clinic.continent, clinic.country, clinic.city),
                clinics: [clinic],
            });
        }
    }
    return cityIndex;
}

export function parseSymptomSlug(slug: string): { citySlug: string; symptom: SymptomDef } | null {
    const byLengthDesc = [...SYMPTOMS].sort((a, b) => b.key.length - a.key.length);
    for (const def of byLengthDesc) {
        const suffix = `-${def.key}`;
        if (slug.endsWith(suffix)) {
            return { citySlug: slug.slice(0, slug.length - suffix.length), symptom: def };
        }
    }
    return null;
}

export function symptomSlug(citySlug: string, symptomKey: string) {
    return `${citySlug}-${symptomKey}`;
}

export function getSymptomParams() {
    const params: { slug: string }[] = [];
    const cities = getSymptomCityIndex();
    for (const [citySlug, city] of cities) {
        for (const def of SYMPTOMS) {
            const matched = city.clinics.filter((c) => matchSymptom(c, def));
            if (matched.length > 0) {
                params.push({ slug: symptomSlug(citySlug, def.key) });
            }
        }
    }
    return params;
}

export function getSymptomPageData(slug: string) {
    const parsed = parseSymptomSlug(slug);
    if (!parsed) return null;
    const city = getSymptomCityIndex().get(parsed.citySlug);
    if (!city) return null;
    const clinics = city.clinics.filter((c) => matchSymptom(c, parsed.symptom));
    if (clinics.length === 0) return null;
    return { city, symptom: parsed.symptom, clinics };
}

export function getSymptomLinksForCity(citySlug: string) {
    const city = getSymptomCityIndex().get(citySlug);
    if (!city) return [];
    return SYMPTOMS.map((def) => ({
        def,
        count: city.clinics.filter((c) => matchSymptom(c, def)).length,
        href: `/symptom/${symptomSlug(citySlug, def.key)}`,
    })).filter((item) => item.count > 0);
}
