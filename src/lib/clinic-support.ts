import { Clinic } from '@/types';

const JAPANESE_SIGNAL_RE = /日本語|通訳|翻訳|日本人|日系人/;
const NO_JAPANESE_RE = /日本語不可/;
const FOREIGN_LANGUAGE_RE = /(英語|ドイツ語|スペイン語|ポルトガル語|広東語|中国語|フランス語|アラビア語|韓国語)/;
const SUPPORT_WORD_RE = /(対応|医師|スタッフ)/;

function getSupportDetails(clinic: Clinic) {
    return [clinic.japaneseSupportDetails, clinic.notes].filter(Boolean).join(' ');
}

export function isJapaneseCompatibleClinic(clinic: Clinic) {
    const details = getSupportDetails(clinic);

    if (NO_JAPANESE_RE.test(details)) {
        return false;
    }

    if (clinic.supportLevel !== 'none') {
        return true;
    }

    if (JAPANESE_SIGNAL_RE.test(details)) {
        return true;
    }

    return !(FOREIGN_LANGUAGE_RE.test(details) && SUPPORT_WORD_RE.test(details));
}

export function filterJapaneseCompatibleClinics(clinics: Clinic[]) {
    return clinics.filter(isJapaneseCompatibleClinic);
}
