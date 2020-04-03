import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import {
    Iban as IbanModel,
    IbanValidation as IbanValidationModel,
} from '../models';
import { serialize } from 'typescript-json-serializer';

/**
 * Iban Class with all methods to request/modify Ibans infos
 * @property {string} url - main url to build Api requests for this class
 */
export class Iban extends MainBuilder {
    static url: string = '/account/me/user/';
    static url2: string = '/rib';

    /**
     * GET ALL | /account/me/user/{username}/rib
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get all ibans of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of the iban based on accountId
     */
    getAll = (userNameValue?: string): Promise<IApiResponse> => {
        return axios
            .get(this.buildUrlIban(Iban.url, Iban.url2, userNameValue), {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * CREATE ONE | /account/me/user/{username}/rib
     * @param {IbanModel} newIban - object containing all new iban information, both Admin and User can create Iban
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get the ibans of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get object with new iban created.
     */
    create = (
        newIban: IbanModel,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        const serializedIban = serialize(newIban);
        return axios
            .post(
                this.buildUrlIban(Iban.url, Iban.url2, userNameValue),
                serializedIban,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * GET ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get an iban of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of a specific iban
     */
    getOne = (
        ibanId: number,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        return axios
            .get(
                `${this.buildUrlIban(
                    Iban.url,
                    Iban.url2,
                    userNameValue,
                )}/${ibanId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * SET ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get an iban of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of a specific iban
     */
    setAsDefault = (
        ibanId: number,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        return axios
            .patch(
                `${this.buildUrlIban(
                    Iban.url,
                    Iban.url2,
                    userNameValue,
                )}/${ibanId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * DELETE ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string} UserNameValue - Admin Only - to delete one iban of a different user from the company account
     * @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    delete = (
        ibanId: number,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        return axios
            .delete(
                `${this.buildUrlIban(
                    Iban.url,
                    Iban.url2,
                    userNameValue,
                )}/${ibanId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    'user deleted successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * VALIDATE (reserved to 'Paygreen' account users) | /account/me/user/{username}/rib/{iban_id}
     *  @param {number} ibanId - unique number to identify the iban
     *  @param {IbanValidationModel} ValidatedIban - Object containing all new iban information
     *  @param {string?} userNameValue - Optional, by default UserName used will be the one from identity
     *  @returns {Promise.<IApiResponse>} Get object with new data updated
     */
    validate = (
        ValidatedIban: IbanValidationModel,
        ibanId: number,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        const serializedValidatedIban = serialize(ValidatedIban);
        return axios
            .put(
                `${this.buildUrlIban(
                    Iban.url,
                    Iban.url2,
                    userNameValue,
                )}/${ibanId}`,
                serializedValidatedIban,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}