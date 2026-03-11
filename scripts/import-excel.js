const path = require('path');
const XLSX = require(path.resolve(__dirname, '../node_modules/xlsx'));
const fs = require('fs');

const OUT_FILE = path.join(__dirname, '../src/data/clinics.json');

const REGION_FILES = [
    { file: 'F:\\アジア日本語対応医療機関一覧.xlsx', region: 'Asia' },
    { file: 'F:\\drive-download-20260219T055058Z-1-001\\アフリカ日本語対応医療機関一覧.xlsx', region: 'Africa & Middle East' },
    { file: 'F:\\アメリカ日本語対応医療機関一覧 (1).xlsx', region: 'North America' },
    { file: 'F:\\drive-download-20260219T055058Z-1-001\\ヨーロッパ日本語対応医療機関一覧.xlsx', region: 'Europe' },
    { file: 'F:\\drive-download-20260219T055058Z-1-001\\南米日本語対応医療機関一覧.xlsx', region: 'Latin America' },
    { file: 'F:\\drive-download-20260219T055058Z-1-001\\豪州NZ日本語対応医療機関一覧.xlsx', region: 'Oceania' },
    { file: 'F:\\中東日本語対応医療機関一覧.xlsx', region: 'Africa & Middle East' }
];

function extractUrl(text) {
    if (!text || typeof text !== 'string') return '';
    const match = text.match(/(https?:\/\/[^\s]+)/g);
    return match ? match[0] : '';
}

function cleanPhone(text) {
    if (!text) return '';
    const str = String(text);
    const match = str.match(/[\d\-\+\s\(\)]{7,}/);
    if (match) {
        return match[0].trim();
    }
    return '';
}

let idCounter = 1;
const allClinics = [];

function addClinic(data, region, fallbackCountry, fallbackCity = '') {
    let nameJa = data.nameJa;
    let nameEn = data.nameEn;
    if (!nameJa && !nameEn) return;

    let finalNameJa = String(nameJa || nameEn || '').trim();
    const invalidNameKeywords = ['日本語看護師対応', '一般内科', '精神科', '循環器内科', '一般歯科', '歯科', '眼科', '小児科'];
    if (invalidNameKeywords.includes(finalNameJa) || finalNameJa.endsWith('科')) {
        if (finalNameJa === '日本語看護師対応' && nameEn && nameEn.includes('UCSF')) {
            finalNameJa = nameEn;
        }
    }

    const rawPhone = data.phone || '';
    const invalidPhoneKeywords = ['要確認', '要問合せ', '問合せ要', 'サイト参照', '公式', '参照', '予約', 'JMS'];
    const isPhoneInvalid = invalidPhoneKeywords.some(k => rawPhone.includes(k)) || !rawPhone.match(/\d/);
    const validPhone = isPhoneInvalid ? '' : rawPhone;
    const cleanTel = isPhoneInvalid ? '' : cleanPhone(rawPhone);

    const supportText = (data.japaneseSupport || '') + (data.notes || '');
    let supportLevel = 'none';
    if (supportText.match(/日本人医師|日本語医師|日系|Japanese doctor/i)) {
        supportLevel = 'medical';
    } else if (supportText.match(/日本語スタッフ|日本語看護師|通訳|デスク|JMS|日本語対応/i) || (data.japaneseSupport || '').length > 2) {
        supportLevel = 'support';
    }

    let finalSubline = (data.specialties || '').split(/・|、|,|\n/).map(s => s.trim()).filter(Boolean);

    const clinic = {
        id: String(idCounter++),
        nameJa: finalNameJa,
        nameEn: nameEn || finalNameJa,
        continent: region,
        country: data.country || fallbackCountry || '',
        city: data.city || fallbackCity || '',
        address: data.address || '',
        phone: validPhone,
        phoneClean: cleanTel,
        supportLevel: supportLevel,
        website: data.website || extractUrl(data.notes || ''),
        googleMapsUrl: data.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((finalNameJa) + ' ' + (data.address || '') + ' ' + (data.city || '') + ' ' + (data.country || fallbackCountry || ''))}`,
        specialties: finalSubline,
        hoursDescription: data.hours || '',
        japaneseSupportDetails: data.japaneseSupport || (supportLevel === 'none' && region === 'Africa & Middle East' ? '英語対応（日本語非対応）' : ''),
        emergencyAvailable: (data.hours || '').includes('24時間') || (data.specialties || '').includes('救急'),
        cashlessAvailable: (data.insurance || '').includes('キャッシュレス') || (data.insurance || '').includes('保険対応'),
        notes: (data.notes && typeof data.notes === 'string') ? data.notes.replace(extractUrl(data.notes || ''), '').trim() : '',
    };

    allClinics.push(clinic);
}


console.log('Starting import...');

REGION_FILES.forEach(item => {
    const filePath = item.file;
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    console.log(`Processing ${item.region} from ${item.file}...`);
    const workbook = XLSX.readFile(filePath);

    workbook.SheetNames.forEach(sheetName => {
        if (sheetName.includes('目次') || sheetName.includes('概要') || sheetName.includes('事情') || sheetName.includes('注意事項') || sheetName.includes('地域別まとめ') || sheetName.includes('国別サマリー') || sheetName.includes('ご利用にあたって')) {
            return;
        }

        console.log(`  Processing sheet: ${sheetName}`);
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Custom parser for Dubai
        if (sheetName === '①ドバイ（日本語対応）') {
            console.log('    Using custom parser for Dubai sheet');
            let currentClinic = null;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.length === 0) continue;

                const val1 = String(row[0] || '').trim();
                const val2 = String(row[1] || '').trim();

                if (val1 === '施設名（日本語）' || (val1 === '施設名（英語）' && !currentClinic)) {
                    if (currentClinic) {
                        addClinic(currentClinic, item.region, 'UAE', 'Dubai');
                    }
                    currentClinic = {};
                    if (val1 === '施設名（日本語）') currentClinic.nameJa = val2;
                    else currentClinic.nameEn = val2;
                } else if (currentClinic) {
                    if (val1 === '施設名（英語）') currentClinic.nameEn = val2;
                    else if (val1 === '所在地') currentClinic.address = val2;
                    else if (val1 === '電話番号' || val1.includes('電話番号')) {
                        currentClinic.phone = (currentClinic.phone ? currentClinic.phone + ' / ' : '') + val2;
                    }
                    else if (val1 === 'ウェブサイト') currentClinic.website = val2;
                    else if (val1 === '診療時間') currentClinic.hours = val2;
                    else if (val1 === '診療科目') currentClinic.specialties = val2;
                    else if (val1 === '日本語対応') currentClinic.japaneseSupport = val2;
                    else if (val1 === '保険・支払い') currentClinic.insurance = val2;
                    else if (val1 === '備考' || val1 === '特徴') {
                        currentClinic.notes = (currentClinic.notes ? currentClinic.notes + ' ' : '') + val2;
                    }
                }
            }
            if (currentClinic) {
                addClinic(currentClinic, item.region, 'UAE', 'Dubai');
            }
            return;
        }

        let headerRowIndex = -1;
        let headers = [];

        for (let i = 0; i < Math.min(rows.length, 20); i++) {
            const row = rows[i];
            if (!row || !Array.isArray(row)) continue;

            const rowStr = row.map(c => String(c)).join(' ');
            const hasCountry = rowStr.includes('国') || rowStr.toLowerCase().includes('country') || rowStr.includes('地域');
            const hasCityOrAddress = rowStr.includes('都市') || rowStr.includes('市') || rowStr.includes('住所') || rowStr.toLowerCase().includes('city') || rowStr.toLowerCase().includes('address');
            const hasFacility = rowStr.includes('施設名') || rowStr.toLowerCase().includes('clinic') || rowStr.toLowerCase().includes('hospital') || rowStr.includes('病院名');

            if ((hasCountry && hasCityOrAddress) || (hasCityOrAddress && hasFacility) || (hasCountry && hasFacility)) {
                headerRowIndex = i;
                headers = row;
                break;
            }
        }

        if (headerRowIndex === -1) {
            console.warn(`    Could not find header row for sheet ${sheetName}`);
            return;
        }

        const findCol = (keywords, excludes = []) => headers.findIndex(h => {
            if (!h || typeof h !== 'string') return false;
            const matchesKeyword = keywords.some(k => h.includes(k));
            const matchesExclude = excludes.some(e => h.includes(e));
            return matchesKeyword && !matchesExclude;
        });

        let colCountry = findCol(['国', '国名']);
        let colCity = findCol(['都市', '地区', '地域', 'City', 'エリア', '首長国']);
        let colNameJa = findCol(['施設名（日本語）', '日本語名称', '日本語', '施設名', '病院名'], ['英語', 'English', '電話', 'Phone']);
        let colNameEn = findCol(['施設名（英語）', '施設名（英語/現地語）', '英語名称', '英語', '現地語'], ['日本語', 'Japanese']);
        let colAddress = findCol(['住所', 'Address', '所在地']);
        let colPhone = findCol(['電話', '連絡先']);
        let colSpecialties = findCol(['診療科', '科目']);
        let colHours = findCol(['診療時間', 'Hours']);
        let colJapaneseSupport = findCol(['日本語対応', '日本語サポート', '対応内容', '日本人医師', '医師・スタッフ']);
        let colInsurance = findCol(['保険', 'キャッシュレス', '費用']);
        let colNotes = findCol(['備考', 'URL', 'Note', 'WEB', 'ホームページ']);

        let idxNameJa = findCol(['施設名（日本語）', '日本語名称']);
        if (idxNameJa === -1) idxNameJa = findCol(['施設名', '病院名']);

        if (colNameJa === -1 && idxNameJa !== -1) colNameJa = idxNameJa;

        for (let i = headerRowIndex + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            const nameJa = colNameJa >= 0 ? row[colNameJa] : undefined;
            const nameEn = colNameEn >= 0 ? row[colNameEn] : undefined;
            if (!nameJa && !nameEn) continue;

            let fallbackCountry = '';
            if (item.region === 'North America') {
                const rowStrValues = row.join(' ');
                if (rowStrValues.match(/カナダ|BC州|ON州|QC州|AB州|バンクーバー|トロント|オタワ|モントリオール|カルガリー|エドモントン/)) {
                    fallbackCountry = 'Canada';
                } else {
                    fallbackCountry = 'United States';
                }
            }
            if (item.region === 'Africa & Middle East') {
                if (sheetName.includes('UAE') || sheetName.includes('ドバイ') || sheetName.includes('アブダビ')) fallbackCountry = 'UAE';
                else if (sheetName.includes('サウジ')) fallbackCountry = 'Saudi Arabia';
                else if (sheetName.includes('カタール')) fallbackCountry = 'Qatar';
                else if (sheetName.includes('クウェート')) fallbackCountry = 'Kuwait';
                else if (sheetName.includes('バーレーン')) fallbackCountry = 'Bahrain';
            }

            const data = {
                country: colCountry >= 0 ? row[colCountry] : '',
                city: colCity >= 0 ? row[colCity] : '',
                nameJa: nameJa,
                nameEn: nameEn,
                address: colAddress >= 0 ? row[colAddress] : '',
                phone: colPhone >= 0 ? row[colPhone] : '',
                specialties: colSpecialties >= 0 ? row[colSpecialties] : '',
                hours: colHours >= 0 ? row[colHours] : '',
                japaneseSupport: colJapaneseSupport >= 0 ? row[colJapaneseSupport] : '',
                insurance: colInsurance >= 0 ? row[colInsurance] : '',
                notes: colNotes >= 0 ? row[colNotes] : ''
            };

            addClinic(data, item.region, fallbackCountry);
        }
    });
});

console.log(`Total clinics imported: ${allClinics.length}`);
fs.writeFileSync(OUT_FILE, JSON.stringify(allClinics, null, 2));
console.log(`Wrote to ${OUT_FILE}`);
