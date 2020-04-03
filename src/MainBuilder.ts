import { ITokens, IIdentity } from './interfaces';
import { ApiResponse } from './models';
import axios from 'axios';

/**
 * Main Builder with config constructor
 * @property {object} identity - identity inherited from SDK class to authorize access to API and build url
 * @property {object} tokens - tokens inherited from SDK class
 * @property {string} host - host of Api inherited from SDK class based on mode of production
 * @property {any} ApiResponse - class to normalize all Api Responses for better readibility
 * @property {object} axiosConfig - all parameters for axios instance
 * @property {any} axiosRequest -  create a new instance of axios with a custom config
 */
export class MainBuilder {
    public identity: IIdentity;
    public tokens: ITokens;
    public host: string;
    public ApiResponse: any = ApiResponse;
    public axiosConfig = {
        baseURL: '',
        timeout: 3000,
        headers: { Authorization: '' },
    };
    public axiosRequest: any;

    /**
     * Build a complete path object
     * @param {ITokens} tokens - tokens inherited from SDK class
     * @param {IIdentity} identity - identity inherited from SDK class
     * @param {string} host - host of Api inherited from SDK
     */
    constructor(tokens: ITokens, identity: IIdentity, host: string) {
        this.tokens = tokens;
        this.identity = identity;
        this.host = host;
        this.ApiResponse;
        this.axiosConfig.baseURL = host;
        this.axiosConfig.headers.Authorization = `Bearer ${tokens.token}`;
        this.axiosRequest = axios.create(this.axiosConfig);
    }

    /**
     * BUILD URL FOR MAIN API ROUTES |
     * @param {boolean} isDefaultActive - to choose to use or not, an identifier with default value to build url
     * @param {string} url - basic url value for each route
     * @param {string} idValue - optional - identifier to specify url
     * @returns {string} - new built complete url
     */
    buildUrl = (
        isDefaultActive: boolean,
        url: string,
        idValue?: string,
    ): string => {
        const id = idValue ? idValue : 'me';
        return isDefaultActive ? url + '/' + id : url;
    };

    /**
     * BUILD URL FOR IBAN ROUTE |
     * @param {string} url - basic url value for each route
     * @param {string} url2 - url extension specific for iban route
     * @param {string} idValue - optional - identifier to specify url
     * @returns {string} - new built complete url
     */
    buildUrlIban = (url: string, url2: string, idValue?: string): string => {
        const id = idValue ? idValue : 'me';
        return this.host + url + id + url2;
    };

    /**
     * BUILD URL FOR STATISTICS ROUTE |
     * @param {string} url - basic url value for each route
     * @param {Array<string>} params - array of data to define query parameters of the url
     * @returns {string} - new built complete url
     */
    buildUrlStat = (url: string, ...params: string[]): string => {
        const obj = {};
        const paramArray = params;
        for (let i = 0; i < paramArray.length - 1; i = i + 2) {
            obj[paramArray[i]] = paramArray[i + 1];
        }
        const search = new URLSearchParams(obj).toString();
        return this.host + url + '?' + search;
    };
}