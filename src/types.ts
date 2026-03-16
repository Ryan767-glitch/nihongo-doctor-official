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

export interface Embassy {
    country: string;
    region: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    alertFeedUrl?: string;
}
