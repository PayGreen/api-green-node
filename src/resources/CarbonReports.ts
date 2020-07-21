import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Carbon Reports Class with all methods to request carbon reports infos
 * @property {string} url - main url to build Api requests for this class
 */
export class CarbonReports extends MainBuilder {
    static url: string = '/carbon/statistics/reports?';

    /**
     * GET | /carbons/reports
     * @param {string?} beginValue - optional, if no date specified, date one month ago from current day will be used, accepted format YYYY-MM-DD
     * @param {string?} endValue - optional, if no date specified current day will be used, accepted format YYYY-MM-DD
     * @returns {Promise.<IApiResponse>} - get datas on last month or on a specific period
     */
    get = (beginValue?: string, endValue?: string): Promise<IApiResponse> => {
        const today = new Date().toISOString().substring(0, 10);
        const endDate = endValue ? endValue : today;
        return this.axiosRequest
            .get(
                CarbonReports.url,
                beginValue
                    ? {
                          params: {
                              begin: beginValue,
                              end: endDate,
                          },
                      }
                    : null,
            )
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}
