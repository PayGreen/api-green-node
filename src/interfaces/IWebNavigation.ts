export interface IWebNavigation {
    type: string | null;
    fingerprint: string | null;
    webNavigation: {
        userAgent: string | null;
        device: string | null;
        browser: string | null;
        countImages: number | null;
        countPages: number | null;
        time: number | null;
        externalId: number | null;
    };
}