import type { EsimRegion } from '@/lib/affiliates';

export type EsimRegionConfig = {
    slug: EsimRegion;
    label: string;
    continentHref: string;
    continentLabel: string;
    title: string;
    description: string;
    intro: string;
    why: string;
    chooseTour: string;
    chooseSupport: string;
    heroCaption: string;
    jgShort: string;
    hospitalLinks: { href: string; label: string }[];
    faqs: { question: string; answer: string }[];
};

export const ESIM_REGIONS: Record<EsimRegion, EsimRegionConfig> = {
    africa: {
        slug: 'africa',
        label: 'アフリカ向けeSIM',
        continentHref: '/africa-middle-east',
        continentLabel: 'アフリカ・中東',
        title: 'アフリカで使えるeSIM｜病院を探す前に通信を確保',
        description:
            'エジプト・ケニア・UAEなどアフリカ・中東で日本語対応病院を探すなら、到着前のeSIMが先です。周遊プランと24時間日本語サポート付きサービスを比較。',
        intro:
            'アフリカ・中東で日本語が通じる病院は件数が限られます。カイロ、ナイロビ、ドバイで受診先を探すとき、地図・翻訳・保険会社の日本語デスクはすべて通信が前提です。現地SIMを空港で探すより、出発前にeSIMを入れておく方が初動が早くなります。',
        why: 'にほんごドクター.com のアフリカ・中東ページには、エジプト、ケニア、UAEの日本語対応医療機関を掲載しています。件数が少ないからこそ、到着後すぐ都市ページを開ける状態にしておく必要があります。',
        chooseTour:
            'ケニアとタンザニア、エジプトと周辺国など国をまたぐなら、JAPAN&GLOBAL eSIMのアフリカ周遊28地域が候補です。国を変えるたびに買い直す手間が減ります。',
        chooseSupport:
            '繋がらない・設定が分からないときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。病院を探す途中のトラブルでも日本語で聞けます。',
        heroCaption: 'エジプト・ケニア・南アフリカなど、渡航先が複数なら周遊プランを先に確認します。',
        jgShort: 'アフリカ周遊28地域',
        hospitalLinks: [
            { href: '/africa-middle-east', label: 'アフリカ・中東の病院一覧' },
            { href: '/africa-middle-east/egypt', label: 'エジプト' },
            { href: '/africa-middle-east/kenya', label: 'ケニア' },
            { href: '/africa-middle-east/uae', label: 'UAE' },
        ],
        faqs: [
            {
                question: 'アフリカ旅行でeSIMは必要ですか？',
                answer:
                    '空港やホテルのWi-Fiだけに頼ると、到着直後に地図・翻訳・保険デスク・病院検索が使えません。エジプト・ケニア・UAEなど日本語対応病院が少ない地域ほど、出発前にeSIMを入れておくと初動が早くなります。',
            },
            {
                question: 'アフリカ周遊と国別プラン、どちらがいいですか？',
                answer:
                    '1カ国滞在ならエジプト・ケニア・UAEなどの国別プランが単純です。サファリや複数都市をまたぐなら、アフリカ周遊プランのように1枚で国をまたげるプランが向きます。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    'Sailyの公式サイトまたはアプリで渡航先を選び、プランを購入し、案内に従ってeSIMをインストールします。到着後はモバイルデータとデータローミングをオンにし、このサイトで都市名から日本語対応病院を検索してください。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    '掲載している海外eSIMはデータ通信が中心です。音声番号が付かないプランでは、WhatsAppや保険会社のアプリ、メールで連絡します。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
    asia: {
        slug: 'asia',
        label: 'アジア向けeSIM',
        continentHref: '/asia',
        continentLabel: 'アジア',
        title: 'アジアで使えるeSIM｜病院を探す前に通信を確保',
        description:
            'バンコク、ソウル、台北、シンガポールなどアジアで日本語対応病院を探すなら、到着前のeSIMが先です。周遊プランと日本語サポート付きサービスを比較。',
        intro:
            'アジアは日本語対応病院が多い都市もありますが、到着直後に地図・予約・保険デスクへ連絡するには通信が先です。現地SIMを空港で探すより、出発前にeSIMを入れておく方が初動が早くなります。',
        why: 'にほんごドクター.com ではタイ、韓国、台湾、シンガポール、ベトナム、インドネシアなどの日本語対応医療機関を掲載しています。都市ページをすぐ開ける状態にしておくと、受診先選びが止まりません。',
        chooseTour:
            '複数国を回るなら、JAPAN&GLOBAL eSIMのアジア周遊25地域が候補です。タイ→ベトナムのように国をまたいでも同じeSIMで使えます。',
        chooseSupport:
            '設定や接続で困ったときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。病院検索の途中でも日本語で聞けます。',
        heroCaption: 'ソウル・バンコク・台北など、都市をまたぐなら周遊プランを先に確認します。',
        jgShort: 'アジア周遊25地域',
        hospitalLinks: [
            { href: '/asia', label: 'アジアの病院一覧' },
            { href: '/asia/thailand/bangkok', label: 'バンコク' },
            { href: '/asia/south-korea/seoul', label: 'ソウル' },
            { href: '/asia/taiwan/taipei', label: '台北' },
            { href: '/asia/singapore/singapore', label: 'シンガポール' },
        ],
        faqs: [
            {
                question: 'アジア旅行でeSIMは必要ですか？',
                answer:
                    '空港Wi-Fiだけだと混雑で地図や病院検索が止まりがちです。バンコクやソウルでも、出発前にeSIMを入れておくと到着直後から都市ページを開けます。',
            },
            {
                question: 'アジア周遊と国別プラン、どちらがいいですか？',
                answer:
                    '1カ国滞在なら国別プランが単純です。複数国を周遊するならアジア周遊プランの方が買い直しが減ります。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    'アプリまたは公式サイトで渡航先を選び、購入・インストールし、到着後にデータ通信をオンにします。その後、このサイトのアジアページから都市を開いてください。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    'データ通信中心のプランでは、WhatsApp・アプリ・メールでの連絡が中心です。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
    europe: {
        slug: 'europe',
        label: 'ヨーロッパ向けeSIM',
        continentHref: '/europe',
        continentLabel: 'ヨーロッパ',
        title: 'ヨーロッパで使えるeSIM｜病院を探す前に通信を確保',
        description:
            'パリ、ロンドン、デュッセルドルフなどヨーロッパで日本語対応病院を探すなら、到着前のeSIMが先です。周遊プランと日本語サポート付きを比較。',
        intro:
            'ヨーロッパは都市間移動が多く、到着直後に地図・電車アプリ・保険デスクへ連絡する場面が続きます。現地SIMを探すより、出発前のeSIMの方が初動が早いです。',
        why: 'にほんごドクター.com ではフランス、英国、ドイツなどの日本語対応医療機関を掲載しています。渡航先の都市ページをすぐ開ける通信があると安心です。',
        chooseTour:
            '複数国を回るなら、JAPAN&GLOBAL eSIMのヨーロッパ周遊が候補です。国を変えるたびに買い直す手間が減ります。',
        chooseSupport:
            '接続や設定で困ったときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。',
        heroCaption: 'パリ・ロンドン・ドイツなど、国をまたぐなら周遊プランを先に確認します。',
        jgShort: 'ヨーロッパ周遊',
        hospitalLinks: [
            { href: '/europe', label: 'ヨーロッパの病院一覧' },
            { href: '/europe/france/paris', label: 'パリ' },
            { href: '/europe/united-kingdom/london', label: 'ロンドン' },
            { href: '/europe/germany/dusseldorf', label: 'デュッセルドルフ' },
        ],
        faqs: [
            {
                question: 'ヨーロッパ旅行でeSIMは必要ですか？',
                answer:
                    '空港やホテルのWi-Fiだけだと、到着直後の地図・翻訳・保険デスク連絡が止まります。出発前にeSIMを入れておくと初動が早くなります。',
            },
            {
                question: 'ヨーロッパ周遊と国別プラン、どちらがいいですか？',
                answer:
                    '1カ国滞在なら国別、複数国周遊ならヨーロッパ周遊プランが向きます。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    '渡航先を選んで購入・インストールし、到着後にデータ通信をオンにします。その後、このサイトで都市名から日本語対応病院を検索してください。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    'データ通信中心のプランではアプリやメール連絡が中心です。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
    'north-america': {
        slug: 'north-america',
        label: '北米向けeSIM',
        continentHref: '/north-america',
        continentLabel: '北米',
        title: '北米で使えるeSIM｜病院を探す前に通信を確保',
        description:
            'ロサンゼルス、ホノルル、ニューヨークなど北米で日本語対応病院を探すなら、到着前のeSIMが先です。アメリカ・カナダ向けプランを比較。',
        intro:
            '北米は日本語対応クリニックが多い都市もありますが、到着直後に地図・保険カード・予約連絡をするには通信が先です。出発前のeSIMが初動を助けます。',
        why: 'にほんごドクター.com ではアメリカ・カナダの日本語対応医療機関を掲載しています。都市ページをすぐ開ける状態にしておくと安心です。',
        chooseTour:
            'アメリカとカナダをまたぐなら、JAPAN&GLOBAL eSIMのアメリカ&カナダプランが候補です。',
        chooseSupport:
            '設定や接続で困ったときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。',
        heroCaption: 'ロサンゼルス・ホノルルなど、渡航前に通信を確保しておくと病院検索がスムーズです。',
        jgShort: 'アメリカ&カナダ',
        hospitalLinks: [
            { href: '/north-america', label: '北米の病院一覧' },
            { href: '/north-america/united-states/los-angeles', label: 'ロサンゼルス' },
            { href: '/north-america/united-states/honolulu', label: 'ホノルル' },
        ],
        faqs: [
            {
                question: '北米旅行でeSIMは必要ですか？',
                answer:
                    '空港Wi-Fiだけだと混雑で止まりがちです。病院検索・保険デスク連絡のために、出発前のeSIMがあると安心です。',
            },
            {
                question: 'アメリカとカナダ、別々のプランが必要ですか？',
                answer:
                    '両国を回るならアメリカ&カナダの周遊プランが便利です。1カ国滞在なら国別プランでも十分です。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    '渡航先を選んで購入・インストールし、到着後にデータ通信をオンにしてから、このサイトの北米ページを開いてください。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    'データ通信中心のプランではアプリやメール連絡が中心です。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
    oceania: {
        slug: 'oceania',
        label: 'オセアニア向けeSIM',
        continentHref: '/oceania',
        continentLabel: 'オセアニア',
        title: 'オセアニアで使えるeSIM｜病院を探す前に通信を確保',
        description:
            'オーストラリア・ニュージーランドなどオセアニアで日本語対応病院を探すなら、到着前のeSIMが先です。周遊プランと日本語サポート付きを比較。',
        intro:
            'オセアニアは移動距離が長く、到着直後に地図・予約・保険デスクへ連絡する場面が多いです。出発前にeSIMを入れておくと初動が早くなります。',
        why: 'にほんごドクター.com ではオセアニアの日本語対応医療機関を掲載しています。都市ページをすぐ開ける通信があると安心です。',
        chooseTour:
            'オーストラリアとニュージーランドをまたぐなら、JAPAN&GLOBAL eSIMのオセアニア周遊や豪NZプランが候補です。',
        chooseSupport:
            '接続や設定で困ったときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。',
        heroCaption: 'オーストラリア・ニュージーランドなど、渡航前に通信を確保しておくと病院検索がスムーズです。',
        jgShort: 'オセアニア周遊',
        hospitalLinks: [
            { href: '/oceania', label: 'オセアニアの病院一覧' },
        ],
        faqs: [
            {
                question: 'オセアニア旅行でeSIMは必要ですか？',
                answer:
                    '空港やホテルのWi-Fiだけだと、到着直後の地図・保険デスク連絡が止まります。出発前のeSIMが初動を助けます。',
            },
            {
                question: '周遊と国別、どちらがいいですか？',
                answer:
                    '1カ国滞在なら国別、豪NZをまたぐなら周遊プランが向きます。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    '渡航先を選んで購入・インストールし、到着後にデータ通信をオンにしてから病院検索へ進みます。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    'データ通信中心のプランではアプリやメール連絡が中心です。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
    'latin-america': {
        slug: 'latin-america',
        label: '中南米向けeSIM',
        continentHref: '/latin-america',
        continentLabel: '中南米',
        title: '中南米で使えるeSIM｜病院を探す前に通信を確保',
        description:
            '中南米で日本語対応病院を探すなら、到着前のeSIMが先です。周遊プランと日本語サポート付きサービスを比較。',
        intro:
            '中南米は日本語対応病院の件数が限られる都市もあります。到着直後に地図・翻訳・保険デスクへ連絡するには、出発前のeSIMが有効です。',
        why: 'にほんごドクター.com では中南米の日本語対応医療機関を掲載しています。件数が少ない地域ほど、通信を先に確保しておくと安心です。',
        chooseTour:
            '複数国を回るなら、アメリカ大陸&カリブ海周遊などの広域プランが候補です。',
        chooseSupport:
            '接続や設定で困ったときは、地球の歩き方eSIMやトリファの日本語サポートが向きます。',
        heroCaption: '渡航先が複数なら周遊プランを、1カ国なら国別プランを先に確認します。',
        jgShort: '米大陸・カリブ周遊',
        hospitalLinks: [
            { href: '/latin-america', label: '中南米の病院一覧' },
        ],
        faqs: [
            {
                question: '中南米旅行でeSIMは必要ですか？',
                answer:
                    '空港Wi-Fiだけだと、到着直後の地図・保険デスク・病院検索が止まりがちです。出発前のeSIMが初動を助けます。',
            },
            {
                question: '周遊と国別、どちらがいいですか？',
                answer:
                    '1カ国滞在なら国別、複数国を回るなら広域周遊プランが向きます。',
            },
            {
                question: 'SailyのeSIMはどう使いますか？',
                answer:
                    '渡航先を選んで購入・インストールし、到着後にデータ通信をオンにしてから病院検索へ進みます。',
            },
            {
                question: '病院の電話や保険デスクはeSIMで連絡できますか？',
                answer:
                    'データ通信中心のプランではアプリやメール連絡が中心です。緊急時は現地の救急番号を優先してください。',
            },
        ],
    },
};

export const ESIM_REGION_SLUGS = Object.keys(ESIM_REGIONS) as EsimRegion[];

export function isEsimRegion(value: string): value is EsimRegion {
    return value in ESIM_REGIONS;
}
