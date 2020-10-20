import {
    MinLength,
} from 'class-validator';

/**
 * Address Model Class to generate a complete address object to define a point of departure or arrival for Path model
 * @see Path
 * @property {string} address - street name
 * @property {string} zipCode - zipCode
 * @property {string} city - city name
 * @property {string} country - country (must be written out in full)
 */
export class Address {
    @MinLength(1)
    public address: string;
    @MinLength(1)
    public zipCode: string;
    @MinLength(1)
    public city: string;
    @MinLength(1)
    public country: string;

    /**
     * Build the address object to define a point of departure or arrival
     * @param {string} address - street name
     * @param {string} zipCode - zipCode
     * @param {string} city - city name
     * @param {string} country - country (must be written out in full)
     */
    constructor(
        address: string,
        zipCode: string,
        city: string,
        country: string,
    ) {
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
    }
}