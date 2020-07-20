import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsInt, IsEmpty, ValidateNested } from 'class-validator';

/**
 * WebNavigation Model Class to create Web Data
 * @property {string?} userAgent - user agent headers
 * @property {string} device - device will be automatically filled by Api based on the User Agent provided
 * @property {string} browser - browser will be automatically filled by Api based on the User Agent provided
 * @property {number?} countImages - number of images requested during the navigation
 * @property {number?} countPages - number of pages requested during the navigation
 * @property {number?} time - time spent during the navigation (in seconds)
 * @property {string?} externalId - optional - user ExternalId you may use to identify him in your system
 */
@Serializable()
class WebNavigation {
    @JsonProperty('userAgent')
    @MinLength(1)
    public userAgent?: string | null;
    @JsonProperty('device')
    @IsEmpty()
    public device?: string;
    @JsonProperty('browser')
    @IsEmpty()
    public browser?: string;
    @JsonProperty('countImages')
    @IsInt()
    public countImages?: number | null;
    @JsonProperty('countPages')
    @IsInt()
    public countPages?: number | null;
    @JsonProperty('time')
    @IsInt()
    public time?: number | null;
    @JsonProperty('externalId')
    public externalId?: string | null;

    constructor(
        userAgent?: string | null,
        countImages?: number | null,
        countPages?: number | null,
        time?: number | null,
        externalId?: string | null,
    ) {
        this.userAgent = userAgent;
        this.device = '';
        this.browser = '';
        this.countImages = countImages;
        this.countPages = countPages;
        this.time = time;
        this.externalId = externalId || null;
    }
}

/**
 * WebEstimate Model Class to create Data to add to a Carbon Web Estimate
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting estimate data
 * @property {WebNavigation} webNavigation - object built with WebNavigation class containing web data
 */
@Serializable()
export class WebEstimate {
    @JsonProperty('fingerprint')
    @MinLength(1)
    public fingerprint?: string | null;
    @JsonProperty('webNavigation')
    @ValidateNested()
    public webNavigation: WebNavigation;

    /**
     * Create the web navigation estimate object.
     * @param {string?} fingerprint - unique string to identify a Carbon offsetting estimate file
     * @param {string?} userAgent - user agent headers
     * @param {number?} countImages - number of images requested during the navigation
     * @param {number?} countPages - number of pages requested during the navigation
     * @param {number?} time - time spent during the navigation (in seconds)
     * @param {string?} externalId - user ExternalId you may use to identify him in your system
     */
    constructor(
        fingerprint?: string | null,
        userAgent?: string | null,
        countImages?: number | null,
        countPages?: number | null,
        time?: number | null,
        externalId?: string | null,
    ) {
        this.fingerprint = fingerprint;
        this.webNavigation = new WebNavigation(
            userAgent,
            countImages,
            countPages,
            time,
            externalId,
        );
    }
}
