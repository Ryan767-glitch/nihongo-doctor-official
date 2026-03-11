/**
 * City Name Normalization and Badge Fix Script
 * 1. Normalizes city names: パリXX区 → パリ, etc.
 * 2. Fixes newline chars in city names
 * 3. Fixes badge data for specific clinics
 */

const fs = require('fs');
const filePath = 'src/data/clinics.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// City normalization rules: map prefixes to normalized city names
function normalizeCity(city, country) {
    if (!city) return city;

    // Remove newlines and extra whitespace first
    city = city.replace(/[\r\n\t]+/g, ' ').trim();
    // Also remove surrounding quotes if any
    city = city.replace(/^"(.+)"$/, '$1').trim();

    // France: all パリ variants → パリ
    if (country === 'フランス') {
        if (city.startsWith('パリ')) return 'パリ';
        if (city.startsWith('パリ郊外')) return 'パリ（郊外）';
    }

    // Switzerland: ジュネーブXX → ジュネーブ
    if (country === 'スイス') {
        if (city.startsWith('ジュネーブ')) return 'ジュネーブ';
    }

    // Germany: ベルリンXX → ベルリン, フランクフルトXX → フランクフルト
    if (country === 'ドイツ') {
        if (city.startsWith('ベルリン')) return 'ベルリン';
        if (city.startsWith('フランクフルト')) return 'フランクフルト';
    }

    // UK: ロンドンXX → ロンドン
    if (country === '英国') {
        if (city.startsWith('ロンドン')) return 'ロンドン';
    }

    // South Africa: センチュリオン variants → センチュリオン
    if (country === '南アフリカ') {
        if (city.includes('センチュリオン')) return 'センチュリオン';
    }

    // Netherlands: アムステルXX → normalize
    if (country === 'オランダ') {
        if (city.startsWith('アムステル')) return city; // keep as is (different actual cities)
    }

    return city;
}

let changed = 0;

data.forEach(clinic => {
    // Fix city names
    const original = clinic.city;
    const normalized = normalizeCity(clinic.city, clinic.country);
    if (original !== normalized) {
        console.log(`[City Fix] ID:${clinic.id} (${clinic.country}): "${original}" → "${normalized}"`);
        clinic.city = normalized;
        changed++;
    }

    // Fix Evecare (ID 112): emergencyAvailable should be false (it's a hospital, not 24h emergency)
    if (clinic.id === '112') {
        if (clinic.emergencyAvailable) {
            console.log(`[Badge Fix] ID:${clinic.id} Evecare: emergencyAvailable true → false`);
            clinic.emergencyAvailable = false;
            changed++;
        }
        // supportLevel should stay 'support' (not medical, as Japanese doctor is not certified in local country)
    }

    // Fix Tavita (ID 98): emergencyAvailable is already false, just fix hoursDescription if needed
    if (clinic.id === '98') {
        if (clinic.hoursDescription && clinic.hoursDescription.includes('24時間訪問診療訪問診療')) {
            clinic.hoursDescription = '24時間訪問診療対応';
            console.log(`[Data Fix] ID:${clinic.id} Tavita: hoursDescription cleaned`);
            changed++;
        }
    }

    // Fix Queen Mary (ID 79): supportLevel is 'none' (English only) - already correct from data
    // but the notes say something contradictory - keep supportLevel:'none' which is correct
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`\n✅ Done! Changed ${changed} items.`);
