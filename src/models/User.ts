import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { IUser } from '../interfaces';
import { Country, Role } from '../enums';

/** User Model Class with methods to manage users data */

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
     * @param {any} data -
     */
    constructor(
        lastName?: string | null,
        firstname?: string | null,
        publicname?: string | null,
        role?: Role | null,
        username?: string | null,
        password?: string | null,
        email?: string | null,
        country?: Country | null,
    ) {
        this.lastname = lastName;
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
        } return {
                lastname: data.lastname,
                firstname: data.firstname,
                publicname: data.publicname,
                role: data.role,
                username: data.username,
                password: data.password,
                contact: {
                    email: data.contact.email,
                    country: data.contact.country,
                },
            };
    };
}