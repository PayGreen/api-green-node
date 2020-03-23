import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { Iban as IbanModel } from '../models';

import {
    serialize,
    deserialize,
    Serializable,
    JsonProperty,
} from 'typescript-json-serializer';

/** Iban Class with all methods to request/modify Ibans infos */
export class Iban extends MainBuilder {
    /**
     * GET ALL | /account/me/user/{username}/rib
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get all ibans of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of the iban based on accountId
     */
    getAll = (userNameValue?: string): Promise<IApiResponse> => {
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .get(`${this.host}/account/me/user/${userName}/rib`, {
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
    create = (newIban: IbanModel, userNameValue?: string): Promise<IApiResponse> => {
        const serializedIban = serialize(newIban);
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .post(`${this.host}/account/me/user/${userName}/rib`, serializedIban, {
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
     * GET ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get an iban of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of a specific iban
     */
    getOne = (ibanId:number, userNameValue?: string): Promise<IApiResponse> => {
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .get(`${this.host}/account/me/user/${userName}/rib/${ibanId}`, {
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
     * SET ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to get an iban of a different user of the company account
     * @returns {Promise.<IApiResponse>} Get information of a specific iban
     */
    setAsDefault = (ibanId:number, userNameValue?: string): Promise<IApiResponse> => {
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .patch(`${this.host}/account/me/user/${userName}/rib/${ibanId}`, {
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
     * DELETE ONE | /account/me/user/{username}/rib/{iban_id}
     * @param {number} ibanId - unique number to identify the iban
     * @param {string} UserNameValue - Admin Only - to delete one iban of a different user from the company account
     * @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    delete = (ibanId:number, userNameValue?: string): Promise<IApiResponse> => {
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .delete(`${this.host}/account/me/user/${userName}/rib/${ibanId}`, {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
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
     * UPDATE ONE | /account/me/user/{username}/rib/{iban_id}
     *  @param {number} ibanId - unique number to identify the iban
     *  @param {IbanModel} UpdatedIban - Object containing all new iban information
     *  @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to modify a different iban of the company account
     *  @returns {Promise.<IApiResponse>} Get object with new data updated
     */
    update = (
        UpdatedIban: IbanModel, ibanId:number, userNameValue?: string): Promise<IApiResponse> => {
        const serializedUpdatedIban = serialize(UpdatedIban);
        const userName = userNameValue ? userNameValue : 'me';
        return axios
            .put(
                `${this.host}/account/me/user/${userName}/rib/${ibanId}`,
                serializedUpdatedIban,
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