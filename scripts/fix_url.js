const fs = require('fs');

const dataPath = 'src/data/clinics.json';
const clinicsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Fix ID 268: Missing https:// prefix
const target = clinicsData.find(c => c.id === '268');
if (target && target.website === 'www.americanwellnesscenter.ae') {
    target.website = 'https://www.americanwellnesscenter.ae';
    fs.writeFileSync(dataPath, JSON.stringify(clinicsData, null, 2), 'utf8');
    console.log('Fixed website URL for ID 268.');
} else {
    console.log('Target not found or already fixed.');
}
