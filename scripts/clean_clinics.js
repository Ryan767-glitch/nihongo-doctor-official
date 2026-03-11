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
    // Fix specific broken phones user mentioned
    if (rawPhone.includes('(02)-XXXX-XXXX')) return '';
    if (rawPhone.trim() === '131 450') return '131450'; // Special TIS number in Aus

    // Extract all digits
    const digitMatch = rawPhone.match(/\d+/g);
    if (!digitMatch) return '';
    let digits = digitMatch.join('');

    if (digits.length < 5) return ''; // Too short to be a valid phone

    // Remove leading zeros for international formatting if we have a country code
    const code = countryPhoneCodes[country];
    if (code) {
        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }
        // ensure no double country code
        const numericCode = code.replace('+', '');
        if (digits.startsWith(numericCode)) {
            return '+' + digits;
        }
        return `${code}${digits}`;
    }

    return '+' + digits; // Fallback
}

clinicsData.forEach(clinic => {
    // 1. Phone numbers
    let originalPhone = clinic.phone || '';
    if (originalPhone === 'tel:(02)-2524-') originalPhone = ''; // broken
    if (originalPhone.includes('+254-(0)')) originalPhone = '+254'; // Try to fix or remove
    if (clinic.nameJa.includes('フォレストジャパン') && clinic.country === 'ケニア') {
        originalPhone = ''; // Phone was missing in remarks too based on feedback
    }

    clinic.phoneClean = cleanPhone(originalPhone, clinic.country);

    // 2. URLs (Website)
    let siteUrl = clinic.website || '';
    if (!siteUrl && clinic.notes) {
        // extract from notes if present
        const urlMatch = clinic.notes.match(/www\.[^\s]+|http[s]?:\/\/[^\s]+/);
        if (urlMatch) {
            siteUrl = urlMatch[0];
            if (!siteUrl.startsWith('http')) {
                siteUrl = 'https://' + siteUrl;
            }
        }
    }
    if (siteUrl && siteUrl.startsWith('http://')) {
        siteUrl = siteUrl.replace('http://', 'https://');
    }
    clinic.website = siteUrl;

    // 3. Google Maps URL - Simplify
    if (clinic.googleMapsUrl) {
        const query = encodeURIComponent(`${clinic.nameEn || clinic.nameJa} ${clinic.city} ${clinic.country}`);
        clinic.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    }

    // 4. Fix Structure / Headings 
    // Identify if strictly a department or facility type
    const badNames = ['皮膚科', '精神科', '州立', '救急', 'アラモアナ', 'ワイキキ支店'];
    if (badNames.includes(clinic.nameJa)) {
        // Swap with subtitle or notes if it makes sense, or inject generic
        if (clinic.nameJa === '皮膚科' && clinic.country === 'オーストリア') clinic.nameJa = '岡本医師 (皮膚科)';
        if (clinic.nameJa === '精神科' && clinic.country === 'フランス') clinic.nameJa = '太田医師 (精神科)';
        if (clinic.nameJa === '州立' && clinic.city === 'ジュネーブ') clinic.nameJa = 'ジュネーブ大学病院';
        if (clinic.nameJa === '救急' && clinic.city === 'キャンベラ') clinic.nameJa = 'キャンベラ病院 (救急)';
        if (clinic.nameJa === 'アラモアナ') clinic.nameJa = '聖ルカクリニック アラモアナ';
        if (clinic.nameJa === 'ワイキキ支店') clinic.nameJa = '聖ルカクリニック ワイキキ支店';
        clinic.nameEn = clinic.nameJa;
    }

    // 5. Hide "要確認"
    if (clinic.hoursDescription && (clinic.hoursDescription.includes('要確認') || clinic.hoursDescription.includes('要問合せ'))) {
        clinic.hoursDescription = '直接お問い合わせください';
    }

    // 6. Language Support level adjustments for Latin America / Africa
    if (['コロンビア', 'チリ', 'ペルー', 'ケニア', 'ナイジェリア', '南アフリカ', 'エチオピア'].includes(clinic.country)) {
        if (clinic.japaneseSupportDetails && clinic.japaneseSupportDetails.includes('英語')) {
            clinic.supportLevel = 'none'; // Or 'english' if we create a new badge
            clinic.japaneseSupportDetails = '英語対応（日本語対応なし）';
        }
    }
    // Forest Japan Medical Center in Kenya actually has Japanese support usually
    if (clinic.nameJa.includes('フォレストジャパン')) {
        clinic.supportLevel = 'medical';
        clinic.japaneseSupportDetails = '日本人医師・日本語サポート';
    }

    // 7. WA TIS Record
    if (clinic.nameJa.includes('要確認') && clinic.country === 'オーストラリア' && clinic.city === 'WA') {
        clinic.nameJa = 'TIS通訳サービス (WA州)';
        clinic.nameEn = 'TIS National (WA)';
        clinic.supportLevel = 'support';
    }
});

fs.writeFileSync(clinicsPath, JSON.stringify(clinicsData, null, 2), 'utf8');
console.log(`Successfully updated ${clinicsData.length} clinics in clinics.json`);
