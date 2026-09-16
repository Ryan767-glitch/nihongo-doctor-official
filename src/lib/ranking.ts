import { Clinic } from '@/types';
import { getSymptomCityIndex, SymptomCity } from '@/lib/symptoms';

export function scoreClinic(clinic: Clinic) {
    const support = clinic.supportLevel === 'medical' ? 3 : clinic.supportLevel === 'support' ? 2 : 1;
    return (
        support * 10 +
        (clinic.emergencyAvailable ? 4 : 0) +
        (clinic.cashlessAvailable ? 3 : 0) +
        (clinic.japaneseSupportDetails ? 2 : 0) +
        (clinic.website ? 1 : 0) +
        (clinic.hoursVerifiedAt ? 1 : 0)
    );
}

export function rankClinics(clinics: Clinic[]) {
    return [...clinics].sort((a, b) => scoreClinic(b) - scoreClinic(a));
}

export function clinicHighlights(clinic: Clinic) {
    const tags: string[] = [];
    if (clinic.supportLevel === 'medical') tags.push('日本語で診察');
    if (clinic.supportLevel === 'support') tags.push('日本語サポートあり');
    if (clinic.emergencyAvailable) tags.push('24時間救急');
    if (clinic.cashlessAvailable) tags.push('キャッシュレス対応');
    if (clinic.japaneseSupportDetails) tags.push(clinic.japaneseSupportDetails);
    return tags;
}

export const RANKING_MIN_CLINICS = 4;

export function getRankingCities() {
    return [...getSymptomCityIndex().values()].filter(
        (city) => city.clinics.length >= RANKING_MIN_CLINICS
    );
}

export function getRankingParams() {
    return getRankingCities().map((city) => ({ city: city.slug }));
}

export function getRankingCity(slug: string): SymptomCity | null {
    const city = getSymptomCityIndex().get(slug);
    if (!city || city.clinics.length < RANKING_MIN_CLINICS) return null;
    return city;
}
