import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { MinLength, IsFQDN, IsBase64 } from 'class-validator';
import { FieldOfAction } from '../enums';

/**
 * Charity Model Class with methods to create and manage charity data
 * @property {string?} name - name of the charity organization
 * @property {string?} url - url of website
 * @property {string?} description - short text description
 * @property {string?} fieldOfAction -field of action of the charity
 * @property {string?} picture1 - picture to present the charity - optional
 */
@Serializable()
export class Charity {
    @JsonProperty('name')
    @MinLength(1)
    public name?: string | null;
    @JsonProperty('url')
    @IsFQDN()
    public url?: string | null;
    @JsonProperty('description')
    @MinLength(1)
    public description?: string | null;
    @JsonProperty('fieldOfAction')
    @MinLength(1)
    public fieldOfAction?: string | null;
    @JsonProperty('picture1')
    @IsBase64()
    public picture1?: string | null;

    /**
     * Create the newCharity object.
     * @param {string?} name - name of the charity organization
     * @param {string?} url - url of website
     * @param {string?} description - short text description
     * @param {FieldOfAction?} fieldOfAction - field of action of the charity - based on enum
     * @param {string?} picture1 - picture to present the charity
     */
    constructor(
        name?: string | null,
        url?: string | null,
        description?: string | null,
        fieldOfAction?: FieldOfAction | null,
        picture1?: string | null,
    ) {
        this.name = name;
        this.url = url;
        this.description = description;
        fieldOfAction != null
            ? (this.fieldOfAction = FieldOfAction[fieldOfAction])
            : (this.fieldOfAction = null);
        this.picture1 = picture1;
    }
}
