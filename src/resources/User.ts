import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { User as UserModel, ApiResponse } from '../models';
import {
    serialize,
    deserialize,
    Serializable,
    JsonProperty,
} from 'typescript-json-serializer';

/** User Class with all methods to request/modify users infos */
export class User extends MainBuilder {
    formatError = ApiResponse.formatError;
    formatResponse = ApiResponse.formatResponse;

    /**
     * GET ACCOUNT | /account/{accountId}
     * @returns {Promise.<IApiResponse>} Get information of the account based on accountId
     */
    getAccount = (): Promise<IApiResponse> => {
        return axios
            .get(`${this.mode}/account/${this.identity.accountId}`, {
                headers: {
                    Authorization: `Bearer ${this.config.token}`,
                },
            })
            .then(res => {
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * GET ALL | /account/{accountId}/user
     * @returns {Promise.<IApiResponse>} Get a list of users based on accountId
     */
    getAll = (): Promise<IApiResponse> => {
        return axios
            .get(`${this.mode}/account/${this.identity.accountId}/user`, {
                headers: {
                    Authorization: `Bearer ${this.config.token}`,
                },
            })
            .then(res => {
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * GET ONE | /account/{accountId}/user/{userName}
     *  @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to format a different user of the company account
     *  @returns {Promise.<IApiResponse>} Get information of the account based on accountId
     */
    getOne = (userNameValue?: string): Promise<IApiResponse> => {
        const userName = userNameValue ? userNameValue : this.identity.userName;
        return axios
            .get(
                `${this.mode}/account/${this.identity.accountId}/user/${userName}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.config.token}`,
                    },
                },
            )
            .then(res => {
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * CREATE ONE | /account/{accountId}/user
     *  @param {UserModel} newUser - Admin Only - object containing all new user information
     *  @returns {Promise.<IApiResponse>} Get object with new user created.
     */
    create = (newUser: UserModel): Promise<IApiResponse> => {
        const serializedUser = serialize(newUser);
        return axios
            .post(
                `${this.mode}/account/${this.identity.accountId}/user`,
                serializedUser,
                {
                    headers: {
                        Authorization: `Bearer ${this.config.token}`,
                    },
                },
            )
            .then(res => {
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * UPDATE ONE | /account/{accountId}/user/{userName}
     *  @param {UserModel} UpdatedUser - Object containing all new user information
     *  @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to modify a different user of the company account
     *  @returns {Promise.<IApiResponse>} Get object with new data updated
     */
    update = (
        UpdatedUser: UserModel,
        userNameValue?: string,
    ): Promise<IApiResponse> => {
        const serializedUpdatedUser = serialize(UpdatedUser);
        const userName = userNameValue ? userNameValue : this.identity.userName;
        return axios
            .put(
                `${this.mode}/account/${this.identity.accountId}/user/${userName}`,
                serializedUpdatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${this.config.token}`,
                    },
                },
            )
            .then(res => {
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * DELETE ONE | /account/{accountId}/user/{userName}
     *  @param {string} UserNameValue - Admin Only - to delete one user from the company account
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    delete = (UserNameValue: string): Promise<IApiResponse> => {
        return axios
            .delete(
                `${this.mode}/account/${this.identity.accountId}/user/${UserNameValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.config.token}`,
                    },
                },
            )
            .then(res => {
                return this.formatResponse(
                    true,
                    'user deleted successfully',
                    res.status,
                );
            })
            .catch(this.formatError);
    };
}