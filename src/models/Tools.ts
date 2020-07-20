import { validate, ValidatorOptions } from 'class-validator';

/** Tools Class to create and convert Data for an easier use of Api */
export class Tools {
    /**
     * RANDOM FINGERPRINT |
     * @returns {string} - Unique fingerprint to identify path and web carbon estimates
     */
    static randomFingerprint = (): string => {
        return Date.now() + Math.random().toString(16).slice(5);
    };

    /**
     * KILOGRAMS OF CO2eq TO TONS OF CO2eq |
     * @param {number} value - quantity of Co2eq (in kilograms) to be converted
     * @returns {number} - quantity of Co2eq converted to tons
     */
    static kilosCo2ToTonsCo2 = (value: number): number => {
        return value / 1000;
    };

    /**
     * TONS OF CO2eq TO KILOGRAMS OF CO2eq |
     * @param {number} value - quantity of Co2eq (in tons) to be converted
     * @returns {number} - quantity of Co2eq converted to kilograms
     */
    static tonsCo2ToKilosCo2 = (value: number): number => {
        return value * 1000;
    };

    /**
     * EUROS CENTS TO EUROS |
     * @param {number} value - price (in euros cents) to be converted
     * @returns {number} - price converted to euros
     */
    static eurosCentstoEuros = (value: number): number => {
        return value / 100;
    };

    /**
     * EUROS TO EUROS CENTS |
     * @param {number} value - price (in euros) to be converted
     * @returns {number} - price converted to euros cents
     */
    static eurosToEurosCents = (value: number): number => {
        return value * 100;
    };

    /**
     * VERIFY DATA |
     * @param {any} data - Object created with one of the model classes (user, iban, webFootprint, webFootprintSimulation, transportationFootprint, transportationFootprintSimulation)
     * @returns {any} - New object with all errors informations or a string validation
     */
    static verify = (data: any): any => {
        const validatorOptions: ValidatorOptions = {
            forbidUnknownValues: true,
        };
        return validate(
            data,
            { validationError: { target: false } },
            validatorOptions,
        ).then((errors) => {
            if (errors.length > 0) {
                return errors;
            } else {
                return 'validation succeed';
            }
        });
    };
}
