const fs = require('fs');

const dataPath = 'src/data/clinics.json';
const clinics = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Starting audit of ${clinics.length} clinics...\n`);

let anomalies = {
    missingName: [],
    suspiciouslyLongName: [],
    invalidGoogleMapsUrl: [],
    invalidWebsiteUrl: [],
    suspiciousPhone: [],
    missingContinent: [],
    missingCountry: []
};

clinics.forEach(c => {
    // 1. Name Checks
    if (!c.nameJa || c.nameJa.trim() === '') {
        anomalies.missingName.push(c.id);
    } else if (c.nameJa.length > 40) {
        // More than 40 chars is very likely an imported description/sentence instead of a name
        anomalies.suspiciouslyLongName.push({ id: c.id, name: c.nameJa, country: c.country });
    }

    // 2. Geography Checks
    if (!c.continent) anomalies.missingContinent.push(c.id);
    if (!c.country) anomalies.missingCountry.push(c.id);

    // 3. URL Checks
    if (c.googleMapsUrl && c.googleMapsUrl.trim() !== '') {
        try {
            new URL(c.googleMapsUrl);
        } catch (e) {
            anomalies.invalidGoogleMapsUrl.push({ id: c.id, url: c.googleMapsUrl, name: c.nameJa });
        }
    }
    if (c.website && c.website.trim() !== '') {
        try {
            new URL(c.website);
        } catch (e) {
            anomalies.invalidWebsiteUrl.push({ id: c.id, url: c.website, name: c.nameJa });
        }
    }

    // 4. Phone Checks (If clean phone exists, does it look like E.164?)
    if (c.phoneClean && c.phoneClean.trim() !== '') {
        if (!/^\+?[0-9\s\-()]+$/.test(c.phoneClean)) {
            anomalies.suspiciousPhone.push({ id: c.id, phone: c.phoneClean, name: c.nameJa });
        }
    }
});

// Output Summary
console.log("=== AUDIT RESULTS ===");
for (const [key, issues] of Object.entries(anomalies)) {
    if (issues.length > 0) {
        console.log(`\n🚨 ${key} (${issues.length} found):`);
        issues.slice(0, 5).forEach(i => console.log('  ', i));
        if (issues.length > 5) console.log(`   ...and ${issues.length - 5} more.`);
    } else {
        console.log(`✅ ${key}: OK (0 issues)`);
    }
}
