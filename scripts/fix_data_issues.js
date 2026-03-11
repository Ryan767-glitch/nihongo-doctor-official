const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/clinics.json');
const clinics = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let fixCount = 0;

const fixed = clinics.map(c => {
    let changed = false;

    // B. 日本語対応バッジの誤り
    // エバーケア病院（ナイジェリア）: 「日本語診察」→「日本語サポート」
    if (c.nameJa && c.nameJa.includes('エバーケア病院')) {
        if (c.supportLevel !== 'support') {
            c.supportLevel = 'support';
            changed = true;
        }
    }

    // Queen Mary Hospital（香港）: 日本語不可なので削除または「none」へ
    if (c.nameEn && c.nameEn.includes('Queen Mary Hospital')) {
        if (c.supportLevel !== 'none') {
            c.supportLevel = 'none';
            changed = true;
        }
    }

    // タビビ・クリニック（カイロ）: 救急バッジを外す
    if (c.nameJa && c.nameJa.includes('タビビ・クリニック')) {
        if (c.emergencyAvailable) {
            c.emergencyAvailable = false;
            changed = true;
        }
        if (c.hoursDescription && c.hoursDescription.includes('24時間')) {
            c.hoursDescription = c.hoursDescription.replace('24時間', '24時間訪問診療');
            changed = true;
        }
    }

    // C. 施設名・住所の誤り
    // ウェリントン病院（NZ）
    if (c.nameJa === 'ウェリントン病院') {
        c.nameEn = 'Wellington Regional Hospital';
        if (!c.address || c.address.length < 5) {
            c.address = '49 Riddiford Street, Newtown, Wellington 6021';
        }
        changed = true;
    }

    // ノースキャンベラ病院（ACT）
    if (c.nameJa && c.nameJa.includes('ノースキャンベラ病院')) {
        if (!c.notes || !c.notes.includes('旧名')) {
            c.notes = (c.notes ? c.notes + ' / ' : '') + '旧名：Calvary Public Hospital Bruce（2023年7月改名）';
            changed = true;
        }
    }

    // キャンベラ病院（ACT）
    if (c.nameJa === 'キャンベラ病院' || c.nameJa === 'Canberra Hospital（キャンベラ病院）') {
        if (!c.nameEn || c.nameEn === 'キャンベラ病院') {
            c.nameEn = 'Canberra Hospital';
            changed = true;
        }
    }

    // D. シェルドン・チュミア・ヘルス・センター（カルガリー）のバッジ矛盾
    if (c.nameJa && c.nameJa.includes('シェルドン・チュミア')) {
        if (c.emergencyAvailable) {
            c.emergencyAvailable = false;
            c.hoursDescription = '24時間Urgent Care（非救命・入院不可）';
            changed = true;
        }
    }

    // E. 「日本語サポート」表記が過大な施設 -> supportLevel: 'none', notes追加
    const overclaimedSupportNames = [
        'オタワ病院', 'マウントサイナイ病院', 'マギル大学医療センター', 'VGH バンクーバー総合病院',
        'Hospital Alemán', 'Hospital Italiano'
    ];
    if (c.nameJa && overclaimedSupportNames.some(name => c.nameJa.includes(name))) {
        if (c.supportLevel === 'support') {
            c.supportLevel = 'none';
            if (!c.notes || !c.notes.includes('電話通訳')) {
                c.notes = (c.notes ? c.notes + ' / ' : '') + '電話通訳・事前手配推奨';
            }
            changed = true;
        }
    }

    // F. MJAクリニック（フィリピン）
    if (c.nameJa && c.nameJa.includes('MJAクリニック')) {
        if (c.hoursDescription && c.hoursDescription.includes('金・土')) {
            c.hoursDescription = c.hoursDescription.replace('金・土', '水・金');
            changed = true;
        }
    }

    if (changed) {
        fixCount++;
        console.log(`Fixed data for [${c.id}] ${c.nameJa}`);
    }
    return c;
});

// 2. 医療機関でないものの混在 を除外する（別ファイルにするか削除）
const nonMedicalNames = [
    'TIS National', '在ベルギー日本大使館', 'JSS', 'TransMed'
];

const finalClinics = fixed.filter(c => {
    const isNonMedical = nonMedicalNames.some(name => (c.nameJa && c.nameJa.includes(name)) || (c.nameEn && c.nameEn.includes(name)));
    if (isNonMedical) {
        console.log(`Removed non-medical facility: [${c.id}] ${c.nameJa}`);
        fixCount++;
        return false;
    }
    return true;
});

fs.writeFileSync(filePath, JSON.stringify(finalClinics, null, 2), 'utf8');
console.log(`\nDone. Fixed/Removed ${fixCount} entries.`);
