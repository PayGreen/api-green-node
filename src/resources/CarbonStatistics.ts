import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { PathEstimate, WebEstimate } from '../models';

/** Carbon Class with all methods to request/modify carbon estimates infos */
export class CarbonStatistics extends MainBuilder {

    /**
     * GET | /tree/ccarbon-statistics
     *  @returns {Promise.<IApiResponse>} - get information about the ongoing carbon offsetting estimate
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
     * GET A DAY | /tree/ccarbon-statistics?date=
     *  @returns {Promise.<IApiResponse>} - get information about the ongoing carbon offsetting estimate
     */
    getADay = (date:any): Promise<IApiResponse> => {
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
     *  @returns {Promise.<IApiResponse>} - get information about the ongoing carbon offsetting estimate
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