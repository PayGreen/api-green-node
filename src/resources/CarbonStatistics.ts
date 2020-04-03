import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Carbon Statistics Class with all methods to request carbon statistics infos
 * @property {string} url - main url to build Api requests for this class
 */
export class CarbonStatistics extends MainBuilder {
    
    static url: string = '/tree/ccarbon-statistics';

    /**
     * GET | /tree/ccarbon-statistics
     * @returns {Promise.<IApiResponse>} - default mode : get automatically datas from last month until today
     */
    get = (): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrlStat(CarbonStatistics.url))
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
    getADate = (dateValue: string): Promise<IApiResponse> => {
        const objectData = {date:dateValue}
        return this.axiosRequest
            .get(this.buildUrlStat(CarbonStatistics.url, objectData))
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
    getAPeriod = (startValue: string, endValue?: string): Promise<IApiResponse> => {
        const today = new Date().toISOString().substring(0,10)
        const endDate = endValue ? endValue : today;
        const objectData = {start:startValue, end:endDate}

        return this.axiosRequest
            .get(
                this.buildUrlStat(
                    CarbonStatistics.url,objectData
                ))
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