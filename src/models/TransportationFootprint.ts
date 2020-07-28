import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength } from 'class-validator';
import { Path } from '.';
import { TransportationFootprintSimulation } from './TransportationFootprintSimulation';

/**
 * Transportation Footprint Model Class to create data to add to a Carbon Footprint
 * @extends TransportationFootprintSimulation
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting footprint data
 */
@Serializable('TransportationFootprintSimulation')
export class TransportationFootprint extends TransportationFootprintSimulation {
    @JsonProperty('fingerprint')
    @MinLength(1)
    public fingerprint?: string | null;

    /**
     * Create the path navigation footprint object.
     * @param {string?} fingerprint - unique string to identify a transportation footprint calculation
     * @param {number?} weightPackages - accumulated weight of all packages transported (in kilogram)
     * @param {number?} countPackages - number of packages transported
     * @param {Array<object>} path - an array containing all adresses and transports combined
     */
    constructor(
        fingerprint?: string | null,
        weightPackages?: number | null,
        countPackages?: number | null,
        path?: Array<Path>,
    ) {
        super(weightPackages, countPackages, path);

        this.fingerprint = fingerprint;
    }
}
