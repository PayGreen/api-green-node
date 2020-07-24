import { Serializable, JsonProperty } from 'typescript-json-serializer';
import {
    MinLength,
    IsInt,
    ArrayMinSize,
    ValidateNested,
} from 'class-validator';
import { Path, Address } from '.';
import { TransportationFootprintSimulation } from './TransportationFootprintSimulation';

/**
 * Transportation Footprint Model Class to create data to add to a Carbon Footprint
 * @extends TransportationFootprintSimulation
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting estimate data
 * @property {number?} weightPackages - accumulated weight of all packages transported (in kilogram)
 * @property {number?} countPackages - number of packages transported
 * @property {Array<Address>?} addresses - an array containing all adresses
 * @property {Array<object>?} transports - an array containing all transports
 */
@Serializable()
export class TransportationFootprint extends TransportationFootprintSimulation {
    @JsonProperty('fingerprint')
    @MinLength(1)
    public fingerprint?: string | null;
    @JsonProperty('weightPackages')
    @IsInt()
    public weightPackages?: number | null;
    @JsonProperty('countPackages')
    @IsInt()
    public countPackages?: number | null;
    @JsonProperty('addresses')
    @ArrayMinSize(2)
    @ValidateNested()
    public addresses?: Array<Address>;
    @JsonProperty('transports')
    @ArrayMinSize(1)
    public transports?: Array<object>;

    /**
     * Create the path navigation estimate object.
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
        super(
            (weightPackages = weightPackages),
            (countPackages = countPackages),
            (path = path),
        );

        this.fingerprint = fingerprint;
    }
}
