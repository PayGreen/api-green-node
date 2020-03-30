import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { EstimateType } from '../enums';

@Serializable()
export class PathEstimate {
    @JsonProperty('type')
    public type: string | null;
    @JsonProperty('fingerprint')
    public fingerprint?: string | null;
    @JsonProperty('weightPackages')
    public weightPackages?: number | null;
    @JsonProperty('countPackages')
    public countPackages?: number | null;
    @JsonProperty('transports')
    public transports?: Array<object>;
    @JsonProperty('addresses')
    public addresses?: Array<object>;

    /**
     * Create the path navigation estimate object.
     * @param {string?} fingerprint - unique string to identify a Carbon offsetting estimate file
     * @param {number?} weightPackages - accumulated weight of all packages transported (in kilogram)
     * @param {number?} countPackages - number of packages transported
     * @param {Array<object>} path - an array containing all adresses and transports
     */
    constructor(
        fingerprint?: string | null,
        weightPackages?: number | null,
        countPackages?: number | null,
        path?: Array<object>,
    ) {
        this.type = EstimateType[1];
        this.fingerprint = fingerprint;
        this.weightPackages = weightPackages;
        this.countPackages = countPackages;
        if (path) {
            this.addresses = this.formatAdresses(path);
        }
        if (path) {
            this.transports = this.formatTransports(path);
        }
    }

    /**
     * FORMAT TRANSPORTS |
     * @param {any} data - Object with all transports & adresses informations
     * @returns {Array<object>} New array of objects with transports with final structure/names for API compatibility
     */
    formatTransports = (path: any): Array<object> => {
        let transports: object[] = [];
        let flatpath = path.flat();
        flatpath.map((data, i) => {
            if (Object.keys(data).toString() === 'transport') {
                const transportName = Object.values(data)[0];
                transports.push({ uuidTransport: transportName })
            }
        });
        return transports;
    };

    /**
     * FORMAT ADRESSES | 
     * @param {any} data - Object with all transports & adresses informations
     * @returns {Array<object>} New array of objects with adresses with final structure/names for API compatibility
     */
    formatAdresses = (path: any): any => {
        let adresses = path.flat();
        adresses.map((data, i) => {
            if (Object.keys(data).toString() === 'transport') {
                adresses.splice(i, 1);
            }
            if (i % 2 === 0 && i > 0) {
                adresses.splice(i, 1);
            }
        });
        return adresses;
    };

    /**
     * CREATE PATH |
     * @param {string} address1 - address of departure
     * @param {string} zipCode1 - zipCode of departure
     * @param {string} city1 - city of departure
     * @param {string} country1 - country of departure
     * @param {string} address2 - address of arrival
     * @param {string} zipCode2 - zipCode of arrival
     * @param {string} city2 - city of arrival
     * @param {string} country2 - country of arrival
     * @param {string} transport - name of the transport used between the addresses
     * @returns {Array<object>} New array of objects with adresses with final structure/names for API compatibility
     */
    createPath = (
        address1: string,
        zipCode1: string,
        city1: string,
        country1: string,
        address2: string,
        zipCode2: string,
        city2: string,
        country2: string,
        transport,
    ): any => {
        return [
            {
                address: address1,
                zipCode: zipCode1,
                city: city1,
                country: country1,
            },
            {
                address: address2,
                zipCode: zipCode2,
                city: city2,
                country: country2,
            },
            { transport: transport },
        ];
    };

    /**
     * VERIFY WEB NAVIGATION OBJECT |
     * @param {any} data - Object with all path navigation informations
     * @returns {any} - New object with all path navigation informations with final structure/names for API compatibility
     */
    verify = (data: any): any => {
        for (const property in data) {
            if (data[property] == null) {
                throw `Error ${property} is null`;
            }
        } return data;
    };
}