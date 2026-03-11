const fs = require('fs');
const path = require('path');

const clinicsPath = path.join(__dirname, '../src/data/clinics.json');
const clinicsData = JSON.parse(fs.readFileSync(clinicsPath, 'utf8'));

// List of target replacements for names or issues
const nameReplacements = [
    { target: 'SOS Medika Cipete', expected: 'The Dingley Dental Group', city: 'メルボルン', addressMatch: 'Dingley' },
    { target: 'SOS Medika Cipete', expected: 'EverGlow Dental', city: 'メルボルン', addressMatch: 'EverGlow' },
    { target: '小児科 / 鈴木りさこ医師', expected: '鈴木りさこ医師 (小児科)' },
    { target: '州立 / ジュネーブ大学病院', expected: 'ジュネーブ大学病院' },
    { target: '精神科 / 太田博昭医師', expected: '太田博昭医師 (精神科)' },
    { target: '精神科 / 三村悌二医師', expected: '三村悌二医師 (精神科)' },
    { target: '循環器内科 / 近藤毅医師', expected: '近藤毅医師 (循環器内科)' },
    { target: '一般歯科 / 谷村レミー医師', expected: '谷村レミー医師 (一般歯科)' },
    { target: '一般・小児歯科 / ミュラー医師', expected: 'ミュラー医師 (一般・小児歯科)' },
    { target: '鍼灸 / イナズマ医師', expected: 'イナズマ医師 (鍼灸)' },
    { target: '歯科 / イアン・マトラス歯科医院', expected: 'イアン・マトラス歯科医院' },
    { target: '歯科 / 日本語歯科サポート', expected: '日本語歯科サポート' },
    { target: '救急 / キャンベラ病院', expected: 'キャンベラ病院' },
    { target: '救急 / ノースキャンベラ病院', expected: 'ノースキャンベラ病院' },
    { target: '救急 / オークランドシティ病院', expected: 'オークランドシティ病院' },
    { target: '救急 / ウェリントン病院', expected: 'ウェリントン病院' },
    { target: '救急 / クライストチャーチ病院', expected: 'クライストチャーチ病院' },
    { target: '日本人歯科衛生士あり / シティメディカルセンター', expected: 'シティメディカルセンター' }
];

clinicsData.forEach(clinic => {
    // 1. Name Replacements (H3 inversions)
    for (const rep of nameReplacements) {
        if (clinic.nameJa === rep.target || clinic.nameJa?.includes(rep.target)) {
            // Further refinement for the multi-match SOS Medika bug
            if (rep.addressMatch) {
                if (clinic.address?.includes(rep.addressMatch) || clinic.addressJa?.includes(rep.addressMatch) || clinic.nameEn?.includes(rep.addressMatch)) {
                    clinic.nameJa = rep.expected;
                    clinic.nameEn = rep.expected;
                }
            } else {
                clinic.nameJa = rep.expected;
                clinic.nameEn = rep.expected;
            }
        }
    }

    // Fix completely missing names
    if (!clinic.nameJa) {
        if (clinic.addressJa?.includes('Privatklinik')) { clinic.nameJa = 'Privatklinik Döbling'; clinic.nameEn = 'Privatklinik Döbling'; }
        if (clinic.addressJa?.includes('Ziekenhuis Amstelland') || clinic.city === 'アムステルフェーン') { clinic.nameJa = 'Ziekenhuis Amstelland Japan Desk'; clinic.nameEn = 'Ziekenhuis Amstelland Japan Desk'; }
        if (clinic.addressJa?.includes('Neugebauer') && clinic.addressJa?.includes('Oststr')) { clinic.nameJa = 'Neugebauer-Baba (Oststr.)'; clinic.nameEn = 'Neugebauer-Baba (Oststr.)'; }
        if (clinic.addressJa?.includes('Neugebauer') && clinic.addressJa?.includes('Prinzenpark')) { clinic.nameJa = 'Neugebauer-Baba (Prinzenpark)'; clinic.nameEn = 'Neugebauer-Baba (Prinzenpark)'; }
        if (clinic.addressJa?.includes('Japan Medical') || clinic.website?.includes('dock-nmc')) { clinic.nameJa = 'Japan Medical Center (NMC)'; clinic.nameEn = 'Japan Medical Center (NMC)'; }
        if (clinic.addressJa?.includes('Allgemeinpraxis')) { clinic.nameJa = 'HS Allgemeinpraxis'; clinic.nameEn = 'HS Allgemeinpraxis'; }
        if (clinic.addressJa?.includes('Niddatal')) { clinic.nameJa = 'Praxis am Niddatal'; clinic.nameEn = 'Praxis am Niddatal'; }
        if (clinic.addressJa?.includes('Dr. Ybs')) { clinic.nameJa = 'Praxis Dr. Ybs'; clinic.nameEn = 'Praxis Dr. Ybs'; }
        if (clinic.nameEn && !clinic.nameJa) { clinic.nameJa = clinic.nameEn; }
    }

    // 2. Phone Fixes (Critical Links)
    let phoneStr = clinic.phone || '';
    if (phoneStr.includes('XXXX') || phoneStr.includes('2524')) {
        clinic.phoneClean = '';
        clinic.phone = ''; // Remove from display completely
    }
    if (clinic.nameJa?.includes('Anglo American') && clinic.country === 'エジプト') {
        clinic.phoneClean = '+20227356162';
        clinic.phone = '+20-2-2735-6162';
    }
    if (clinic.nameJa?.includes('橋村医師')) {
        clinic.phoneClean = '+61391329644';
        clinic.phone = '03-9132-9644';
    }
    if (clinic.nameJa?.includes('TIS通訳')) {
        clinic.phoneClean = '131450';
        clinic.phone = '131 450';
    }
    if (clinic.nameJa?.includes('Clinique des Bains')) {
        clinic.phoneClean = '+33450201280';
        clinic.phone = '+33 4 50 20 12 80'; // Located in France, serving Geneva
    }

    // 3. Web URL fallbacks and extractions from notes
    if (!clinic.website && clinic.notes) {
        const urlMatch = clinic.notes.match(/[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}(\/[^\s、。]*)?/g);
        if (urlMatch) {
            let found = urlMatch[0];
            if (!found.includes('@') && found.includes('.')) {
                if (!found.startsWith('http')) found = 'https://' + found;
                clinic.website = found.replace(/%0A|\\n|\)$/g, '');
            }
        }
    }

    // Explicit manual links based on feedback
    if (clinic.nameJa?.includes('AC Clinic Barcelona')) clinic.website = 'https://ac-clinic.es';
    if (clinic.nameJa?.includes('JAMSNET')) clinic.website = 'https://jamsnet.eu';
    if (clinic.nameJa?.includes('Cleopatra')) clinic.website = 'https://www.cleopatrahospitals.com';
    if (clinic.nameJa?.includes('Tabibi')) clinic.website = 'https://tabibiclinic.com';
    if (clinic.nameJa?.includes('Nordic Medical')) clinic.website = 'https://nordicmedicalcentre.com';
    if (clinic.nameJa?.includes('IST Clinic')) clinic.website = 'https://istclinic.com';
    if (clinic.nameJa?.includes('Reddington')) clinic.website = 'https://reddingtonhospital.com';
    if (clinic.nameJa?.includes('Evercare')) clinic.website = 'https://www.evercare.ng';
    if (clinic.nameJa?.includes('Mediclinic')) clinic.website = 'https://www.mediclinic.co.za';
    if (clinic.nameJa?.includes('Centro Médico Liberdade')) clinic.website = 'https://www.enkyo.org.br';

    // Disable phone where explicitly missing
    if (clinic.nameJa?.includes('HealthPoint')) {
        clinic.phoneClean = '';
        clinic.phone = '';
        clinic.notes = (clinic.notes || '') + ' ※HealthPointはウェブ検索システムのため電話受付はありません。';
    }

    // 4. Badge fixes
    if (clinic.nameJa?.includes('IST Clinic')) {
        clinic.supportLevel = 'none';
        clinic.japaneseSupportDetails = '英語対応';
    }

    // 5. Google Maps URL line breaks
    if (clinic.googleMapsUrl) {
        clinic.googleMapsUrl = clinic.googleMapsUrl.replace(/%0A|\\n|\n/g, '');
    }
});

fs.writeFileSync(clinicsPath, JSON.stringify(clinicsData, null, 2), 'utf8');
console.log(`Successfully completed round 3 data cleanup on ${clinicsData.length} clinics.`);
