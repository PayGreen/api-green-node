import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { EstimateType } from '../enums';
import { Path, Address } from '../models';

/**
 * PathEstimate Model Class to create data to add to a Carbon Path Estimate
 * @alias PathEstimate
 * @property {EstimateType} type - type of Estimate based on enum
 * @property {string?} fingerprint - unique string to identify a Carbon offsetting estimate data
 * @property {number?} weightPackages - accumulated weight of all packages transported (in kilogram)
 * @property {number?} countPackages - number of packages transported
 * @property {Array<Address>?} addresses - an array containing all adresses
 * @property {Array<object>?} transports - an array containing all transports
 */
@Serializable()
export class PathEstimate {
    @JsonProperty('type')
    public type: EstimateType;
    @JsonProperty('fingerprint')
    public fingerprint?: string | null;
    @JsonProperty('weightPackages')
    public weightPackages?: number | null;
    @JsonProperty('countPackages')
    public countPackages?: number | null;
    @JsonProperty('addresses')
    public addresses?: Array<Address>;
    @JsonProperty('transports')
    public transports?: Array<object>;

    /**
     * Create the path navigation estimate object.
     * @param {string?} fingerprint - unique string to identify a Carbon offsetting estimate file
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
        this.type = EstimateType.PATH;
        this.fingerprint = fingerprint;
        this.weightPackages = weightPackages;
        this.countPackages = countPackages;
        if (path) {
            const { addresses, transports } = this.formatPath(path);
            this.addresses = addresses;
            this.transports = transports;
        }
    }

    /**
     * FORMAT PATH |
     * @description - remove intermediary duplicated adresses and format data for API compatibility
     * @param {Array<Path>} paths - array of objects built with Path Model with transports & adresses combined
     * @returns {Object} - new object with 2 separated arrays for addresses & transports with final structure/names
     * @throws {InvalidArgumentException} - if number of addresses > 2, will throw an error if the address of
     * departure following the address of arrival is not the same
     */
    formatPath = (
        paths: Array<Path>,
    ): { addresses: Address[]; transports: Object[] } => {
        const addresses: Array<Address> = [];
        const transports: Array<Object> = [];
        paths.forEach((path, index) => {
            if (addresses.length === 0) {
                addresses.push(path.addressDeparture);
            } else if (
                path.addressDeparture !== addresses[addresses.length - 1]
            ) {
                throw `Error one of the address is incorrect.`;
            }
            addresses.push(path.addressArrival);
            transports.push({ uuidTransport: path.transport });
        });
        return { addresses, transports };
    };

    /**
     * VERIFY PATH NAVIGATION OBJECT |
     * @param {any} data - Object with all path navigation informations
     * @returns {any} - New object with all path navigation informations with final structure/names for API compatibility
     */
    verify = (data: any): any => {
        for (const property in data) {
            if (data[property] == null) {
                throw `Error ${property} is null`;
            }
        }
        return data;
    };
}