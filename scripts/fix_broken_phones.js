const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/clinics.json');
const clinics = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let fixCount = 0;

const fixed = clinics.map(c => {
    let changed = false;
    let phoneClean = c.phoneClean;

    // Fix id:17 Raffles Medical Hanoi — two numbers concatenated
    if (c.id === '17') {
        phoneClean = '+84243934066';
        changed = true;
    }

    // Fix id:81 Royal Phnom Penh Hospital — two numbers concatenated
    if (c.id === '81') {
        phoneClean = '+85523991000';
        changed = true;
    }

    // Fix id:82 Ken Clinic — two numbers concatenated  
    if (c.id === '82') {
        phoneClean = '+85523223843';
        changed = true;
    }

    // Fix id:87 Royal Angkor International Hospital — two numbers concatenated
    if (c.id === '87') {
        phoneClean = '+85563761888';
        changed = true;
    }

    // Fix id:95 Anglo-American Hospital Cairo — corrupted number
    // "(02)-2735-6162〜6135（代表）" → use first number: +20-2-2735-6162
    if (c.id === '95') {
        phoneClean = '+20227356162';
        changed = true;
    }

    if (changed) {
        fixCount++;
        console.log(`Fixed [${c.id}] ${c.nameJa}: "${c.phoneClean}" → "${phoneClean}"`);
        return { ...c, phoneClean };
    }
    return c;
});

fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2), 'utf8');
console.log(`\nDone. Fixed ${fixCount} phone numbers.`);
