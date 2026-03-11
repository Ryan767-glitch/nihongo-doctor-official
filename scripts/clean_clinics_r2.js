const fs = require('fs');
const path = require('path');

const clinicsPath = path.join(__dirname, '../src/data/clinics.json');
const clinicsData = JSON.parse(fs.readFileSync(clinicsPath, 'utf8'));

const countryPhoneCodes = {
    'タイ': '+66', 'ベトナム': '+84', 'マレーシア': '+60', 'インドネシア': '+62',
    'シンガポール': '+65', 'フィリピン': '+63', 'カンボジア': '+855', 'ミャンマー': '+95',
    'インド': '+91', '中国': '+86', '台湾': '+886', '韓国': '+82', '香港': '+852',
    'オーストラリア': '+61', 'ニュージーランド': '+64', 'アメリカ': '+1', 'カナダ': '+1',
    'イギリス': '+44', 'ドイツ': '+49', 'フランス': '+33', 'イタリア': '+39',
    'オランダ': '+31', 'ベルギー': '+32', 'スイス': '+41', 'スペイン': '+34',
    'オーストリア': '+43', 'チェコ': '+420', 'ハンガリー': '+36', 'ポーランド': '+48',
    'ルーマニア': '+40', 'メキシコ': '+52', 'ブラジル': '+55', 'ペルー': '+51',
    'チリ': '+56', 'コロンビア': '+57', 'アルゼンチン': '+54', 'エジプト': '+20',
    'ナイジェリア': '+234', 'ケニア': '+254', '南アフリカ': '+27', 'エチオピア': '+251',
    'UAE': '+971', 'アラブ首長国連邦': '+971', 'イスラエル': '+972', 'トルコ': '+90',
    '日本': '+81'
};

function cleanPhone(rawPhone, country) {
    if (!rawPhone || rawPhone.includes('不明') || rawPhone.includes('なし')) return '';
    if (rawPhone.includes('(02)-XXXX')) return '';
    if (rawPhone.includes('+254-(0)XX')) return '';
    if (rawPhone.trim() === '131 450' || rawPhone.includes('131450')) return '131450';

    // If there are multiple numbers separated by slash/comma/space, take only the FIRST ONE logically
    // Some source data had "023-991-0000 / 023-991-222" which became concatenated
    let firstPhonePart = rawPhone.split(/[\/\,\s]/)[0];

    const digitMatch = firstPhonePart.match(/\d+/g);
    if (!digitMatch) return '';
    let digits = digitMatch.join('');

    if (digits.length < 5) return '';

    const code = countryPhoneCodes[country];
    if (code) {
        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }
        const numericCode = code.replace('+', '');
        // Prevent double country codes AND fix missing +1 for NA
        if (digits.startsWith(numericCode)) {
            return '+' + digits;
        }
        // North America special handling: if it's 10 digits and US/Canada, just add +1
        if ((country === 'アメリカ' || country === 'カナダ') && digits.length === 10) {
            return '+1' + digits;
        }

        return `${code}${digits}`;
    }

    return '+' + digits;
}

clinicsData.forEach(clinic => {
    // 1. Phone number fixes (Concatenation, Missing +1, Broken links)
    // We need to re-parse from the ORIGINAL 'phone' field to avoid the double-concatenated mess in 'phoneClean'
    let rawP = clinic.phone || '';
    if (clinic.nameJa.includes('アル・サラム国際病院') && rawP.includes('2524')) rawP = ''; // Incomplete number per feedback
    if (clinic.nameJa.includes('アル・シェファ')) rawP = '';

    clinic.phoneClean = cleanPhone(rawP, clinic.country);

    // 2. URL Fixes (Extract links hidden in remarks that previous pass missed)
    if (!clinic.website && clinic.notes) {
        // Look for any standard URL pattern remaining in notes
        const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\/[^\s]*)/;
        const match = clinic.notes.match(urlPattern);
        if (match) {
            let foundUrl = match[0];
            // simple check to avoid picking up email addresses
            if (!foundUrl.includes('@')) {
                if (!foundUrl.startsWith('http')) foundUrl = 'https://' + foundUrl;
                clinic.website = foundUrl;
            }
        }
    }

    // Hardcode missing URLs/Phones based on user feedback if we know them, 
    // else we just ensure buttons don't appear for empty data
    if (clinic.nameJa.includes('日本メディカルクリニック') && clinic.city === 'ロサンゼルス') {
        clinic.website = clinic.website || 'https://www.nihonmedical.com';
    }
    if (clinic.nameJa.includes('慶応ノースウエスタン') && clinic.city === 'シカゴ') {
        clinic.website = clinic.website || 'https://www.keionw.org';
    }
    if (clinic.nameJa.includes('聖ルカクリニック') && clinic.city === 'ホノルル') {
        clinic.website = clinic.website || 'https://www.st-lukesclinic.com';
    }
    if (clinic.nameJa.includes('ドクターズ・オン・コール') && clinic.city === 'ホノルル') {
        clinic.website = clinic.website || 'https://www.doctorsoncallhawaii.com';
        clinic.phoneClean = clinic.phoneClean || '+18089716000';
        clinic.phone = clinic.phone || '808-971-6000';
    }
    if (clinic.nameJa.includes('アムステルランド病院')) {
        clinic.website = clinic.website || 'https://www.ziekenhuisamstelland.nl/nl/japan-desk';
    }

    // 3. H3 Header Inversions (nameJa vs specialties)
    const inversions = [
        { name: 'SOS Medika Cipete', expected: 'SOS Medika Klinik Cipete' },
        { name: '### 州立', expected: 'ジュネーブ大学病院' }, // Swiss
        { name: '### 精神科', expected: '太田医師 (精神科)' }, // Paris
        { name: '### 皮膚科', expected: '岡本医師 (皮膚科)' }, // Vienna
        { name: '### アラモアナ', expected: '聖ルカクリニック アラモアナ' }, // Hawaii
        { name: '### ワイキキ支店', expected: '聖ルカクリニック ワイキキ' }, // Hawaii
        { name: '### 日本語看護師対応', expected: 'UCSF Health' }, // SF
    ];

    for (const inv of inversions) {
        if (clinic.nameJa === inv.name || clinic.nameJa.includes(inv.name)) {
            clinic.nameJa = inv.expected;
            clinic.nameEn = inv.expected;
        }
    }
    // Bangkok Hospital missing name in first entry
    if (!clinic.nameJa && clinic.address && clinic.address.includes('Bangkok Hospital')) {
        clinic.nameJa = 'バンコク病院 (Bangkok Hospital)';
        clinic.nameEn = 'Bangkok Hospital';
    }

});

fs.writeFileSync(clinicsPath, JSON.stringify(clinicsData, null, 2), 'utf8');
console.log(`Successfully completed round 2 data cleanup on ${clinicsData.length} clinics.`);
