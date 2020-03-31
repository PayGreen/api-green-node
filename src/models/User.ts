import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { IUser } from '../interfaces';
import { Country, Role } from '../enums';

/** Contact Class
 * @property {string?} email - email address of the user
 * @property {string?} country - country of the user
 */
@Serializable()
class Contact {
    @JsonProperty('email')
    public email?: string | null;
    @JsonProperty('country')
    public country?: string | null;

    constructor(email?: string | null, country?: string | null) {
        this.email = email;
        this.country = country;
    }
}

/** User Model Class with methods to manage users data
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
    public lastname?: string | null;
    @JsonProperty('firstname')
    public firstname?: string | null;
    @JsonProperty('publicname')
    public publicname?: string | null;
    @JsonProperty('role')
    public role?: string | null;
    @JsonProperty('username')
    public username?: string | null;
    @JsonProperty('password')
    public password?: string | null;
    @JsonProperty('contact')
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

    /**
     * VERIFY USER |
     * @param {any} data - Object with all user's informations
     * @returns {IUser} New object with all user's informations with final structure/names for API compatibility
     */
    verify = (data: any): IUser => {
        for (const property in data) {
            if (data[property] == null) {
                throw `Error ${property} is null`;
            }
        }
        const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!emailRegEx.test(data.contact.email)) {
            throw 'Error in email syntax, please verify your email';
        } return data;
    };
}