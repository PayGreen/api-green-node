import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength } from 'class-validator';
import { WebFootprintSimulation } from './WebFootprintSimulation';

/**
 * WebFootprint Model Class to create Data to add to a Carbon Web Footprint
 * @extends WebFootprintSimulation
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting footprint data
 */
@Serializable('WebFootprintSimulation')
export class WebFootprint extends WebFootprintSimulation {
    @JsonProperty('fingerprint')
    @MinLength(1)
    public fingerprint?: string | null;

    /**
     * Create the web navigation footprint object.
     * @param {string?} fingerprint - unique string to identify a web footprint calculation
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
        super(
            userAgent,
            countImages,
            countPages,
            time,
            externalId || '', //since 1.9.0 Api doesn't accept value 'null' for externalId anymore
        );

        this.fingerprint = fingerprint;
    }
}
