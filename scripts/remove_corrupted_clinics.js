const fs = require('fs');

const dataPath = 'src/data/clinics.json';
const clinicsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const initialCount = clinicsData.length;

// Filter out the corrupted entries which have IDs from 269 to 294
const cleanData = clinicsData.filter(c => {
    const idNum = parseInt(c.id, 10);
    return !(idNum >= 269 && idNum <= 294);
});

const finalCount = cleanData.length;
console.log(`Original count: ${initialCount}`);
console.log(`Clean count: ${finalCount}`);
console.log(`Removed ${initialCount - finalCount} corrupted entries.`);

fs.writeFileSync(dataPath, JSON.stringify(cleanData, null, 2), 'utf8');
console.log('Saved clean data to clinics.json');
