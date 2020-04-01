import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/** Carbon Statistics Class with all methods to request carbon statistics infos */
export class CarbonStatistics extends MainBuilder {

    /**
     * GET | /tree/ccarbon-statistics
     * @returns {Promise.<IApiResponse>} - default mode : get automatically datas from last month until today
     */
    get = (): Promise<IApiResponse> => {
        return axios
            .get(`${this.host}/tree/ccarbon-statistics`, {
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
     * GET A DATE | /tree/ccarbon-statistics?date=
     * @param {string} date - accepted formats are YYYY-MM-DD(show a day), YYYY-MM(show a month), YYYY(show a year)
     * @returns {Promise.<IApiResponse>} - get datas on a specific date
     */
    getADate = (date:string): Promise<IApiResponse> => {
        return axios
            .get(`${this.host}/tree/ccarbon-statistics?date=${date}`, {
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
     * GET A PERIOD | /tree/ccarbon-statistics
     * @param {string} start - accepted format YYYY-MM-DD
     * @param {string?} end - optional, if no date specified current day will be used, accepted format YYYY-MM-DD
     * @returns {Promise.<IApiResponse>} - get datas on a specific period
     */
    getAPeriod = (start:string, end?:string): Promise<IApiResponse> => {
        const today = new Date().toISOString().substring(0,10)
        const endDate = end ? end : today;
        return axios
            .get(`${this.host}/tree/ccarbon-statistics?start=${start}&end=${endDate}`, {
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
}