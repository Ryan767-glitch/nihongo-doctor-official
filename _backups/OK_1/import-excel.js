const path = require('path');
const XLSX = require(path.resolve(__dirname, '../node_modules/xlsx'));
const fs = require('fs');

const DATA_DIR = 'f:\\drive-download-20260219T055058Z-1-001';
const OUT_FILE = path.join(__dirname, '../src/data/clinics.json');

const REGION_FILES = [
    { file: 'アジア日本語対応医療機関一覧.xlsx', region: 'Asia' },
    { file: 'アジア日本語対応医療機関一覧.xlsx', region: 'Asia' },
    { file: 'アフリカ日本語対応医療機関一覧.xlsx', region: 'Africa' },
    { file: 'アメリカ日本語対応医療機関一覧.xlsx', region: 'North America' },
    { file: 'ヨーロッパ日本語対応医療機関一覧.xlsx', region: 'Europe' },
    { file: '南米日本語対応医療機関一覧.xlsx', region: 'South America' },
    { file: '豪州NZ日本語対応医療機関一覧.xlsx', region: 'Oceania' }
];

// Helper to extract URL from text
function extractUrl(text) {
    if (!text || typeof text !== 'string') return '';
    const match = text.match(/(https?:\/\/[^\s]+)/g);
    return match ? match[0] : '';
}

// Global ID counter
let idCounter = 1;
const allClinics = [];

console.log('Starting import...');

REGION_FILES.forEach(item => {
    const filePath = path.join(DATA_DIR, item.file);
    if (!fs.existsSync(filePath)) {
        return;
    }

    console.log(`Processing ${item.region} from ${item.file}...`);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet to array of arrays to find header
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Find header row (must contain "国"/"Country" AND "都市"/"City"/"Address"/"住所")
    let headerRowIndex = -1;
    let headers = [];

    for (let i = 0; i < Math.min(rows.length, 20); i++) {
        const row = rows[i];
        if (!row || !Array.isArray(row)) continue;

        const rowStr = row.map(c => String(c)).join(' ');
        const hasCountry = rowStr.includes('国') || rowStr.toLowerCase().includes('country');
        const hasCityOrAddress = rowStr.includes('都市') || rowStr.includes('住所') || rowStr.toLowerCase().includes('city') || rowStr.toLowerCase().includes('address');
        const hasFacility = rowStr.includes('施設名') || rowStr.toLowerCase().includes('clinic') || rowStr.toLowerCase().includes('hospital');

        // Allow if Country+City OR (for NA) City+Facility
        if ((hasCountry && hasCityOrAddress) || (hasCityOrAddress && hasFacility)) {
            headerRowIndex = i;
            headers = row;
            break;
        }
    }

    if (headerRowIndex === -1) {
        console.warn(`Could not find header row for ${item.file}`);
        return;
    }

    console.log(`Found headers at row ${headerRowIndex}:`, headers);

    // Helper to find column index by keyword with exclusion
    const findCol = (keywords, excludes = []) => headers.findIndex(h => {
        if (!h || typeof h !== 'string') return false;
        const matchesKeyword = keywords.some(k => h.includes(k));
        const matchesExclude = excludes.some(e => h.includes(e));
        return matchesKeyword && !matchesExclude;
    });

    const colMap = {
        country: findCol(['国']), // Might be -1 for NA
        city: findCol(['都市', '地域', 'City', 'エリア']),
        nameJa: findCol(['施設名（日本語）', '日本語名称', '日本語', '施設名'], ['英語', 'English', '電話', 'Phone']),
        nameEn: findCol(['施設名（英語）', '英語名称', '英語', '現地語'], ['日本語', 'Japanese']),
        address: findCol(['住所', 'Address']),
        phone: findCol(['電話']),
        specialties: findCol(['診療科', '科目']),
        hours: findCol(['診療時間', 'Hours']),
        japaneseSupport: findCol(['日本語対応', '日本語サポート']),
        insurance: findCol(['保険', 'キャッシュレス', '費用']),
        notes: findCol(['備考', 'URL', 'Note'])
    };

    // If specific 'Japanese Name' column doesn't exist, fallback to generic 'Name' if avaliable
    let idxNameJa = findCol(['施設名（日本語）', '日本語名称']);
    if (idxNameJa === -1) idxNameJa = findCol(['施設名']); // Fallback to generic

    // If we only found generic name, assign it to nameJa (if nameJa was specifically mapped to -1 initially)
    if (colMap.nameJa === -1 && idxNameJa !== -1) colMap.nameJa = idxNameJa;

    // Iterate data rows
    for (let i = headerRowIndex + 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        // Determine Country
        let country = '';
        if (colMap.country !== -1) {
            country = row[colMap.country];
        } else if (item.region === 'North America') {
            // Fallback for NA file with Row 0 headers which lacks Country column
            // But verified file Row 0 has "地域" (Region), "都市/エリア"
            // Row 2 is "ニューヨーク", "Manhattan, NY"
            // Let's use "United States" as default.
            country = 'United States';
        }

        const name = row[colMap.nameJa] || row[colMap.nameEn];

        if (!country && !name) continue;

        const notesUrl = row[colMap.notes] || '';
        const website = extractUrl(notesUrl) || (typeof name === 'string' ? extractUrl(name) : '');

        // Cleanup name
        let cleanNameJa = row[colMap.nameJa];
        // If nameJa is missing, use nameEn. If cleanNameJa contains parens with english, maybe it's mixed.
        if (!cleanNameJa && row[colMap.nameEn]) cleanNameJa = row[colMap.nameEn];
        if (!cleanNameJa) cleanNameJa = 'Unknown Clinic';

        // Filter out title rows or empty data rows that got through
        // If name is "Unknown Clinic" AND (no address OR no phone), it's likely bad data
        if (cleanNameJa === 'Unknown Clinic' && (!row[colMap.address] && !row[colMap.phone])) {
            continue;
        }

        const clinic = {
            id: String(idCounter++),
            nameJa: cleanNameJa,
            nameEn: row[colMap.nameEn] || cleanNameJa,
            continent: item.region,
            country: country || '',
            city: row[colMap.city] || '',
            address: row[colMap.address] || '',
            phone: row[colMap.phone] || '',
            website: website,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((cleanNameJa) + ' ' + (row[colMap.address] || ''))}`,
            specialties: (row[colMap.specialties] || '').split(/・|、|,|\n/).map(s => s.trim()).filter(Boolean),
            hoursDescription: row[colMap.hours] || '',
            japaneseSupportDetails: row[colMap.japaneseSupport] || '',
            emergencyAvailable: (row[colMap.hours] || '').includes('24時間') || (row[colMap.specialties] || '').includes('救急'),
            cashlessAvailable: (row[colMap.insurance] || '').includes('キャッシュレス') || (row[colMap.insurance] || '').includes('保険対応'),
            notes: (notesUrl && typeof notesUrl === 'string') ? notesUrl.replace(website, '').trim() : ''
        };

        allClinics.push(clinic);
    }
});

console.log(`Total clinics imported: ${allClinics.length}`);
fs.writeFileSync(OUT_FILE, JSON.stringify(allClinics, null, 2));
console.log(`Wrote to ${OUT_FILE}`);
