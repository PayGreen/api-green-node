import { Address } from './Address';
import { Transport } from '../enums';

/** Path Model to generate a complete path object necessary to create Carbon PathEstimate
 * @see PathEstimate
 * @alias Path
 * @property {Address} addressDeparture - address object generated with Address Model
 * @property {Address} addressArrival - address object generated with Address Model
 * @property {Transport} transport - transport vehicle chosen from enum
 */
export class Path {
    public addressDeparture: Address;
    public addressArrival: Address;
    public transport: Transport;

    /** Build a complete path object
     * @param {Address} addressDeparture - address object generated with Address Model
     * @param {Address} addressArrival - address object generated with Address Model
     * @param {Transport} transport - transport vehicle chosen from enum
     */
    constructor(
        addressDeparture: Address,
        addressArrival: Address,
        transport: Transport,
    ) {
        this.addressDeparture = addressDeparture;
        this.addressArrival = addressArrival;
        this.transport = transport;
    }
}

export default Path;