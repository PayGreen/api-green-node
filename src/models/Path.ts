import { Address } from './Address';
import { Coordinate } from './Coordinate';
import { Transport } from '../enums';

/**
 * Path Model to generate a complete path object necessary to create Carbon Transportation
 * @see TransportationFootprint
 * @alias Path
 * @property {Address | Coordinate} addressDeparture - address object generated with Address or Coordinate Models
 * @property {Address | Coordinate} addressArrival - address object generated with Address or Coordinate Models
 * @property {Transport} transport - transport vehicle chosen from enum
 */
export class Path {
    public addressDeparture: Address | Coordinate;
    public addressArrival: Address | Coordinate;
    public transport: Transport;

    /**
     * Build a complete path object
     * @param {Address | Coordinate} addressDeparture - address object generated with Address Model
     * @param {Address | Coordinate} addressArrival - address object generated with Address Model
     * @param {Transport} transport - transport vehicle chosen from enum
     */
    constructor(
        addressDeparture: Address | Coordinate,
        addressArrival: Address | Coordinate,
        transport: Transport,
    ) {
        this.addressDeparture = addressDeparture;
        this.addressArrival = addressArrival;
        this.transport = transport;
    }
}

export default Path;
