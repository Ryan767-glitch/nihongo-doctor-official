export interface Clinic {
    id: string;
    nameJa: string;
    nameEn: string;
    continent: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    phoneClean?: string;
    supportLevel: 'medical' | 'support' | 'none';
    website: string;
    googleMapsUrl: string;
    specialties: string[];
    openingHours?: OpeningHours; // Optional structured hours
    hoursDescription?: string;   // Raw string from Excel
    embassyInfo?: {
        name: string;
        url: string;
    };
    openNowOverride?: boolean;

    // New fields from Excel
    japaneseSupportDetails?: string;
    emergencyAvailable?: boolean;
    cashlessAvailable?: boolean;
    notes?: string;
    hoursSyncStatus?: HoursSyncStatus;
    hoursSourceType?: HoursSourceType;
    hoursSourceUrl?: string;
    hoursVerifiedAt?: string;
    hoursConfidence?: HoursConfidence;
    timeZone?: string;
}

export interface OpeningHours {
    mon: string[];
    tue: string[];
    wed: string[];
    thu: string[];
    fri: string[];
    sat: string[];
    sun: string[];
}

export type HoursSyncStatus = 'verified' | 'needs_review' | 'unavailable';
export type HoursSourceType = 'official_website' | 'manual_review';
export type HoursConfidence = 'high' | 'medium' | 'low';

export interface ClinicHoursSyncEntry {
    openingHours?: OpeningHours;
    hoursDescription?: string;
    status: HoursSyncStatus;
    sourceType: HoursSourceType;
    sourceUrl: string;
    verifiedAt?: string;
    confidence?: HoursConfidence;
    timeZone?: string;
    rawSnippet?: string;
}

export interface ClinicHoursSyncFile {
    generatedAt: string;
    clinics: Record<string, ClinicHoursSyncEntry>;
}

export interface Embassy {
    country: string;
    region: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    alertFeedUrl?: string;
}
