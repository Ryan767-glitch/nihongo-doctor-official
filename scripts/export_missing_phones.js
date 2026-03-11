const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/clinics.json');
const clinics = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const missingPhones = clinics.filter(c => !c.phone || c.phone.trim() === '');

let csvContent = 'id,nameJa,nameEn,country,city,specialties\n';
missingPhones.forEach(c => {
    const specs = c.specialties ? c.specialties.join('/') : '';
    csvContent += `${c.id},"${c.nameJa}","${c.nameEn}","${c.country}","${c.city}","${specs}"\n`;
});

const outPath = path.join(__dirname, '../missing_phones.csv');
fs.writeFileSync(outPath, csvContent, 'utf8');

console.log(`Exported ${missingPhones.length} clinics missing phone numbers to missing_phones.csv`);
