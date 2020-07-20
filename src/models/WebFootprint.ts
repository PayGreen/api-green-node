import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsEmpty, IsInt } from 'class-validator';
import { WebFootprintSimulation } from './WebFootprintSimulation';

/**
 * WebEstimate Model Class to create Data to add to a Carbon Web Estimate
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting estimate data
 * @property {string?} userAgent - user agent headers
 * @property {string} device - device will be automatically filled by Api based on the User Agent provided
 * @property {string} browser - browser will be automatically filled by Api based on the User Agent provided
 * @property {number?} countImages - number of images requested during the navigation
 * @property {number?} countPages - number of pages requested during the navigation
 * @property {number?} time - time spent during the navigation (in seconds)
 * @property {string?} externalId - optional - user ExternalId you may use to identify him in your system
 */
@Serializable()
export class WebFootprint extends WebFootprintSimulation {
    @JsonProperty('fingerprint')
    @MinLength(1)
    public fingerprint?: string | null;
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
     * Create the web navigation footprint object.
     * @param {string?} fingerprint - unique string to identify a web footprint calculation
     */
    constructor(
        fingerprint?: string | null,
        userAgent?: string | null,
        countImages?: number | null,
        countPages?: number | null,
        time?: number | null,
        externalId?: string | null,
    ) {
        super(
            (userAgent = userAgent),
            (countImages = countImages),
            (countPages = countPages),
            (time = time),
            (externalId = externalId || ''), //since 1.9.0 Api doesn't accept value 'null' for externalId anymore
        );

        this.fingerprint = fingerprint;
    }
}
