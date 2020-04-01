/** Tools Class to create and convert Data for an easier use of Api */
export class Tools {
    /**
     * RANDOM FINGERPRINT |
     * @returns {string} - Unique fingerprint to identify path and web carbon estimates
     */
    randomFingerprint = (): string => {
        return (
            Date.now() +
            Math.random()
                .toString(16)
                .slice(5)
        );
    };

    /**
     * KILOGRAMS OF CO2eq TO TONS OF CO2eq |
     * @param {number} value - quantity of Co2eq (in kilograms) to be converted
     * @returns {number} - quantity of Co2eq converted to tons
     */
    kilosCo2ToTonsCo2 = (value: number): number => {
        return value / 1000;
    };

    /**
     * TONS OF CO2eq TO KILOGRAMS OF CO2eq |
     * @param {number} value - quantity of Co2eq (in tons) to be converted
     * @returns {number} - quantity of Co2eq converted to kilograms
     */
    tonsCo2ToKilosCo2 = (value: number): number => {
        return value * 1000;
    };

    /**
     * EUROS CENTS TO EUROS |
     * @param {number} value - price (in euros cents) to be converted
     * @returns {number} - price converted to euros
     */
    eurosCentstoEuros = (value: number): number => {
        return value / 100;
    };

    /**
     * EUROS TO EUROS CENTS |
     * @param {number} value - price (in euros) to be converted
     * @returns {number} - price converted to euros cents
     */
    eurosToEurosCents = (value: number): number => {
        return value * 100;
    };
}