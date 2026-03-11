const XLSX = require('xlsx');

const file = 'f:\\drive-download-20260219T055058Z-1-001\\アメリカ日本語対応医療機関一覧.xlsx';
const workbook = XLSX.readFile(file);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Get range
const range = XLSX.utils.decode_range(sheet['!ref']);

// Inspect rows 0 to 10
for (let R = 0; R <= 10; R++) {
    const row = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        const cell = sheet[cell_ref];
        row.push(cell ? cell.v : undefined);
    }
    console.log(`Row ${R}:`, row);
}
