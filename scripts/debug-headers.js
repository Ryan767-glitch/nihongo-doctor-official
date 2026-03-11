const path = require('path');
const XLSX = require(path.resolve(__dirname, '../node_modules/xlsx'));

const filePath = 'f:\\drive-download-20260219T055058Z-1-001\\アメリカ日本語対応医療機関一覧.xlsx';
console.log(`Reading ${filePath}...`);
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log('First 5 rows:');
rows.slice(0, 5).forEach((row, i) => {
    console.log(`Row ${i}:`, row);
});
