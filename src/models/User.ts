import { Serializable, JsonProperty } from 'typescript-json-serializer';
import {
    IsEmail,
    MinLength,
    IsISO31661Alpha2,
    ValidateNested,
} from 'class-validator';
import { Country, Role } from '../enums';

/**
 * Contact Class
 * @property {string?} email - email address of the user
 * @property {string?} country - country of the user
 */
@Serializable()
class Contact {
    @JsonProperty('email')
    @IsEmail()
    public email?: string | null;
    @JsonProperty('country')
    @IsISO31661Alpha2()
    public country?: string | null;

    constructor(email?: string | null, country?: string | null) {
        this.email = email;
        this.country = country;
    }
}

/**
 * User Model Class with methods to manage users data
 * @property {string?} lastname - email address of the user
 * @property {string?} firstname - country of the user
 * @property {string?} publicname - public name of the user
 * @property {string?} role - role of the user
 * @property {string?} password - password of the user
 * @property {string?} username - unique identifier for the user
 * @property {Contact} contact - contact class
 */
@Serializable()
export class User {
    @JsonProperty('lastname')
    @MinLength(1)
    public lastname?: string | null;
    @JsonProperty('firstname')
    @MinLength(1)
    public firstname?: string | null;
    @JsonProperty('publicname')
    @MinLength(1)
    public publicname?: string | null;
    @JsonProperty('role')
    @MinLength(1)
    public role?: string | null;
    @JsonProperty('username')
    @MinLength(1)
    public username?: string | null;
    @JsonProperty('password')
    @MinLength(1)
    public password?: string | null;
    @JsonProperty('contact')
    @ValidateNested()
    public contact: Contact;

    /**
     * Create the newuser object.
     * @param {string?} lastname - email address of the user
     * @param {string?} firstname - country of the user
     * @param {string?} publicname - public name of the user
     * @param {string?} role - role of the user
     * @param {string?} password - password of the user
     * @param {string?} username - unique identifier for the user
     * @param {string?} email - email address of the user
     * @param {string?} country - country of the user
     */
    constructor(
        lastname?: string | null,
        firstname?: string | null,
        publicname?: string | null,
        role?: Role | null,
        username?: string | null,
        password?: string | null,
        email?: string | null,
        country?: Country | null,
    ) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.publicname = publicname;
        if (role != null) {
            this.role = Role[role];
        }
        this.username = username;
        this.password = password;
        this.contact = new Contact(email);
        if (country != null) {
            this.contact.country = Country[country];
        }
    }
}