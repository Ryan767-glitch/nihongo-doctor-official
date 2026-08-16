import { Clinic } from '@/types';
import { checkIsOpen } from '@/lib/utils';

export type OpenState = 'open' | 'closed' | 'unknown';

export function isTwentyFourHours(clinic: Clinic) {
    const hours = clinic.hoursDescription?.replace(/\s+/g, '') ?? '';
    return clinic.emergencyAvailable === true && /24時間|24H|24hr|終日/i.test(hours);
}

export function getOpenState(clinic: Clinic): OpenState {
    if (clinic.openNowOverride) return 'open';
    if (clinic.openingHours) {
        return checkIsOpen(clinic.openingHours, clinic.timeZone) ? 'open' : 'closed';
    }
    if (isTwentyFourHours(clinic)) return 'open';
    return 'unknown';
}

export function getOpenLabel(state: OpenState) {
    if (state === 'open') return '診療中';
    if (state === 'closed') return '時間外';
    return '要確認';
}
