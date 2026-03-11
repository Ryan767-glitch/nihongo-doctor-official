const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/clinics.json');
console.log(`Reading ${filePath}...`);
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Total items: ${data.length}`);
const target = data.find(c => JSON.stringify(c).includes('東京海上'));

if (target) {
    console.log('Found Target:', target);
} else {
    console.log('Target NOT found.');
}

const torrance = data.find(c => JSON.stringify(c).toLowerCase().includes('torrance'));
if (torrance && !osato) {
    console.log('Found Torrance entry:', torrance);
}
