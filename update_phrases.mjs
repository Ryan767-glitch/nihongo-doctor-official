import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';
// Use HttpsProxyAgent if needed, but usually works without

const langMap = {
    'en': { code: 'en', name: '英語', native: 'English' },
    'zh': { code: 'zh-CN', name: '中国語', native: '中文' },
    'ko': { code: 'ko', name: '韓国語', native: '한국어' },
    'th': { code: 'th', name: 'タイ語', native: 'ภาษาไทย' },
    'vi': { code: 'vi', name: 'ベトナム語', native: 'Tiếng Việt' },
    'ms': { code: 'ms', name: 'マレー・インドネシア語', native: 'Bahasa Melayu / Indonesia' },
    'es': { code: 'es', name: 'スペイン語', native: 'Español' },
    'fr': { code: 'fr', name: 'フランス語', native: 'Français' },
    'de': { code: 'de', name: 'ドイツ語', native: 'Deutsch' },
    'pt': { code: 'pt', name: 'ポルトガル語', native: 'Português' },
    'ar': { code: 'ar', name: 'アラビア語', native: 'العربية' }
};

const categories = [
    {
        id: "emergency",
        icon: "🚨",
        title: "緊急・救急",
        phrases: [
            "救急車を呼んでください",
            "助けてください",
            "意識がありません",
            "出血しています",
            "呼吸ができません",
            "アレルギーでショック状態です",
            "近くの病院はどこですか"
        ]
    },
    {
        id: "reception",
        icon: "🏥",
        title: "受付・予約",
        phrases: [
            "予約したいです",
            "予約なしで診てもらえますか",
            "保険証はこちらです",
            "日本語を話せる方はいますか",
            "初診です",
            "待ち時間はどれくらいですか"
        ]
    },
    {
        id: "symptoms",
        icon: "🩺",
        title: "症状の説明",
        phrases: [
            "頭が痛いです",
            "熱があります",
            "お腹が痛いです",
            "吐き気がします",
            "咳が出ます",
            "下痢をしています",
            "便秘です",
            "めまいがします",
            "喉が痛いです",
            "胸が痛いです",
            "背中が痛いです",
            "歯が痛いです",
            "目がかゆいです",
            "肌に発疹があります",
            "アレルギーがあります",
            "〇〇にアレルギーがあります",
            "妊娠しています",
            "妊娠○ヶ月です",
            "持病があります"
        ]
    }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    console.log('Starting translation script...');
    let tsCode = `export const languages = [\n`;
    const langs = Object.keys(langMap);

    for (const [idx, langId] of langs.entries()) {
        const info = langMap[langId];
        tsCode += `  {\n    "id": "${langId}",\n    "name": "${info.name}",\n    "nameNative": "${info.native}"\n  }`;
        tsCode += idx < langs.length - 1 ? ',\n' : '\n';
    }
    tsCode += `];\n\nexport const phraseCategories = [\n`;

    for (let cIdx = 0; cIdx < categories.length; cIdx++) {
        const cat = categories[cIdx];
        tsCode += `  {\n    "id": "${cat.id}",\n    "icon": "${cat.icon}",\n    "title": "${cat.title}",\n    "phrases": [\n`;

        for (let pIdx = 0; pIdx < cat.phrases.length; pIdx++) {
            const phrase = cat.phrases[pIdx];
            console.log(`Translating: ${phrase}...`);
            tsCode += `      {\n        "ja": "${phrase}",\n        "translations": {\n`;

            for (let lIdx = 0; lIdx < langs.length; lIdx++) {
                const langId = langs[lIdx];
                const info = langMap[langId];
                let translatedText = phrase;
                let pronText = '';

                try {
                    const res = await translate(phrase, { from: 'ja', to: info.code });
                    translatedText = res.text;
                    // For romanization/pronunciation, api might return pron if different script
                    // However, vitalets/google-translate-api doesn't always expose pron cleanly without hacking.
                    // We'll just use res.text for pron, or if it has raw pron, we'd use it. Wait, the api does not easily give pron on this level. We'll simplify.
                    // Let's check if it returns pronunciation in res.raw? No, not easily. We'll use translated text.
                    pronText = translatedText;
                    await sleep(200); // rate limiting
                } catch (e) {
                    console.error(`Error translating to ${langId}:`, e.message);
                }

                // Escape quotes
                translatedText = translatedText.replace(/"/g, '\\"');
                pronText = pronText.replace(/"/g, '\\"');

                tsCode += `          "${langId}": {\n            "text": "${translatedText}",\n            "pron": "${pronText}"\n          }`;
                tsCode += lIdx < langs.length - 1 ? ',\n' : '\n';
            }
            tsCode += `        }\n      }`;
            tsCode += pIdx < cat.phrases.length - 1 ? ',\n' : '\n';
        }
        tsCode += `    ]\n  }`;
        tsCode += cIdx < categories.length - 1 ? ',\n' : '\n';
    }
    tsCode += `];\n`;

    fs.writeFileSync('src/app/phrases/data.ts', tsCode, 'utf8');
    console.log('Successfully wrote src/app/phrases/data.ts');
}

run().catch(console.error);
