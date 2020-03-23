import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { IIban } from '../interfaces';
import { Bank, Country } from '../enums';

/** Iban Model Class with methods to manage iban data */
@Serializable()
export class Iban {
    @JsonProperty('bankName')
    public bankName?: string | null;
    @JsonProperty('iban')
    public iban?: string | null;
    @JsonProperty('bic')
    public bic?: string | null;
    @JsonProperty('country')
    public country?: string | null;

    /**
     * Create the newuser object.
     * @param {any} data -
     */
    constructor(
        bankName?: Bank | null,
        iban?: string | null,
        bic?: string | null,
        country?: Country | null,
    ) {
        bankName != null ? (this.bankName = Bank[bankName]) : (this.bankName = null);
        this.iban = iban;
        this.bic = bic;
        country != null ? (this.country = Country[country]) : (this.country = null);
    }

    /**
     * VERIFY IBAN |
     * @param {any} data - Object with all  iban user's informations
     * @returns {IIban} New object with all iban user's informations with final structure/names for API compatibility
     */
    verify = (data: any): IIban => {
        for (const property in data) {
            if (data[property] == null) {
                throw `Error ${property} is null`;
            }
        }
        const ibanRegEx = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/;
        const bicRegEx = /[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/
        if (!ibanRegEx.test(data.iban)) {
            throw 'Error in iban syntax, please verify your iban';
        } else if (!bicRegEx.test(data.bic)) {
            throw 'Error in bic syntax, please verify your bic';
        } else
            return {
                bankName: data.bankName,
                iban: data.iban,
                bic: data.bic,
                country: data.country,
            };
    };
}