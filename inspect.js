const fs = require('fs');
const d = JSON.parse(fs.readFileSync('src/data/clinics.json', 'utf8'));

const countries = ['イタリア', 'フランス', '英国', 'オランダ', 'スイス', 'ブラジル', 'ペルー', '南アフリカ', 'ドイツ'];
countries.forEach(c => {
    const cls = d.filter(x => x.country === c);
    const cities = [...new Set(cls.map(x => x.city || '(no city)'))];
    console.log(`${c}: ${cls.length} clinics, cities: ${JSON.stringify(cities.slice(0, 6))}`);
});

// Also check Evecare, Tavita, Queen Mary for badge data
const evecareClinic = d.find(x => x.nameJa && x.nameJa.includes('エバーケア'));
const tavibi = d.find(x => x.nameJa && x.nameJa.includes('タビビ'));
const queenMary = d.find(x => x.nameJa && x.nameJa.includes('クイーンメアリー') || x.nameEn && x.nameEn.includes('Queen Mary'));

console.log('\n--- Badge check ---');
if (evecareClinic) console.log('Evecare:', JSON.stringify({ id: evecareClinic.id, supportLevel: evecareClinic.supportLevel, emergencyAvailable: evecareClinic.emergencyAvailable }));
if (tavibi) console.log('Tavita:', JSON.stringify({ id: tavibi.id, emergencyAvailable: tavibi.emergencyAvailable, hoursDescription: tavibi.hoursDescription?.substring(0, 40) }));
if (queenMary) console.log('QueenMary:', JSON.stringify({ id: queenMary.id, supportLevel: queenMary.supportLevel, notes: queenMary.notes?.substring(0, 60) }));
