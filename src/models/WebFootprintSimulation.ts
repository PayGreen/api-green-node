import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsInt, IsEmpty } from 'class-validator';

/**
 * Web Footprint Simulation Model Class to create data to simulate a carbon web footprint
 * @property {string?} userAgent - user agent headers
 * @property {string} device - device will be automatically filled by Api based on the User Agent provided
 * @property {string} browser - browser will be automatically filled by Api based on the User Agent provided
 * @property {number?} countImages - number of images requested during the navigation
 * @property {number?} countPages - number of pages requested during the navigation
 * @property {number?} time - time spent during the navigation (in seconds)
 * @property {string?} externalId - optional - user ExternalId you may use to identify him in your system
 */
@Serializable()
export class WebFootprintSimulation {
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
    public externalId?: string;

    /**
     * Create the web footprint object.
     * @param {string?} userAgent - user agent headers
     * @param {number?} countImages - number of images requested during the navigation
     * @param {number?} countPages - number of pages requested during the navigation
     * @param {number?} time - time spent during the navigation (in seconds)
     * @param {string?} externalId - user ExternalId you may use to identify him in your system
     */
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
        this.externalId = externalId || ''; //since 1.9.0 Api doesn't accept value 'null' for externalId anymore
    }
}
