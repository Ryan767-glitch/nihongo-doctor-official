const fs = require('fs');
const path = require('path');

const clinics = require('../src/data/clinics.json');

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'clinic-contact-sync.json');
const REPORT_PATH = path.join(__dirname, '..', 'analysis_output', 'clinic-contact-review.json');

const MANUAL_SYNC = {
    '1': { phone: '02-310-3000', phoneClean: '+6623103000' },
    '5': { website: 'https://blez-clinic.com/en/' },
    '6': { website: 'https://dymclinic.com/en/' },
    '7': { website: 'https://cotovia.co.th/' },
    '8': { website: 'https://www.sakuracross.jp/' },
    '9': { website: 'https://praram9.com/en' },
    '10': { website: 'https://www.bangkokhospital.com/' },
    '11': { website: 'https://www.kasemrad.co.th/en' },
    '12': { website: 'https://www.chiangmai-hospital.com/en/home' },
    '13': { website: 'https://www.bangkokhospital.com/' },
    '14': { website: 'https://www.bangkokhospital.com/' },
    '15': { website: 'http://www.tokyo-clinic.tokyo/ja/' },
    '16': { website: 'https://www.hfh.com.vn/' },
    '17': { website: 'https://rafflesmedical.vn/' },
    '18': { website: 'https://www.vietnammedicalpractice.com/' },
    '19': { website: 'https://sakurahanoi.com/' },
    '20': { website: 'https://t-matsuoka.com/en/' },
    '21': { website: 'https://jieh.vn/ja' },
    '22': { website: 'https://jp-dymmedicalcenter.com.vn/' },
    '23': { website: 'https://lotus-clinic.com/sp/en/' },
    '24': { website: 'https://www.vinmec.com/eng/' },
    '25': { website: 'https://jp-dymmedicalcenter.com.vn/' },
    '26': { website: 'https://lotus-clinic.com/' },
    '27': { website: 'https://www.vietnammedicalpractice.com/' },
    '28': { website: 'https://rafflesmedical.vn/' },
    '29': { website: 'https://www.fvhospital.com/' },
    '30': { website: 'https://www.vinmec.com/eng/' },
    '31': { website: 'https://my.hibariclinic.com/en/locations/klcc/', phone: '03-2022 4919', phoneClean: '+60320224919' },
    '33': { website: 'https://aoi.clinic/%E3%83%9E%E3%83%AC%E3%83%BC%E3%82%B7%E3%82%A2%E3%83%BB%E3%83%9A%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%A4%E3%81%AE%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%AF%BE%E5%BF%9C%E7%B7%8F%E5%90%88%E8%A8%BA/', phone: '012-392-6961', phoneClean: '+60123926961' },
    '35': { website: 'https://gleneagles.com.my/' },
    '36': { website: 'https://princecourt.com/' },
    '37': { website: 'https://www.sunwaymedical.com/' },
    '38': { website: 'https://parkcitymedicalcentre.com/' },
    '39': { website: 'https://gleneagles.com.my/penang' },
    '40': { website: 'https://islandhospital.com/' },
    '41': { website: 'https://www.lohguanlye.com/' },
    '42': { website: 'https://pah.com.my/' },
    '43': { website: 'https://my.hibariclinic.com/en/locations/penang/' },
    '46': { website: 'https://www.kyoaims.com/jp/index.php' },
    '48': { website: 'https://kizuna-clinic.com/en/' },
    '49': { website: 'https://dymclinic.com/en/' },
    '50': { website: 'https://j-clinic.co.id/' },
    '53': { website: 'https://www.siloamhospitals.com/en/' },
    '54': { website: 'https://www.rspondokindah.co.id/en' },
    '55': { website: 'https://medistra.com/' },
    '58': { website: 'https://bimcbali.com/' },
    '60': { website: 'https://bimcbali.com/' },
    '63': { website: 'https://www.makatimed.net.ph/' },
    '64': { website: 'https://www.stlukes.com.ph/' },
    '65': { website: 'https://www.stlukes.com.ph/' },
    '66': { website: 'https://www.asianhospital.com/' },
    '68': { website: 'http://www.navalesdental.com/', phone: '02-817-4824', phoneClean: '+6328174824' },
    '69': { website: 'https://www.rafflesmedical.cn/' },
    '70': { website: 'https://www.unitedfamilyhospitals.com/' },
    '77': { website: 'https://www.hkah.org.hk/' },
    '78': { website: 'https://dymhongkong.com/', phone: '2651-2121（日本語）', phoneClean: '+85226512121' },
    '80': { website: 'https://sunrise-hs.com/' },
    '81': { website: 'https://royalphnompenhhospital.com/' },
    '83': { website: 'https://rafflesmedical.com.kh/en/', phone: '023-216-911', phoneClean: '+85523216911' },
    '87': { website: 'https://www.royalangkorhospital.com/' },
    '92': { website: 'https://www.asiaroyalhospital.com/' },
    '93': { website: 'https://punhlainghospitals.com/' },
    '94': { website: 'https://one-health.com/medical_centers/degla-medical-center-maadi/', phone: '15292', phoneClean: '+2015292' },
    '96': { website: 'https://www.cleopatrahospitals.com/' },
    '99': { website: 'http://grandforest.jp/dx/contact/', phone: '0722 579563', phoneClean: '+254722579563' },
    '100': { website: 'https://hospitals.aku.edu/nairobi/Pages/default.aspx' },
    '101': { website: 'https://thenairobihosp.org/' },
    '102': { website: 'https://www.gerties.org/' },
    '104': { website: 'https://mpshahhosp.org/' },
    '111': { website: 'https://reddingtonhospital.com/' },
    '112': { website: 'https://evercare.ng/' },
    '122': { website: 'http://nipponmedical.com/', phone: '(310) 575-4050', phoneClean: '+13105754050' },
    '130': { website: 'https://www.ucsfhealth.org/' },
    '132': { website: 'https://www.ucsfhealth.org/locations/parnassus' },
    '141': { website: 'https://www.manta.com/c/mmb6p6y/keio-northwestern-clinic', phone: '847-240-5346', phoneClean: '+18472405346' },
    '142': { phone: '201-809-3508', phoneClean: '+12018093508' },
    '143': { website: 'https://www.st-lukesclinic.com/', phone: '(808)945-3719', phoneClean: '+18089453719' },
    '144': { website: 'https://www.st-lukeswaikiki.com/', phone: '808-773-7097', phoneClean: '+18087737097' },
    '145': { website: 'https://www.hawaiipacifichealth.org/docsoncall/', phone: '808-971-6000', phoneClean: '+18089716000' },
    '147': { website: 'https://www.nicklauschildrens.org/' },
    '148': { website: 'https://www.grmc.gu/' },
    '149': { website: 'https://chcc.gov.mp/' },
    '152': { website: 'https://www.vgh.ca/' },
    '153': { website: 'https://www.providencehealthcare.org/en/locations/st-pauls-hospital' },
    '158': { website: 'https://www.sinaihealth.ca/our-hospitals/mount-sinai-hospital' },
    '160': { website: 'https://doctoryamashiro.ca/' },
    '161': { website: 'https://www.ottawahospital.on.ca/en/' },
    '163': { website: 'https://www.jgh.ca/' },
    '164': { website: 'https://muhc.ca/' },
    '178': { website: 'https://association-dai.fr/board_members?locale=ja', phone: '01 45 33 27 83', phoneClean: '+33145332783' },
    '181': { website: 'https://www.doctolib.fr/medecin-generaliste/paris/teiji-mimura' },
    '182': { website: 'https://www.doctolib.fr/pediatre/paris/akira-kanehisa' },
    '183': { website: 'https://www.doctolib.fr/chirurgien-dentiste/paris/remy-tanimura' },
    '184': { website: 'https://www.doctolib.fr/medecin-generaliste/paris/dr-muller-paris-16' },
    '185': { website: 'https://www.doctolib.fr/medecin-generaliste/le-vesinet/monica-miradolo-lopez-costa' },
    '186': { website: 'https://www.doctolib.fr/medecin-generaliste/paris/jean-marc-inazuma' },
    '187': { website: 'https://praxisuchida.com/' },
    '188': { website: 'http://www.dr-shinoda.eu/' },
    '191': { website: 'https://www.sanfujinka-nakagawa.net/' },
    '192': { website: 'https://www.dock-nmc.de/', phone: '0211-159 839 22', phoneClean: '+4921115983922' },
    '195': { website: 'https://www.arzt-frankfurt.de/ja/dr-%E3%82%A8%E3%83%83%E3%82%AF%E3%83%8F%E3%83%BC%E3%83%88%EF%BC%86-dr-%E3%83%8A%E3%82%A4%E3%83%9E%E3%83%B3%E7%B7%8F%E5%90%88%E3%83%9B%E3%83%BC%E3%83%A0%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF/', phone: '0177 7611 122', phoneClean: '+491777611122' },
    '198': { website: 'https://www.mejiro-sola.com/eng/info.html', phone: '03-5906-5092', phoneClean: '+81359065092' },
    '199': { website: 'https://hno-mitte-steglitz.de/', phone: '030 - 200 748 76', phoneClean: '+493020074876' },
    '200': { website: 'https://hno-mitte-steglitz.de/', phone: '030 - 791 12 98', phoneClean: '+49307911298' },
    '201': { website: 'https://japanclinic.nl/', phone: '06-3747-2097', phoneClean: '+31637472097' },
    '202': { website: 'https://www.ziekenhuisamstelland.nl/' },
    '203': { website: 'https://www.kenkoshindan.eu/', phone: '03-3585-0282', phoneClean: '+81335850282' },
    '204': { website: 'https://www.pediatrie-geneve.ch/' },
    '205': { website: 'https://www.doctolib.fr/chirurgien-dentiste/divonne-les-bains/philippe-nakamura' },
    '206': { website: 'https://www.doctolib.fr/medecin-generaliste/geneve/keiko-miyake' },
    '208': { website: 'https://www.hug.ch/en' },
    '209': { website: 'https://saludfamiliarasuka.my.canva.site/', phone: '+34 653 788 200', phoneClean: '+34653788200' },
    '210': { website: 'https://www.yukikoshimoyama.com/', phone: '600 702 828', phoneClean: '+34600702828' },
    '211': { website: 'https://www.doctolib.it/medico-di-base/roma/yoshihiko-nakata' },
    '213': { website: 'https://www.salvatormundi.it/' },
    '216': { website: 'https://www.yamoto.at/' },
    '218': { website: 'https://www.be.emb-japan.go.jp/itpr_ja/medical_info_japanese.html' },
    '217': { website: 'https://www.saintluc.be/en' },
    '222': { website: 'https://www.einstein.br/en/' },
    '227': { website: 'https://mutualnikkai.wixsite.com/centromediconikkai', phone: '011 4308-5462', phoneClean: '+541143085462' },
    '226': { website: 'https://www.moinhos.com.br/' },
    '129': { phone: '650-962-4630', phoneClean: '+16509624630' },
    '146': { phone: '833-692-2784', phoneClean: '+18336922784' },
    '219': { phone: '11 3274-6555', phoneClean: '+551132746555' },
    '251': { phone: '07 3211 4520', phoneClean: '+61732114520' },
    '247': { website: 'http://dentistsbrighton.com.au/' },
    '248': { website: 'https://www.whereis.com/vic/south-yarra-3141/yellowId-1000002841502' },
    '249': { website: 'https://www.thedentalgroupdingley.com.au/contact-us-dingley' },
    '250': { website: 'https://www.everglow-dental.com.au/' },
    '252': { phone: '07 3438 9835', phoneClean: '+61734389835' },
    '254': { phone: '(07) 3399 5444', phoneClean: '+61733995444' },
    '255': { website: 'https://qfinder2.health.qld.gov.au/HealthServiceProvider/Index/38bbfcda-4cae-e811-8151-0050568c7dd2' },
    '256': { website: 'https://www.travellersmedicalservice.com/' },
    '258': { website: 'https://surfershealth.com.au/' },
    '260': { website: 'https://www.canberrahealthservices.act.gov.au/' },
    '262': { website: 'https://lumino.co.nz/dentists/auckland-central/contact/' },
    '265': { phone: '0508-083-199', phoneClean: '+64508083199' },
    '264': { website: 'https://www.healthnz.govt.nz/hospitals-services/hospitals/auckland/auckland-central/auckland-city-hospital' },
    '266': { website: 'https://www.healthpoint.co.nz/wellington-hospital-nga-puna-waiora/' },
    '267': { website: 'https://info.health.nz/hospitals-services/hospitals/canterbury/christchurch-hospital' },
};
const PHONE_ALLOWLIST = new Set(['129', '146', '154', '219', '251', '252', '253', '254']);

const BLOCKED_DOMAINS = [
    'facebook.com',
    'instagram.com',
    'x.com',
    'twitter.com',
    'linkedin.com',
    'note.com',
    'youtube.com',
    'myhospitalnow.com',
    'vietnam-sketch.com',
    'findglocal.com',
    'healthigo.com',
    'viethealthguide.com',
    'konkai.health',
    'wikipedia.org',
    'doctoralia.',
    'booking.',
    'tripadvisor.',
    'expedia.',
    'hotels.com',
    'google.com',
    'goo.gl',
    'maps.app.goo.gl',
];

const COUNTRY_PHONE_CODES = {
    'タイ': '+66',
    'ベトナム': '+84',
    'マレーシア': '+60',
    'インドネシア': '+62',
    'シンガポール': '+65',
    'フィリピン': '+63',
    'カンボジア': '+855',
    'ミャンマー': '+95',
    'ラオス': '+856',
    '中国': '+86',
    '中国（香港）': '+852',
    '香港': '+852',
    '台湾': '+886',
    '韓国': '+82',
    'オーストラリア': '+61',
    'ニュージーランド': '+64',
    'United States': '+1',
    'Canada': '+1',
    '英国': '+44',
    'イギリス': '+44',
    'フランス': '+33',
    'ドイツ': '+49',
    'イタリア': '+39',
    'オランダ': '+31',
    'ベルギー': '+32',
    'スイス': '+41',
    'スペイン': '+34',
    'オーストリア': '+43',
    'UAE': '+971',
    'エジプト': '+20',
    'ケニア': '+254',
    'タンザニア': '+255',
    'エチオピア': '+251',
    'ナイジェリア': '+234',
    '南アフリカ': '+27',
    'ブラジル': '+55',
    'アルゼンチン': '+54',
    'チリ': '+56',
    'ペルー': '+51',
    'コロンビア': '+57',
    'メキシコ': '+52',
};

function normalizeName(name) {
    return String(name || '')
        .replace(/[（(].*?[）)]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenizeName(clinic) {
    const baseNames = [clinic.nameEn, clinic.nameJa, normalizeName(clinic.nameEn), normalizeName(clinic.nameJa)]
        .filter(Boolean);

    return [...new Set(baseNames.flatMap((name) => name
        .split(/[\s/・,]+/)
        .map((token) => token.trim())
        .filter((token) => token.length >= 3 || /[\u3040-\u30ff\u4e00-\u9faf]/.test(token))))];
}

function decodeDuckDuckGo(url) {
    const match = url.match(/uddg=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : url;
}

function isBlockedUrl(url) {
    return BLOCKED_DOMAINS.some((domain) => url.includes(domain));
}

function stripHtml(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/\s+/g, ' ')
        .trim();
}

function cleanPhone(rawPhone, country) {
    if (!rawPhone) {
        return '';
    }

    const digits = String(rawPhone).match(/\d+/g);
    if (!digits) {
        return '';
    }

    let joined = digits.join('');
    const countryCode = COUNTRY_PHONE_CODES[country];
    if (countryCode) {
        const numericCode = countryCode.replace('+', '');
        if (joined.startsWith('0')) {
            joined = joined.slice(1);
        }
        if (joined.startsWith(numericCode)) {
            return `+${joined}`;
        }
        return `${countryCode}${joined}`;
    }

    return `+${joined}`;
}

function normalizePhoneDisplay(value) {
    return String(value || '')
        .replace(/\s+/g, ' ')
        .replace(/\s*\/\s*/g, ' / ')
        .trim();
}

function extractPhonesFromText(text) {
    const telMatches = [...text.matchAll(/tel:([+0-9().\-\s]{6,})/gi)].map((match) => match[1]);
    const textMatches = [...text.matchAll(/(?:\+\d[\d().\-\s]{6,}\d|\(?\d{2,4}\)?[\d().\-\s]{5,}\d)/g)].map((match) => match[0]);
    const phones = [...new Set([...telMatches, ...textMatches].map(normalizePhoneDisplay))]
        .filter((phone) => phone.replace(/[^0-9]/g, '').length >= 7)
        .filter((phone) => !/^\d{4}$/.test(phone.replace(/[^0-9]/g, '')));
    return phones;
}

function scoreCandidate(clinic, candidate, contentText = '') {
    const haystack = `${candidate.url} ${candidate.title} ${candidate.snippet} ${contentText}`.toLowerCase();
    const tokens = tokenizeName(clinic);
    let score = 0;

    for (const token of tokens) {
        if (haystack.includes(token.toLowerCase())) {
            score += token.length >= 6 ? 2 : 1;
        }
    }

    if (haystack.includes(String(clinic.city || '').toLowerCase())) {
        score += 1;
    }
    if (haystack.includes(String(clinic.country || '').toLowerCase())) {
        score += 1;
    }

    return score;
}

async function searchDuckDuckGo(query) {
    const response = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
        headers: { 'user-agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(15000),
    });
    const html = await response.text();
    return [...html.matchAll(/<a rel="nofollow" class="result__a" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
        .map((match) => ({
            url: decodeDuckDuckGo(match[1]),
            title: stripHtml(match[2]),
            snippet: '',
        }))
        .filter((result) => result.url.startsWith('http'))
        .filter((result) => !isBlockedUrl(result.url));
}

async function fetchPage(url) {
    const response = await fetch(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (compatible; NihongoDoctorDirectoryBot/1.0; +https://nihongo-doctor.com)',
            'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    return {
        finalUrl: response.url,
        html,
        text: stripHtml(html),
    };
}

function hasStrongNameMatch(clinic, candidate, contentText = '') {
    const haystack = `${candidate.url} ${candidate.title} ${candidate.snippet} ${contentText}`.toLowerCase();
    const normalizedNames = [normalizeName(clinic.nameEn), normalizeName(clinic.nameJa)].filter(Boolean);
    if (normalizedNames.some((name) => name && haystack.includes(name.toLowerCase()))) {
        return true;
    }

    const matchedTokens = tokenizeName(clinic).filter((token) => haystack.includes(token.toLowerCase()));
    return matchedTokens.length >= 2;
}

async function findWebsite(clinic) {
    const queries = [
        `${normalizeName(clinic.nameEn || clinic.nameJa)} ${clinic.city} ${clinic.country} official site`,
        `"${normalizeName(clinic.nameEn || clinic.nameJa)}" ${clinic.country}`,
        `${normalizeName(clinic.nameJa)} ${clinic.country}`,
    ];

    for (const query of queries) {
        let results;
        try {
            results = await searchDuckDuckGo(query);
        } catch {
            continue;
        }

        for (const candidate of results.slice(0, 5)) {
            let pageText = '';
            let finalUrl = candidate.url;
            try {
                const page = await fetchPage(candidate.url);
                pageText = page.text.slice(0, 8000);
                finalUrl = page.finalUrl;
            } catch {
                pageText = `${candidate.title} ${candidate.snippet}`;
            }

            const score = scoreCandidate(clinic, candidate, pageText);
            if (score >= 2 || hasStrongNameMatch(clinic, candidate, pageText)) {
                return {
                    website: finalUrl,
                    sourceUrl: finalUrl,
                    confidence: score >= 5 ? 'high' : 'medium',
                    pageText,
                };
            }
        }

        const fallback = results.find((candidate) => hasStrongNameMatch(clinic, candidate));
        if (fallback) {
            return {
                website: fallback.url,
                sourceUrl: fallback.url,
                confidence: 'low',
                pageText: `${fallback.title} ${fallback.snippet}`,
            };
        }
    }

    return null;
}

function pickPhone(clinic, html, text, existingPhone) {
    if (existingPhone) {
        return {
            phone: existingPhone,
            phoneClean: clinic.phoneClean || cleanPhone(existingPhone, clinic.country),
        };
    }

    const telPhones = extractPhonesFromText(html || '');
    const contextualText = [...String(text || '').matchAll(/(?:tel|phone|call|contact|hotline|whatsapp|電話)[^0-9+]{0,20}([+()0-9.\-\s]{7,})/gi)]
        .map((match) => match[1]);
    const phones = [...new Set([...telPhones, ...contextualText].map(normalizePhoneDisplay))]
        .filter((phone) => {
            const digits = phone.replace(/[^0-9]/g, '');
            if (digits.length < 8) {
                return false;
            }
            if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(phone)) {
                return false;
            }
            if (/^\(?20\d{2}\)?\s*-\s*20\d{2}$/.test(phone)) {
                return false;
            }
            return true;
        });
    const phone = phones[0];
    if (!phone) {
        return null;
    }

    return {
        phone,
        phoneClean: cleanPhone(phone, clinic.country),
    };
}

async function main() {
    const generatedAt = new Date().toISOString();
    const syncEntries = {};
    const reviewEntries = [];

    for (const clinic of clinics) {
        const needsWebsite = !clinic.website || !String(clinic.website).trim();
        const needsPhone = !clinic.phone || !String(clinic.phone).trim();
        if (!needsWebsite && !needsPhone) {
            continue;
        }

        const manualEntry = MANUAL_SYNC[clinic.id];
        if (manualEntry) {
            syncEntries[clinic.id] = {
                ...manualEntry,
                sourceUrl: manualEntry.website || clinic.website || clinic.googleMapsUrl,
                verifiedAt: generatedAt.slice(0, 10),
                confidence: 'high',
            };
            continue;
        }

        let website = clinic.website || '';
        let phone = clinic.phone || '';
        let phoneClean = clinic.phoneClean || '';
        let confidence = null;
        let sourceUrl = '';
        let sourceText = '';

        if (website) {
            sourceUrl = website;
            try {
                const page = await fetchPage(website);
                sourceText = page.text;
                const phoneData = pickPhone(clinic, page.html, sourceText, phone);
                if (phoneData) {
                    phone = phoneData.phone;
                    phoneClean = phoneData.phoneClean;
                }
                confidence = 'high';
            } catch {
                confidence = 'low';
            }
        }

        if (needsWebsite || (needsPhone && !phone)) {
            const found = await findWebsite(clinic);
            if (found) {
                website = website || found.website;
                sourceUrl = found.sourceUrl;
                sourceText = found.pageText || sourceText;
                confidence = found.confidence;

                const phoneData = pickPhone(clinic, sourceText, sourceText, phone);
                if (phoneData) {
                    phone = phoneData.phone;
                    phoneClean = phoneData.phoneClean;
                }
            }
        }

        const safePhone = PHONE_ALLOWLIST.has(clinic.id) ? phone : '';
        const safePhoneClean = PHONE_ALLOWLIST.has(clinic.id) ? phoneClean : '';
        const hasUpdate = (website && website !== clinic.website) || (safePhone && safePhone !== clinic.phone);
        if (hasUpdate) {
            syncEntries[clinic.id] = {
                ...(website && website !== clinic.website ? { website } : {}),
                ...(safePhone && safePhone !== clinic.phone ? { phone: safePhone, phoneClean: safePhoneClean } : {}),
                sourceUrl: sourceUrl || website || clinic.website,
                verifiedAt: generatedAt.slice(0, 10),
                confidence: confidence || 'low',
            };
        } else {
            reviewEntries.push({
                id: clinic.id,
                nameJa: clinic.nameJa,
                country: clinic.country,
                city: clinic.city,
                missingWebsite: needsWebsite,
                missingPhone: needsPhone,
            });
        }
    }

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify({ generatedAt, clinics: syncEntries }, null, 2)}\n`);
    fs.writeFileSync(REPORT_PATH, `${JSON.stringify({
        generatedAt,
        updatedCount: Object.keys(syncEntries).length,
        reviewCount: reviewEntries.length,
        clinics: reviewEntries,
    }, null, 2)}\n`);

    console.log(`updated=${Object.keys(syncEntries).length} review=${reviewEntries.length}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
