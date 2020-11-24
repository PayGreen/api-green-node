import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

/**
 * PartnershipGroup Model Class
 * @property {Array<number>?} partnershipIds - list of the partnerships ids
 * @property {boolean?} isDefault - to set this partnershipGroup as the default one
 * @property {string?} externalId - id that you choose to identify the partnershipGroup
 */
@Serializable()
export class PartnershipGroup {
    @JsonProperty('partnershipIds')
    @ArrayNotEmpty()
    public partnershipIds?: Array<number> | null;
    @JsonProperty('isDefault')
    @IsNotEmpty()
    public isDefault?: boolean | null;
    @JsonProperty('externalId')
    @MinLength(1)
    public externalId?: string | null;

    /**
     * Create the newCharity object.
     * @param {Array<number>?} partnershipIds - list of the partnerships ids
     * @param {boolean?} isDefault - to set this partnershipGroup as the default one
     * @param {string?} externalId - id that you choose to identify the partnershipGroup
     */
    constructor(
        partnershipIds?: Array<number> | null,
        isDefault?: boolean | null,
        externalId?: string | null,
    ) {
        this.partnershipIds = partnershipIds;
        this.isDefault = isDefault;
        this.externalId = externalId;
    }
}
