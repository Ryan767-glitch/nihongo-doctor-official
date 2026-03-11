const path = require('path');
const XLSX = require(path.resolve(__dirname, '../node_modules/xlsx'));

const filePath = 'f:\\drive-download-20260219T055058Z-1-001\\アメリカ日本語対応医療機関一覧.xlsx';
console.log(`Reading ${filePath}...`);
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log('Searching for "Osato"...');
let found = false;
rows.forEach((row, i) => {
    const str = JSON.stringify(row);
    if (str.toLowerCase().includes('osato')) {
        console.log(`Found at Row ${i}:`, row);
        found = true;
    }
});

if (!found) console.log('Not found.');
