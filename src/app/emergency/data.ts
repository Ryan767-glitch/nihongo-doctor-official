import { Building2, Phone, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react';

export const emergencies = [
    {
        region: 'asia',
        label: 'アジア',
        countries: [
            { name: 'インドネシア', nameEn: 'Indonesia', flag: '🇮🇩', numbers: [{ label: '救急', number: '118' }, { label: '警察', number: '110' }, { label: '消防', number: '113' }] },
            { name: 'カンボジア', nameEn: 'Cambodia', flag: '🇰🇭', numbers: [{ label: '救急', number: '119' }, { label: '警察', number: '117' }, { label: '消防', number: '118' }] },
            { name: 'タイ', nameEn: 'Thailand', flag: '🇹🇭', numbers: [{ label: '救急', number: '1669' }, { label: '警察', number: '191' }, { label: '消防', number: '199' }, { label: '観光警察', number: '1155' }] },
            { name: 'フィリピン', nameEn: 'Philippines', flag: '🇵🇭', numbers: [{ label: '緊急共通', number: '911' }] },
            { name: 'ベトナム', nameEn: 'Vietnam', flag: '🇻🇳', numbers: [{ label: '救急', number: '115' }, { label: '警察', number: '113' }, { label: '消防', number: '114' }] },
            { name: 'マレーシア', nameEn: 'Malaysia', flag: '🇲🇾', numbers: [{ label: '緊急共通', number: '999' }, { label: '消防', number: '994' }] },
            { name: 'ミャンマー', nameEn: 'Myanmar', flag: '🇲🇲', numbers: [{ label: '救急', number: '192' }, { label: '警察', number: '199' }, { label: '消防', number: '191' }] },
            { name: 'ラオス', nameEn: 'Laos', flag: '🇱🇦', numbers: [{ label: '救急', number: '195' }, { label: '警察', number: '191' }, { label: '消防', number: '190' }] },
            { name: '中国', nameEn: 'China', flag: '🇨🇳', numbers: [{ label: '救急', number: '120' }, { label: '警察', number: '110' }, { label: '消防', number: '119' }] },
            { name: '香港', nameEn: 'Hong Kong', flag: '🇭🇰', numbers: [{ label: '緊急共通', number: '999' }] },
        ],
    },
    {
        region: 'north-america',
        label: '北米',
        countries: [
            { name: 'アメリカ', nameEn: 'USA', flag: '🇺🇸', numbers: [{ label: '緊急共通', number: '911' }] },
            { name: 'カナダ', nameEn: 'Canada', flag: '🇨🇦', numbers: [{ label: '緊急共通', number: '911' }] },
        ],
    },
    {
        region: 'latin-america',
        label: '中南米',
        countries: [
            { name: 'アルゼンチン', nameEn: 'Argentina', flag: '🇦🇷', numbers: [{ label: '救急', number: '107' }, { label: '警察', number: '101' }, { label: '消防', number: '100' }] },
            { name: 'コロンビア', nameEn: 'Colombia', flag: '🇨🇴', numbers: [{ label: '緊急共通', number: '123' }] },
            { name: 'チリ', nameEn: 'Chile', flag: '🇨🇱', numbers: [{ label: '救急', number: '131' }, { label: '警察', number: '133' }, { label: '消防', number: '132' }] },
            { name: 'ブラジル', nameEn: 'Brazil', flag: '🇧🇷', numbers: [{ label: '救急', number: '192' }, { label: '警察', number: '190' }, { label: '消防', number: '193' }] },
            { name: 'ペルー', nameEn: 'Peru', flag: '🇵🇪', numbers: [{ label: '救急', number: '116' }, { label: '警察', number: '105' }, { label: '消防', number: '116' }] },
        ],
    },
    {
        region: 'europe',
        label: 'ヨーロッパ',
        countries: [
            { name: 'イタリア', nameEn: 'Italy', flag: '🇮🇹', numbers: [{ label: '救急', number: '118' }, { label: '警察', number: '113' }, { label: '消防', number: '115' }, { label: 'EU共通', number: '112' }] },
            { name: 'オランダ', nameEn: 'Netherlands', flag: '🇳🇱', numbers: [{ label: '緊急共通', number: '112' }] },
            { name: 'オーストリア', nameEn: 'Austria', flag: '🇦🇹', numbers: [{ label: '救急', number: '144' }, { label: '警察', number: '133' }, { label: '消防', number: '122' }, { label: 'EU共通', number: '112' }] },
            { name: 'スイス', nameEn: 'Switzerland', flag: '🇨🇭', numbers: [{ label: '救急', number: '144' }, { label: '警察', number: '117' }, { label: '消防', number: '118' }] },
            { name: 'スペイン', nameEn: 'Spain', flag: '🇪🇸', numbers: [{ label: '緊急共通', number: '112' }] },
            { name: 'ドイツ', nameEn: 'Germany', flag: '🇩🇪', numbers: [{ label: '救急・消防', number: '112' }, { label: '警察', number: '110' }] },
            { name: 'フランス', nameEn: 'France', flag: '🇫🇷', numbers: [{ label: '救急', number: '15' }, { label: '警察', number: '17' }, { label: '消防', number: '18' }, { label: 'EU共通', number: '112' }] },
            { name: 'ベルギー', nameEn: 'Belgium', flag: '🇧🇪', numbers: [{ label: '救急・消防', number: '112' }, { label: '警察', number: '101' }] },
            { name: '英国', nameEn: 'UK', flag: '🇬🇧', numbers: [{ label: '緊急共通', number: '999' }, { label: 'EU共通', number: '112' }] },
        ],
    },
    {
        region: 'oceania',
        label: 'オセアニア',
        countries: [
            { name: 'オーストラリア', nameEn: 'Australia', flag: '🇦🇺', numbers: [{ label: '緊急共通', number: '000' }, { label: '通訳サービス', number: '131450' }] },
            { name: 'ニュージーランド', nameEn: 'New Zealand', flag: '🇳🇿', numbers: [{ label: '緊急共通', number: '111' }] },
        ],
    },
    {
        region: 'africa-middle-east',
        label: 'アフリカ・中東',
        countries: [
            { name: 'UAE', nameEn: 'UAE', flag: '🇦🇪', numbers: [{ label: '救急', number: '998' }, { label: '警察', number: '999' }, { label: '消防', number: '997' }] },
            { name: 'エジプト', nameEn: 'Egypt', flag: '🇪🇬', numbers: [{ label: '救急', number: '123' }, { label: '警察', number: '122' }, { label: '消防', number: '180' }] },
            { name: 'エチオピア', nameEn: 'Ethiopia', flag: '🇪🇹', numbers: [{ label: '救急', number: '907' }, { label: '警察', number: '911' }] },
            { name: 'ケニア', nameEn: 'Kenya', flag: '🇰🇪', numbers: [{ label: '緊急共通', number: '999' }] },
            { name: 'タンザニア', nameEn: 'Tanzania', flag: '🇹🇿', numbers: [{ label: '救急・消防', number: '114' }, { label: '警察', number: '112' }] },
            { name: 'ナイジェリア', nameEn: 'Nigeria', flag: '🇳🇬', numbers: [{ label: '救急・警察', number: '199' }] },
            { name: '南アフリカ', nameEn: 'South Africa', flag: '🇿🇦', numbers: [{ label: '救急・消防', number: '10177' }, { label: '警察', number: '10111' }] },
        ],
    },
];

export const steps = [
    {
        id: 1,
        title: '現地の緊急番号に連絡する',
        description: 'まずは救急、警察、消防など現地の緊急番号へ連絡し、必要な支援を求めてください。',
        icon: Phone,
        color: 'bg-red-100 text-red-600',
        link: null,
    },
    {
        id: 2,
        title: '日本語が難しい場合はフレーズを使う',
        description: '現地語や英語で伝えるのが難しい場合は、医療フレーズ集を使って症状や要望を伝えてください。',
        icon: Sparkles,
        color: 'bg-blue-100 text-blue-600',
        link: { href: '/phrases', label: '医療フレーズ集へ' },
    },
    {
        id: 3,
        title: '必要に応じて大使館・領事館へ連絡する',
        description: '事故、事件、旅券紛失などの際は、最寄りの日本大使館・領事館にも状況を共有してください。',
        icon: Building2,
        color: 'bg-gray-100 text-gray-700',
        link: { href: '/embassy', label: '大使館情報へ' },
    },
    {
        id: 4,
        title: '海外保険の緊急デスクを確認する',
        description: '保険会社の24時間サポートやキャッシュレス受診の可否を確認しておくと、受診がスムーズです。',
        icon: ShieldAlert,
        color: 'bg-emerald-100 text-emerald-600',
        link: { href: '/insurance', label: '海外保険ガイドへ' },
    },
    {
        id: 5,
        title: '受診先を早めに探す',
        description: '緊急性が低い場合でも、症状が悪化する前に日本語対応の医療機関を確認しておくと安心です。',
        icon: Stethoscope,
        color: 'bg-purple-100 text-purple-600',
        link: { href: '/', label: 'トップページへ' },
    },
];
