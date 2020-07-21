import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Carbon Reports Class with all methods to request carbon reports infos
 * @property {string} url - main url to build Api requests for this class
 */
export class CarbonReports extends MainBuilder {
    static url: string = '/carbon/statistics/reports?';

    /**
     * GET | /carbon/statistics/reports?
     * @param {string?} beginDate - optional, if no date specified, date one month ago from current day will be used, accepted format YYYY-MM-DD
     * @param {string?} endDate - optional, if no date specified current day will be used, accepted format YYYY-MM-DD
     * @returns {Promise.<IApiResponse>} - get datas on last month or on a specific period
     */
    get = (beginDate?: string, endDate?: string): Promise<IApiResponse> => {
        const today = new Date().toISOString().substring(0, 10);
        const defaultEndDate = endDate || today;
        return this.axiosRequest
            .get(
                CarbonReports.url,
                beginDate
                    ? {
                          params: {
                              begin: beginDate,
                              end: defaultEndDate,
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
