
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getCountryFlag(countryName: string): string {
    const flags: Record<string, string> = {
        // Asia
        "インドネシア": "🇮🇩", "Indonesia": "🇮🇩",
        "カンボジア": "🇰🇭", "Cambodia": "🇰🇭",
        "シンガポール": "🇸🇬", "Singapore": "🇸🇬",
        "タイ": "🇹🇭", "Thailand": "🇹🇭",
        "フィリピン": "🇵🇭", "Philippines": "🇵🇭",
        "ベトナム": "🇻🇳", "Vietnam": "🇻🇳",
        "マレーシア": "🇲🇾", "Malaysia": "🇲🇾",
        "ミャンマー": "🇲🇲", "Myanmar": "🇲🇲",
        "ラオス": "🇱🇦", "Laos": "🇱🇦",
        "中国": "🇨🇳", "China": "🇨🇳",
        "中国（香港）": "🇭🇰", "Hong Kong": "🇭🇰",
        "香港": "🇭🇰",
        "台湾": "🇹🇼", "Taiwan": "🇹🇼",
        "韓国": "🇰🇷", "South Korea": "🇰🇷",
        "インド": "🇮🇳", "India": "🇮🇳",
        "ブルネイ": "🇧🇳", "Brunei": "🇧🇳",
        "ネパール": "🇳🇵", "Nepal": "🇳🇵",
        "モンゴル": "🇲🇳", "Mongolia": "🇲🇳",
        "スリランカ": "🇱🇰", "Sri Lanka": "🇱🇰",

        // North America
        "アメリカ合衆国": "🇺🇸", "USA": "🇺🇸",
        "カナダ": "🇨🇦", "Canada": "🇨🇦",

        // Europe
        "イギリス": "🇬🇧", "UK": "🇬🇧",
        "フランス": "🇫🇷", "France": "🇫🇷",
        "ドイツ": "🇩🇪", "Germany": "🇩🇪",
        "イタリア": "🇮🇹", "Italy": "🇮🇹",
        "スペイン": "🇪🇸", "Spain": "🇪🇸",
        "スイス": "🇨🇭", "Switzerland": "🇨🇭",
        "オランダ": "🇳🇱", "Netherlands": "🇳🇱",
        "ベルギー": "🇧🇪", "Belgium": "🇧🇪",
        "オーストリア": "🇦🇹", "Austria": "🇦🇹",
        "スウェーデン": "🇸🇪", "Sweden": "🇸🇪",
        "デンマーク": "🇩🇰", "Denmark": "🇩🇰",
        "フィンランド": "🇫🇮", "Finland": "🇫🇮",
        "ノルウェー": "🇳🇴", "Norway": "🇳🇴",
        "ポルトガル": "🇵🇹", "Portugal": "🇵🇹",
        "ポーランド": "🇵🇱", "Poland": "🇵🇱",
        "チェコ": "🇨🇿", "Czech Republic": "🇨🇿",
        "ギリシャ": "🇬🇷", "Greece": "🇬🇷",
        "アイルランド": "🇮🇪", "Ireland": "🇮🇪",
        "ハンガリー": "🇭🇺", "Hungary": "🇭🇺",
        "ロシア": "🇷🇺", "Russia": "🇷🇺",
        "トルコ": "🇹🇷", "Turkey": "🇹🇷",

        // Oceania
        "オーストラリア": "🇦🇺", "Australia": "🇦🇺",
        "ニュージーランド": "🇳🇿", "New Zealand": "🇳🇿",

        // Latin America
        "メキシコ": "🇲🇽", "Mexico": "🇲🇽",
        "ブラジル": "🇧🇷", "Brazil": "🇧🇷",
        "アルゼンチン": "🇦🇷", "Argentina": "🇦🇷",
        "チリ": "🇨🇱", "Chile": "🇨🇱",
        "ペルー": "🇵🇪", "Peru": "🇵🇪",
        "コロンビア": "🇨🇴", "Colombia": "🇨🇴",

        // Middle East & Africa
        "UAE": "🇦🇪", "アラブ首長国連邦": "🇦🇪",
        "サウジアラビア": "🇸🇦", "Saudi Arabia": "🇸🇦",
        "イスラエル": "🇮🇱", "Israel": "🇮🇱",
        "カタール": "🇶🇦", "Qatar": "🇶🇦",
        "エジプト": "🇪🇬", "Egypt": "🇪🇬",
        "南アフリカ": "🇿🇦", "South Africa": "🇿🇦",
        "ケニア": "🇰🇪", "Kenya": "🇰🇪"
    };

    // return the flag or a generic globe if not found
    return flags[countryName] || "🌎";
}
// ... imports

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkIsOpen(hours: any): boolean {
    if (!hours) return false;
    // ... (keep existing logic or simplified logic)
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    const todaysHours = hours[day];
    if (!todaysHours || todaysHours.length < 2) return false;

    const [start, end] = todaysHours;
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);

    const currentLink = now.getHours() * 60 + now.getMinutes();
    const startMins = h1 * 60 + m1;
    const endMins = h2 * 60 + m2;

    return currentLink >= startMins && currentLink < endMins;
}

export function stringToColor(str: string): string {
    const colors = [
        "bg-red-100 text-red-800 border-red-200",
        "bg-orange-100 text-orange-800 border-orange-200",
        "bg-amber-100 text-amber-800 border-amber-200",
        "bg-green-100 text-green-800 border-green-200",
        "bg-emerald-100 text-emerald-800 border-emerald-200",
        "bg-teal-100 text-teal-800 border-teal-200",
        "bg-cyan-100 text-cyan-800 border-cyan-200",
        "bg-sky-100 text-sky-800 border-sky-200",
        "bg-blue-100 text-blue-800 border-blue-200",
        "bg-indigo-100 text-indigo-800 border-indigo-200",
        "bg-violet-100 text-violet-800 border-violet-200",
        "bg-purple-100 text-purple-800 border-purple-200",
        "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
        "bg-pink-100 text-pink-800 border-pink-200",
        "bg-rose-100 text-rose-800 border-rose-200",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}
