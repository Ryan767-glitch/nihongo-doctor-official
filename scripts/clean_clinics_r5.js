const fs = require('fs');
const path = require('path');

const clinicsPath = path.join(__dirname, '../src/data/clinics.json');
const clinicsData = JSON.parse(fs.readFileSync(clinicsPath, 'utf8'));

clinicsData.forEach(clinic => {
    const origNameJa = clinic.nameJa || '';

    // 1. Phone string and link cleanup
    if (origNameJa.includes('Al Shefaa') || origNameJa.includes('Al Salam') || origNameJa.includes('Forest Japan')) {
        clinic.phone = '';
        clinic.phoneClean = '';
    }
    if (origNameJa.includes('Anglo American') && clinic.country === 'エジプト') {
        clinic.phone = '+20-2-2735-6162';
        clinic.phoneClean = '+20227356162';
    }
    if (origNameJa.includes('橋村ひかる')) {
        clinic.phone = '03-9132-9644';
        clinic.phoneClean = '+61391329644';
    }
    if (origNameJa.includes('TIS通訳') || origNameJa.includes('日本語専用クリニック情報要確認')) {
        clinic.phone = '131 450';
        clinic.phoneClean = '131450';
    }
    if (origNameJa.includes('Clínica Anglo Americana') || origNameJa.includes('アングロ・アメリカーナ')) {
        clinic.phone = '(51-1) 616-8900';
        clinic.phoneClean = '+5116168900';
    }
    if (origNameJa.includes('港安醫院')) {
        clinic.phone = '+852-3651-8888';
        clinic.phoneClean = '+85236518888';
    }
    if (origNameJa.includes('Queen Mary Hospital')) {
        clinic.phone = '+852-2855-3838';
        clinic.phoneClean = '+85228553838';
    }
    if (origNameJa.includes('Mahosot Hospital') || origNameJa.includes('International Clinic（外国人')) {
        clinic.phone = '+856-21-214-018';
        clinic.phoneClean = '+85621214018';
    }
    if (origNameJa.includes('グアム・リージョナル')) {
        clinic.phone = '+1-671-646-3220';
        clinic.phoneClean = '+16716463220';
    }
    if (origNameJa.includes('コモンウェルス・ヘルス')) {
        clinic.phone = '+1-670-234-8950';
        clinic.phoneClean = '+16702348950';
    }
    if (origNameJa.includes('日本ベイクリニック')) {
        clinic.phone = '+1-650-558-0337';
        clinic.phoneClean = '+16505580337';
        if (clinic.website === 'http://www.nihon-bayclinic.com/') clinic.website = 'https://www.nihon-bayclinic.com/';
    }
    if (origNameJa.includes('柴田路子')) {
        clinic.phone = '+1-415-221-6476';
        clinic.phoneClean = '+14152216476';
    }
    if (origNameJa.includes('UCSF精神科')) {
        clinic.phone = '+1-415-476-7732';
        clinic.phoneClean = '+14154767732';
    }
    if (origNameJa.includes('UCSFヘルス')) {
        clinic.phone = '+1-415-353-6000';
        clinic.phoneClean = '+14153536000';
    }
    if (origNameJa.includes('日本クリニック・シカゴ')) {
        clinic.phone = '+1-847-952-8910';
        clinic.phoneClean = '+18479528910';
    }

    // 2. HTTP/Punycode Link Fixes
    if (origNameJa.includes('こばやしクリニック')) {
        if (clinic.website === 'http://www.kobayashi-naika.com/') clinic.website = 'https://www.kobayashi-naika.com/';
    }
    if (origNameJa.includes('World City Medical')) {
        if (clinic.website === 'http://www.worldcitimedical.com.au/jp/') clinic.website = 'https://www.worldcitimedical.com.au/jp/';
    }
    if (origNameJa.includes('Northbridge MP')) {
        if (clinic.website && clinic.website.startsWith('http://')) clinic.website = clinic.website.replace('http://', 'https://');
    }
    if (origNameJa.includes('ジャパニーズ・ソーシャル・サービス')) {
        clinic.website = 'https://jss.ca'; // Handled punycode replacement
    }

    // 3. Name cleanup (H3 inversions / Categories mixed in)
    const exactNameMatches = {
        '（日本語専用クリニック情報要確認）': 'TIS National',
        '鈴木りさこ医師（小児科）': '鈴木りさこ医師',
        'ジュネーブ大学病院（州立）': 'ジュネーブ大学病院',
        '太田博昭医師（精神科）': '太田博昭医師',
        '三村悌二医師（精神科）': '三村悌二医師',
        '近藤毅医師（循環器内科）': '近藤毅医師',
        'ミュラー医師（一般・小児歯科）': 'ミュラー医師',
        'イナズマ医師（鍼灸）': 'イナズマ医師',
        'キャンベラ病院（救急）': 'キャンベラ病院',
        'ノースキャンベラ病院（救急）': 'ノースキャンベラ病院',
        'イアン・マトラス歯科医院（歯科）': 'イアン・マトラス歯科医院',
        '日本語歯科サポート（歯科）': '日本語歯科サポート',
        'オークランドシティ病院（救急）': 'オークランドシティ病院',
        'シティメディカルセンター（日本人歯科衛生士あり）': 'シティメディカルセンター',
        'ヒュエン・メディシン（小児科）': 'ヒュエン・メディシン',
        'ヤマシロクリニック（小児科）': 'ヤマシロクリニック',
        'UCSFヘルス（日本語看護師対応）': 'UCSF Health',
        'UCSF精神科（廣田智也医師）': 'UCSF精神科',
        'DYM香港クリニック（太古院）': 'DYM香港クリニック',
        'Queen Mary Hospital（私立病棟）': 'Queen Mary Hospital'
    };

    if (exactNameMatches[origNameJa]) {
        clinic.nameJa = exactNameMatches[origNameJa];
        clinic.nameEn = exactNameMatches[origNameJa];
    }

    // 4. Name missing / H3 blank fixes
    // These names were completely blank in the import because they only existed in English or were skipped.
    if (!clinic.nameJa) {
        let textMatch = clinic.address + ' ' + clinic.notes + ' ' + clinic.city;
        if (textMatch.includes('TransMed')) { clinic.nameJa = 'TransMed'; clinic.nameEn = 'TransMed'; }
        else if (textMatch.includes('CarePoint')) { clinic.nameJa = 'CarePoint'; clinic.nameEn = 'CarePoint'; }
        else if (textMatch.includes('武内歯科')) { clinic.nameJa = '武内歯科'; clinic.nameEn = '武内歯科'; }
        else if (textMatch.includes('JSS')) { clinic.nameJa = 'JSS Toronto'; clinic.nameEn = 'JSS Toronto'; }
        else if (textMatch.includes('こばやしクリニック')) { clinic.nameJa = 'こばやしクリニック'; clinic.nameEn = 'Kobayashi Clinic'; }
        else if (textMatch.includes('Privatklinik Döbling')) { clinic.nameJa = 'Privatklinik Döbling'; clinic.nameEn = 'Privatklinik Döbling'; }
        else if (textMatch.includes('Ziekenhuis') && clinic.city === 'アムステルフェーン') { clinic.nameJa = 'Ziekenhuis Amstelland Japan Desk'; clinic.nameEn = 'Ziekenhuis Amstelland Japan Desk'; }
        else if (textMatch.includes('岡本') && clinic.city === 'ウィーン') { clinic.nameJa = '岡本医師（皮膚科）'; clinic.nameEn = 'Okamoto Dermatology'; }
    }
});

fs.writeFileSync(clinicsPath, JSON.stringify(clinicsData, null, 2), 'utf8');
console.log(`Successfully completed round 5 precision data cleanup on ${clinicsData.length} clinics.`);
