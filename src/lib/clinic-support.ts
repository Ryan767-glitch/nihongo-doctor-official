import { Clinic } from '@/types';

const JAPANESE_SIGNAL_RE =
    /日本語|通訳|翻訳|コーディネーター|日本人|日系人|日本語スタッフ|日本人スタッフ|日本人医師|日本人歯科医|日本人歯科衛生士|日本人看護師|ジャパニーズヘルプデスク|ヘルプデスク|Japan(?:ese)?\s*Desk|Japanese|日英両語|日英対応|鳥居|TORII/i;
const NO_JAPANESE_RE = /日本語不可/;

function getSupportDetails(clinic: Clinic) {
    return [clinic.japaneseSupportDetails, clinic.notes].filter(Boolean).join(' ');
}

export function isJapaneseCompatibleClinic(clinic: Clinic) {
    const details = getSupportDetails(clinic);

    if (NO_JAPANESE_RE.test(details)) {
        return false;
    }

    if (clinic.supportLevel === 'medical') {
        return true;
    }

    if (clinic.supportLevel === 'none') {
        return false;
    }

    return JAPANESE_SIGNAL_RE.test(details);
}

export function filterJapaneseCompatibleClinics(clinics: Clinic[]) {
    return clinics.filter(isJapaneseCompatibleClinic);
}
