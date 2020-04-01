import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { Bank } from '../enums';

/**
 * Iban Validation Model Class to generate iban validation
 * @property {string} bankName - bank of the iban waiting for validation
 * @property {string} status - pre-filled with 'VALID' value
 * @property {number} validatedAt - timestamp for validation time
 */
@Serializable()
export class IbanValidation {
    @JsonProperty('bankName')
    public bankName: string;
    @JsonProperty('status')
    public status: string;
    @JsonProperty('validatedAt')
    public validatedAt: number;

    /**
     * Create the Iban Validation object.
     * @param {Bank} bankName - name of the bank of the iban waiting for validation
     */
    constructor(bankName: Bank) {
        this.bankName = Bank[bankName];
        this.status = 'VALID';
        this.validatedAt = Math.ceil(Date.now() / 1000);
    }
}