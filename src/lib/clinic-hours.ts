import hoursSyncData from '@/data/clinic-hours-sync.json';
import contactSyncData from '@/data/clinic-contact-sync.json';
import clinicTimezones from '@/data/clinic-timezones.json';
import { Clinic, ClinicContactSyncFile, ClinicHoursSyncEntry, ClinicHoursSyncFile } from '@/types';

const syncFile = hoursSyncData as ClinicHoursSyncFile;
const contactSyncFile = contactSyncData as ClinicContactSyncFile;

type TimezoneMap = {
    defaultByCountry: Record<string, string>;
    cityOverrides: Record<string, Record<string, string>>;
};

const timezoneMap = clinicTimezones as TimezoneMap;

export function getClinicTimeZone(clinic: Clinic) {
    if (clinic.timeZone) {
        return clinic.timeZone;
    }

    const cityOverride = timezoneMap.cityOverrides[clinic.country]?.[clinic.city];
    if (cityOverride) {
        return cityOverride;
    }

    return timezoneMap.defaultByCountry[clinic.country];
}

export function getClinicHoursSync(clinicId: string) {
    return syncFile.clinics[clinicId];
}

export function enrichClinicWithHoursSync(clinic: Clinic): Clinic {
    const syncEntry = getClinicHoursSync(clinic.id);
    const contactEntry = contactSyncFile.clinics[clinic.id];
    if (!syncEntry) {
        return {
            ...clinic,
            website: contactEntry?.website ?? clinic.website,
            phone: contactEntry?.phone ?? clinic.phone,
            phoneClean: contactEntry?.phoneClean ?? clinic.phoneClean,
            googleMapsUrl: contactEntry?.googleMapsUrl ?? clinic.googleMapsUrl,
            timeZone: getClinicTimeZone(clinic),
        };
    }

    return {
        ...clinic,
        website: contactEntry?.website ?? clinic.website,
        phone: contactEntry?.phone ?? clinic.phone,
        phoneClean: contactEntry?.phoneClean ?? clinic.phoneClean,
        googleMapsUrl: contactEntry?.googleMapsUrl ?? clinic.googleMapsUrl,
        openingHours: syncEntry.openingHours ?? clinic.openingHours,
        hoursDescription: syncEntry.hoursDescription ?? clinic.hoursDescription,
        hoursSyncStatus: syncEntry.status,
        hoursSourceType: syncEntry.sourceType,
        hoursSourceUrl: syncEntry.sourceUrl,
        hoursVerifiedAt: syncEntry.verifiedAt,
        hoursConfidence: syncEntry.confidence,
        timeZone: syncEntry.timeZone ?? getClinicTimeZone(clinic),
    };
}

export function enrichClinicsWithHoursSync(clinics: Clinic[]) {
    return clinics.map(enrichClinicWithHoursSync);
}

export function hasVerifiedOfficialHours(clinic: Clinic) {
    return clinic.hoursSourceType === 'official_website' && clinic.hoursSyncStatus === 'verified' && !!clinic.openingHours;
}

export function getHoursReviewState(clinic: Clinic) {
    const syncEntry = getClinicHoursSync(clinic.id);
    if (!syncEntry) {
        return null;
    }

    if (syncEntry.status === 'needs_review') {
        return syncEntry;
    }

    return null;
}

export function getHoursSyncStats() {
    const entries = Object.values(syncFile.clinics);
    return {
        generatedAt: syncFile.generatedAt,
        verified: entries.filter((entry) => entry.status === 'verified').length,
        review: entries.filter((entry) => entry.status === 'needs_review').length,
    };
}

export type { ClinicHoursSyncEntry };
