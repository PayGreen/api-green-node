import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { User as UserModel } from '../models';
import { Account as AccountEnum, User as UserEnum } from '../enums';
import { serialize } from 'typescript-json-serializer';

/**
 * User Class with all methods to request/modify users infos
 * @property {string} urlAccount -  url to build Api requests for account info in this class
 * @property {string} urlUser -  url to build Api requests for user info in this class
 */
export class User extends MainBuilder {
    static urlAccount: string = '/account/me';
    static urlUser: string = '/account/me/user';

    /**
     * GET ACCOUNT | /account/{accountId}
     * @returns {Promise.<IApiResponse>} Get information of the account based on accountId
     */
    getAccount = (): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(false, User.urlAccount))
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
     * @returns {Promise.<IApiResponse>} - Get a list of users based on accountId, only Admin can see other users
     */
    getAll = (): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(false, User.urlUser))
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
        return this.axiosRequest
            .get(this.buildUrl(true, User.urlUser, userNameValue))
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
        return this.axiosRequest
            .post(this.buildUrl(false, User.urlUser), serializedUser)
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
        return this.axiosRequest
            .put(
                this.buildUrl(true, User.urlUser, userNameValue),
                serializedUpdatedUser,
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
        return this.axiosRequest
            .delete(this.buildUrl(true, User.urlUser, userNameValue))
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