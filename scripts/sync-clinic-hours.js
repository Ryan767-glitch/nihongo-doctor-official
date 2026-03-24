const fs = require('fs');
const path = require('path');

const clinics = require('../src/data/clinics.json');
const clinicTimezones = require('../src/data/clinic-timezones.json');

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'clinic-hours-sync.json');
const REVIEW_PATH = path.join(__dirname, '..', 'analysis_output', 'clinic-hours-review.json');

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_TOKENS = [
    ['mon', /(月(?:曜(?:日)?)?|monday|mon\b)/i],
    ['tue', /(火(?:曜(?:日)?)?|tuesday|tue(?:s)?\b)/i],
    ['wed', /(水(?:曜(?:日)?)?|wednesday|wed\b)/i],
    ['thu', /(木(?:曜(?:日)?)?|thursday|thu(?:rs)?\b)/i],
    ['fri', /(金(?:曜(?:日)?)?|friday|fri\b)/i],
    ['sat', /(土(?:曜(?:日)?)?|saturday|sat\b)/i],
    ['sun', /(日(?:曜(?:日)?)?|sunday|sun\b)/i],
];
const DAY_TOKEN_RE = /(月(?:曜(?:日)?)?|火(?:曜(?:日)?)?|水(?:曜(?:日)?)?|木(?:曜(?:日)?)?|金(?:曜(?:日)?)?|土(?:曜(?:日)?)?|日(?:曜(?:日)?)?|monday|mon\b|tuesday|tue(?:s)?\b|wednesday|wed\b|thursday|thu(?:rs)?\b|friday|fri\b|saturday|sat\b|sunday|sun\b)/gi;

function emptyHours() {
    return { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
}

function decodeHtml(text) {
    return text
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');
}

function stripTags(html) {
    return decodeHtml(
        html
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            .replace(/<\/div>/gi, '\n')
            .replace(/<\/tr>/gi, '\n')
            .replace(/<\/h\d>/gi, '\n')
            .replace(/<[^>]+>/g, ' ')
    )
        .replace(/\r/g, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function normalizeTimeToken(token) {
    const cleaned = token
        .trim()
        .replace(/[–—−~〜～]/g, '-')
        .replace(/：/g, ':')
        .replace(/\./g, ':')
        .replace(/\s+/g, ' ');
    const match = cleaned.match(/(\d{1,2})(?::(\d{2}))?\s*([AaPp][Mm])?/);
    if (!match) {
        return null;
    }

    let hour = Number(match[1]);
    const minute = Number(match[2] || '00');
    const meridiem = match[3]?.toLowerCase();
    if (meridiem === 'pm' && hour < 12) {
        hour += 12;
    }
    if (meridiem === 'am' && hour === 12) {
        hour = 0;
    }
    if (hour > 23 || minute > 59) {
        return null;
    }

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function extractTimeRanges(text) {
    const ranges = [];
    const regex = /(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm])?)\s*[-–—−~〜～]\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm])?)/g;
    for (const match of text.matchAll(regex)) {
        const start = normalizeTimeToken(match[1]);
        const end = normalizeTimeToken(match[2]);
        if (start && end) {
            ranges.push(start, end);
        }
    }
    return ranges;
}

function dayKeyFromText(text) {
    for (const [key, regex] of DAY_TOKENS) {
        if (regex.test(text)) {
            return key;
        }
    }
    return null;
}

function extractDays(text) {
    const matches = [...text.matchAll(DAY_TOKEN_RE)].map((match) => ({
        text: match[0],
        index: match.index ?? 0,
        key: dayKeyFromText(match[0]),
    })).filter((match) => match.key);

    if (matches.length === 0) {
        return [];
    }

    if (matches.length >= 2) {
        const between = text.slice(matches[0].index + matches[0].text.length, matches[1].index);
        if (/[~〜～\-]|to|through|until/i.test(between)) {
            const startIndex = DAY_ORDER.indexOf(matches[0].key);
            const endIndex = DAY_ORDER.indexOf(matches[1].key);
            if (startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex) {
                return DAY_ORDER.slice(startIndex, endIndex + 1);
            }
        }
    }

    return [...new Set(matches.map((match) => match.key))];
}

function setClosedDays(hours, days) {
    for (const day of days) {
        hours[day] = [];
    }
}

function setHoursForDays(hours, days, ranges) {
    if (ranges.length < 2) {
        return;
    }
    for (const day of days) {
        hours[day] = [...ranges];
    }
}

function countStructuredDays(hours) {
    return DAY_ORDER.filter((day) => hours[day].length >= 2).length;
}

function hasAnyStructuredHours(hours) {
    return countStructuredDays(hours) > 0;
}

function compressDays(days) {
    if (days.length === 0) {
        return '';
    }
    if (days.length === 1) {
        return days[0];
    }
    return `${days[0]}〜${days[days.length - 1]}`;
}

function formatOpeningHoursDescription(hours) {
    const dayLabels = {
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土',
        sun: '日',
    };

    if (DAY_ORDER.every((day) => hours[day].length === 2 && hours[day][0] === '00:00' && hours[day][1] === '23:59')) {
        return '24時間';
    }

    const groups = [];
    let currentDays = [];
    let currentRanges = '';

    for (const day of DAY_ORDER) {
        const ranges = hours[day].length ? hours[day].join('-').replace(/-(\d{2}:\d{2})-(?=\d{2}:\d{2})/g, '-$1 / ') : '休診';
        if (currentRanges === ranges) {
            currentDays.push(dayLabels[day]);
            continue;
        }
        if (currentDays.length > 0) {
            groups.push(`${compressDays(currentDays)} ${currentRanges}`);
        }
        currentDays = [dayLabels[day]];
        currentRanges = ranges;
    }

    if (currentDays.length > 0) {
        groups.push(`${compressDays(currentDays)} ${currentRanges}`);
    }

    return groups.join(' / ');
}

function parseScheduleLines(text) {
    const hours = emptyHours();
    const lines = stripTags(text)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    for (const line of lines) {
        if (/\d{1,2}月\d{1,2}日|\b\d{1,2}[\/.-]\d{1,2}\b/.test(line)) {
            continue;
        }

        const days = extractDays(line);
        if (days.length === 0) {
            continue;
        }

        if (/休診|closed/i.test(line)) {
            setClosedDays(hours, days);
            continue;
        }

        const ranges = extractTimeRanges(line);
        if (ranges.length >= 2) {
            setHoursForDays(hours, days, ranges);
        }
    }

    return hasAnyStructuredHours(hours) ? hours : null;
}

function extractJsonLdBlocks(html) {
    return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
}

function collectStructuredSpecs(node, collected = []) {
    if (Array.isArray(node)) {
        for (const value of node) {
            collectStructuredSpecs(value, collected);
        }
        return collected;
    }

    if (!node || typeof node !== 'object') {
        return collected;
    }

    if (node.openingHoursSpecification) {
        collected.push({ type: 'spec', value: node.openingHoursSpecification });
    }

    if (node.hoursAvailable) {
        collected.push({ type: 'spec', value: node.hoursAvailable });
    }

    if (node.openingHours) {
        collected.push({ type: 'string', value: node.openingHours });
    }

    for (const value of Object.values(node)) {
        collectStructuredSpecs(value, collected);
    }

    return collected;
}

function normalizeJsonLdValue(raw) {
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function parseJsonLdHours(html) {
    const hours = emptyHours();
    let method = null;

    for (const rawBlock of extractJsonLdBlocks(html)) {
        const parsedBlock = normalizeJsonLdValue(rawBlock.trim());
        if (!parsedBlock) {
            continue;
        }

        const structuredSpecs = collectStructuredSpecs(parsedBlock);
        for (const entry of structuredSpecs) {
            if (entry.type === 'spec') {
                const specs = Array.isArray(entry.value) ? entry.value : [entry.value];
                for (const spec of specs) {
                    const opens = normalizeTimeToken(spec.opens || spec.open);
                    const closes = normalizeTimeToken(spec.closes || spec.close);
                    if (!opens || !closes) {
                        continue;
                    }

                    const rawDays = Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek];
                    const days = rawDays
                        .map((day) => typeof day === 'string' ? day.split('/').pop() : '')
                        .map((day) => dayKeyFromText(day))
                        .filter(Boolean);

                    if (days.length === 0) {
                        continue;
                    }

                    setHoursForDays(hours, days, [opens, closes]);
                    method = 'jsonld';
                }
            }

            if (entry.type === 'string') {
                const values = Array.isArray(entry.value) ? entry.value : [entry.value];
                for (const value of values) {
                    const parsedHours = parseScheduleLines(String(value));
                    if (!parsedHours) {
                        continue;
                    }
                    for (const day of DAY_ORDER) {
                        if (parsedHours[day].length >= 2) {
                            hours[day] = parsedHours[day];
                        }
                    }
                    method = 'jsonld';
                }
            }
        }
    }

    if (!hasAnyStructuredHours(hours)) {
        return null;
    }

    return {
        openingHours: hours,
        method,
        confidence: 'high',
    };
}

function extractTableNearKeyword(html, keyword) {
    const index = html.toLowerCase().indexOf(keyword.toLowerCase());
    if (index === -1) {
        return null;
    }

    const searchWindow = html.slice(index, index + 2000);
    const tableMatch = searchWindow.match(/<table[\s\S]*?<\/table>/i);
    return tableMatch ? tableMatch[0] : null;
}

function parseTableHours(tableHtml) {
    if (!tableHtml) {
        return null;
    }

    const hours = emptyHours();
    const rows = [...tableHtml.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((match) => match[0]);
    for (const row of rows) {
        const cells = [...row.matchAll(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi)].map((match) => stripTags(match[1]));
        if (cells.length < 2) {
            continue;
        }

        const days = extractDays(cells[0]);
        if (days.length === 0) {
            continue;
        }

        if (/休診|closed/i.test(cells[1])) {
            setClosedDays(hours, days);
            continue;
        }

        const ranges = extractTimeRanges(cells.slice(1).join(' '));
        if (ranges.length >= 2) {
            setHoursForDays(hours, days, ranges);
        }
    }

    return hasAnyStructuredHours(hours) ? hours : null;
}

function parseHoursFromHtml(clinic, html) {
    const jsonLd = parseJsonLdHours(html);
    if (jsonLd && countStructuredDays(jsonLd.openingHours) >= 2) {
        return jsonLd;
    }

    const tableKeywords = ['診療時間', '営業時間', '外来診療時間', 'Office Hours', 'Clinic Hours', 'Opening Hours'];
    for (const keyword of tableKeywords) {
        const table = extractTableNearKeyword(html, keyword);
        const parsedTable = parseTableHours(table);
        if (parsedTable && countStructuredDays(parsedTable) >= 2) {
            return {
                openingHours: parsedTable,
                method: 'table',
                confidence: 'high',
            };
        }
    }

    const textKeywords = ['診療時間', '営業時間', '外来診療時間', 'Office Hours', 'Clinic Hours', 'Opening Hours', 'Business Hours'];
    for (const keyword of textKeywords) {
        const index = html.toLowerCase().indexOf(keyword.toLowerCase());
        if (index === -1) {
            continue;
        }

        const block = html.slice(index, index + 1400);
        const parsedText = parseScheduleLines(block);
        if (parsedText && countStructuredDays(parsedText) >= 2) {
            return {
                openingHours: parsedText,
                method: 'text',
                confidence: 'medium',
                rawSnippet: stripTags(block).slice(0, 300),
            };
        }
    }

    return null;
}

function getClinicTimeZone(clinic) {
    const cityOverride = clinicTimezones.cityOverrides[clinic.country]?.[clinic.city];
    if (cityOverride) {
        return cityOverride;
    }
    return clinicTimezones.defaultByCountry[clinic.country] || null;
}

async function fetchHtml(url) {
    const response = await fetch(url, {
        redirect: 'follow',
        headers: {
            'user-agent': 'Mozilla/5.0 (compatible; NihongoDoctorHoursBot/1.0; +https://nihongo-doctor.com)',
            'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
        },
        signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.text();
}

async function main() {
    const withWebsite = clinics.filter((clinic) => clinic.website);
    const syncEntries = {};
    const reviewEntries = [];
    const verifiedAt = new Date().toISOString().slice(0, 10);

    for (const clinic of withWebsite) {
        try {
            const html = await fetchHtml(clinic.website);
            const parsed = parseHoursFromHtml(clinic, html);

            if (!parsed) {
                syncEntries[clinic.id] = {
                    hoursDescription: clinic.hoursDescription || '要確認',
                    status: 'needs_review',
                    sourceType: 'official_website',
                    sourceUrl: clinic.website,
                    verifiedAt,
                    confidence: 'low',
                    timeZone: getClinicTimeZone(clinic) || undefined,
                };
                reviewEntries.push({
                    id: clinic.id,
                    nameJa: clinic.nameJa,
                    website: clinic.website,
                    currentHours: clinic.hoursDescription || '',
                    reason: '営業時間を自動抽出できませんでした',
                });
                continue;
            }

            syncEntries[clinic.id] = {
                openingHours: parsed.openingHours,
                hoursDescription: formatOpeningHoursDescription(parsed.openingHours),
                status: 'verified',
                sourceType: 'official_website',
                sourceUrl: clinic.website,
                verifiedAt,
                confidence: parsed.confidence,
                timeZone: getClinicTimeZone(clinic) || undefined,
                rawSnippet: parsed.rawSnippet,
            };
        } catch (error) {
            syncEntries[clinic.id] = {
                hoursDescription: clinic.hoursDescription || '要確認',
                status: 'needs_review',
                sourceType: 'official_website',
                sourceUrl: clinic.website,
                verifiedAt,
                confidence: 'low',
                timeZone: getClinicTimeZone(clinic) || undefined,
            };
            reviewEntries.push({
                id: clinic.id,
                nameJa: clinic.nameJa,
                website: clinic.website,
                currentHours: clinic.hoursDescription || '',
                reason: error.message,
            });
        }
    }

    const output = {
        generatedAt: new Date().toISOString(),
        clinics: syncEntries,
    };
    const verifiedCount = Object.values(syncEntries).filter((entry) => entry.status === 'verified').length;
    const reviewCount = Object.values(syncEntries).filter((entry) => entry.status === 'needs_review').length;

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.mkdirSync(path.dirname(REVIEW_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`);
    fs.writeFileSync(
        REVIEW_PATH,
        `${JSON.stringify({
            generatedAt: output.generatedAt,
            reviewedWebsites: withWebsite.length,
            verifiedCount,
            reviewCount,
            clinics: reviewEntries,
        }, null, 2)}\n`
    );

    console.log(`verified=${verifiedCount} review=${reviewCount}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
