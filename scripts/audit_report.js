const fs = require('fs');
const path = require('path');

const clinics = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/clinics.json'), 'utf8'));

const issues = {
    brokenPhones: [],
    emptyPhones: [],
    nameSameJaEn: [],
    nameIsJapaneseLabel: [],
    missingAddress: [],
    duplicateIds: [],
    nonMedical: [],
    continentCounts: {},
    countryCounts: {},
    total: clinics.length,
};

const seenIds = new Set();
const JAPANESE_LABEL_PATTERNS = ['日本語対応', '日本語歯科', '日本語サポート'];

// Known problematic patterns from phone audit
const BROKEN_PHONE_PATTERN = /\d{15,}/; // phones with 15+ consecutive digits are likely corrupted
const DOUBLE_NUMBER_PATTERN = /\+\d{7,}\d{7,}/; // two phone numbers concatenated
const NON_MEDICAL_KEYWORDS = ['通訳サービス', '通訳会社', 'NPO', '法律', '生活支援', '翻訳'];

clinics.forEach((c, i) => {
    // Check duplicate IDs
    if (seenIds.has(c.id)) {
        issues.duplicateIds.push({ id: c.id, name: c.nameJa });
    }
    seenIds.add(c.id);

    // Broken/corrupted phone numbers
    if (c.phoneClean && BROKEN_PHONE_PATTERN.test(c.phoneClean.replace(/[^0-9]/g, ''))) {
        issues.brokenPhones.push({ id: c.id, name: c.nameJa, phone: c.phone, phoneClean: c.phoneClean });
    }

    // Missing phone
    if (!c.phone || c.phone.trim() === '') {
        issues.emptyPhones.push({ id: c.id, name: c.nameJa, country: c.country, continent: c.continent });
    }

    // Name is a Japanese label (bug)
    if (JAPANESE_LABEL_PATTERNS.some(p => c.nameJa === p || c.nameEn === p)) {
        issues.nameIsJapaneseLabel.push({ id: c.id, nameJa: c.nameJa, nameEn: c.nameEn, country: c.country });
    }

    // nameJa === nameEn (possibly missing English translation or missing Japanese)
    if (c.nameJa && c.nameEn && c.nameJa !== c.nameEn) {
        // good
    }

    // Missing address
    if (!c.address || c.address.trim().length < 5) {
        issues.missingAddress.push({ id: c.id, name: c.nameJa, address: c.address });
    }

    // Continent counts
    issues.continentCounts[c.continent] = (issues.continentCounts[c.continent] || 0) + 1;
    issues.countryCounts[c.country] = (issues.countryCounts[c.country] || 0) + 1;
});

// Compute real totals
const uniqueCountries = Object.keys(issues.countryCounts).length;
const uniqueContinents = Object.keys(issues.continentCounts).length;

console.log('=== CLINIC DATA AUDIT REPORT ===\n');
console.log(`Total clinics: ${issues.total}`);
console.log(`Unique countries: ${uniqueCountries}`);
console.log(`Unique continents: ${uniqueContinents}`);

console.log('\n--- Counts by continent ---');
Object.entries(issues.continentCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    const countries = Object.entries(issues.countryCounts)
        .filter(([country]) => {
            const match = clinics.find(c => c.country === country);
            return match && match.continent === k;
        })
        .length;
    console.log(`  ${k}: ${v} clinics, ~${countries} countries`);
});

console.log('\n--- Countries by clinic count (top 20) ---');
Object.entries(issues.countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
});

console.log(`\n--- Broken/corrupted phone numbers (${issues.brokenPhones.length}) ---`);
issues.brokenPhones.forEach(c => {
    console.log(`  [${c.id}] ${c.name}: "${c.phone}" → phoneClean: "${c.phoneClean}"`);
});

console.log(`\n--- Missing phone numbers (${issues.emptyPhones.length}) ---`);
issues.emptyPhones.forEach(c => {
    console.log(`  [${c.id}] ${c.name} (${c.country}/${c.continent})`);
});

console.log(`\n--- Names that are Japanese labels (${issues.nameIsJapaneseLabel.length}) ---`);
issues.nameIsJapaneseLabel.forEach(c => {
    console.log(`  [${c.id}] nameJa: "${c.nameJa}" / nameEn: "${c.nameEn}" (${c.country})`);
});

console.log(`\n--- Missing/very short address (${issues.missingAddress.length}) ---`);
issues.missingAddress.forEach(c => {
    console.log(`  [${c.id}] ${c.name}: "${c.address}"`);
});

console.log(`\n--- Duplicate IDs (${issues.duplicateIds.length}) ---`);
issues.duplicateIds.forEach(c => console.log(`  [${c.id}] ${c.name}`));
