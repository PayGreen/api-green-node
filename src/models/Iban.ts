import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsISO31661Alpha2, Matches } from 'class-validator';
import { ibanRegExp, bicRegExp } from '../regExp/RegExp';
import { Bank, Country } from '../enums';

/**
 * Iban Model Class with methods to create and manage iban data
 * @property {string?} bankName - bank of the iban
 * @property {string?} iban - number of the iban
 * @property {string?} bic - bic of the iban
 * @property {string?} country - country of the iban
 */
@Serializable()
export class Iban {
    @JsonProperty('bankName')
    @MinLength(1)
    public bankName?: string | null;
    @JsonProperty('iban')
    @Matches(ibanRegExp, {
        message: 'Iban format is not correct',
    })
    public iban?: string | null;
    @JsonProperty('bic')
    @Matches(bicRegExp, {
        message: 'Bic format is not correct',
    })
    public bic?: string | null;
    @JsonProperty('country')
    @IsISO31661Alpha2()
    public country?: string | null;

    /**
     * Create the newIban object.
     * @param {Bank?} bankName - bank of the iban - based on enum
     * @param {string?} iban - number of the iban
     * @param {string?} bic - bic of the iban
     * @param {Country?} country - country of the iban - based on enum
     */
    constructor(
        bankName?: Bank | null,
        iban?: string | null,
        bic?: string | null,
        country?: Country | null,
    ) {
        bankName != null
            ? (this.bankName = Bank[bankName])
            : (this.bankName = null);
        this.iban = iban;
        this.bic = bic;
        country != null
            ? (this.country = Country[country])
            : (this.country = null);
    }
}