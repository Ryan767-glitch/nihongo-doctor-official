import fs from 'fs';

let content = fs.readFileSync('src/app/phrases/data.ts', 'utf-8');
content = content.replace(/"pron": "(.*?)\s*\((.*?)\)"/g, '"pron": "$2"');
fs.writeFileSync('src/app/phrases/data.ts', content);

console.log("Pronunciations updated.");
