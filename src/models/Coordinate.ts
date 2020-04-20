import {
    MinLength, IsEmpty, IsLatitude, IsLongitude
} from 'class-validator';

/**
 * Coordinate Model Class to generate a complete address object to define a point of departure or arrival for Path model.
 * Must be used for a path made by plane or boat.
 * @see Path
 * @property {string} address - this field must be sent to Api with default value.
 * @property {string} zipCode - this field must be sent to Api with default value.
 * @property {string} city - city name
 * @property {string} country - country (must be written out in full)
 * @property {string} latitude
 * @property {string} longitude
 */
export class Coordinate {
    @IsEmpty()
    public address: string;
    @IsEmpty()
    public zipCode: string;
    @MinLength(1)
    public city: string;
    @MinLength(1)
    public country: string;
    @IsLatitude()
    public latitude: string;
    @IsLongitude()
    public longitude: string;

    /**
     * Build the address object (for plane and boat) to define a point of departure or arrival
     * @param {string} city - city name
     * @param {string} country - country (must be written out in full)
     * @param {string} latitude - valid latitude coordinate
     * @param {string} longitude - valid longitude coordinate
     */
    constructor(
        city: string,
        country: string,
        latitude: string,
        longitude: string,
    ) {
        this.address = '';
        this.zipCode = '';
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}