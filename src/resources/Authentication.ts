import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Authentication Class with all methods to get/refresh token for connection to Api
 * @property {string} url - main url to build Api requests for this class
 */
export class Authentication extends MainBuilder {
    static url: string = '/login';

    /**
     * GET TOKEN | /login
     * @param {string} userName - The name of the user.
     * @param {string} password - The user's password.
     * @param {string} accountId - The name of the accountId.
     * @returns {Promise.<IApiResponse>} Object containing access token and
     * 'refresh token' to get a new token after expiration
     */
    login = (
        userName: string,
        password: string,
        accountId: string,
    ): Promise<IApiResponse> => {
        const userData = {
            grant_type: 'password',
            username: userName,
            password: password,
            client_id: accountId,
        };
        return this.axiosRequest
            .post(this.buildUrl(false, Authentication.url), userData)
            .then(res => {
                this.identity.accountId = accountId;
                this.tokens.token = res.data.access_token;
                this.tokens.refreshToken = res.data.refresh_token;
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * REFRESH TOKEN | /login
     * @param {string} accountId - The name of the accountId.
     * @returns {Promise.<IApiResponse>} Object with a renewed access token and
     * a renewed 'refresh token' to get another new token after expiration
     */
    refreshToken = (accountId: string): Promise<IApiResponse> => {
        const userData = {
            grant_type: 'refresh_token',
            refresh_token: this.tokens.refreshToken,
            client_id: accountId,
        };
        return axios
            .post(this.buildUrl(false, Authentication.url), userData)
            .then(res => {
                this.tokens.token = res.data.access_token;
                this.tokens.refreshToken = res.data.refresh_token;
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}