import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { ApiResponse } from '../models';

/** Authentication Class with all methods to get/refresh token for connection to Api*/
export class Authentication extends MainBuilder {
    formatError = ApiResponse.formatError;
    formatResponse = ApiResponse.formatResponse;

    /**
     * GET TOKEN | /login
     * @returns {Promise.<IApiResponse>} Object containing access token and
     * 'refresh token' to get a new token after expiration
     */
    getToken = (): Promise<IApiResponse> => {
        const userData = {
            grant_type: 'password',
            username: this.identity.userName,
            password: this.identity.password,
            client_id: this.identity.accountId,
        };
        return axios
            .post(`${this.mode}/login`, userData)
            .then(res => {
                this.config.token = res.data.access_token;
                this.config.refreshToken = res.data.refresh_token;
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };

    /**
     * REFRESH TOKEN | /login
     * @returns {Promise.<IApiResponse>} Object with a renewed access token and
     * a new 'refresh token' to get another new token after expiration
     */
    refreshToken = (): Promise<IApiResponse> => {
        const userData = {
            grant_type: 'refresh_token',
            refresh_token: this.config.refreshToken,
            client_id: this.identity.accountId,
        };
        return axios
            .post(`${this.mode}/login`, userData)
            .then(res => {
                this.config.token = res.data.access_token;
                this.config.refreshToken = res.data.refresh_token;
                return this.formatResponse(true, res.data, res.status);
            })
            .catch(this.formatError);
    };
}