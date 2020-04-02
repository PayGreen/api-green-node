import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { User as UserModel } from '../models';
import { Account as AccountEnum, User as UserEnum } from '../enums';
import {
    serialize,
} from 'typescript-json-serializer';

/** User Class with all methods to request/modify users infos */
export class User extends MainBuilder {

    static url: string = '/account/me'
    static url2: string = '/account/me/user'
    buildUrl = (isDefaultActive, url, idValue?) => {
        const id = idValue ? idValue : 'me';
        return isDefaultActive? this.host + url + '/' + id : this.host + url
    }

    /**
     * GET ACCOUNT | /account/{accountId}
     * @returns {Promise.<IApiResponse>} Get information of the account based on accountId
     */
    getAccount = (): Promise<IApiResponse> => {
        return axios
            .get(this.buildUrl(false, User.url), {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
            .then(res => {
                const filteredData = this.ApiResponse.filterResponse(
                    AccountEnum,
                    res.data,
                );
                return this.ApiResponse.formatResponse(
                    true,
                    filteredData,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * GET ALL | /account/{accountId}/user
     * @returns {Promise.<IApiResponse>} Get a list of users based on accountId
     */
    getAll = (): Promise<IApiResponse> => {
        return axios
            .get(this.buildUrl(false, User.url2), {
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
     * GET ONE | /account/{accountId}/user/{userName}
     *  @param {string?} userNameValue - Optional, by default UserName used will be the one from identity, only Admin
     * can use a specific UserNameValue to format a different user of the company account
     *  @returns {Promise.<IApiResponse>} Get information of the account based on accountId
     */
    getOne = (userNameValue?: string): Promise<IApiResponse> => {
        return axios
            .get(this.buildUrl(true, User.url2, userNameValue), {
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
     * CREATE ONE | /account/{accountId}/user
     *  @param {UserModel} newUser - Admin Only - object containing all new user information
     *  @returns {Promise.<IApiResponse>} Get object with new user created.
     */
    create = (newUser: UserModel): Promise<IApiResponse> => {
        const serializedUser = serialize(newUser);
        return axios
            .post(this.buildUrl(false, User.url2), serializedUser, {
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
        return axios
            .put(
                this.buildUrl(true, User.url2, userNameValue),
                serializedUpdatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
            .then(res => {
                const filteredData = this.ApiResponse.filterResponse(
                    UserEnum,
                    res.data,
                );
                return this.ApiResponse.formatResponse(
                    true,
                    filteredData,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * DELETE ONE | /account/{accountId}/user/{userName}
     *  @param {string} UserNameValue - Admin Only - to delete one user from the company account
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    delete = (userNameValue: string): Promise<IApiResponse> => {
        return axios
            .delete(this.buildUrl(true, User.url2, userNameValue), {
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
}