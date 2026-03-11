const fs = require('fs');
const clinicsData = JSON.parse(fs.readFileSync('src/data/clinics.json', 'utf8'));

console.log("Total clinics:", clinicsData.length);

const invalidClinics = clinicsData.filter(c => {
    const invalidNames = ['英語・アラビア語', '英語', 'アラビア語'];
    const isDescriptive = c.nameJa.includes('。') || c.nameJa.includes('病院だが') || c.nameJa.length > 25;
    return invalidNames.includes(c.nameJa) || isDescriptive;
});

console.log(`Found ${invalidClinics.length} invalid entries:`);
invalidClinics.forEach(c => {
    console.log(`ID: ${c.id} | Name: ${c.nameJa.substring(0, 30)}... | Country: ${c.country.substring(0, 20)}`);
});
