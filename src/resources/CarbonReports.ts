import { IApiResponse, IReportURLParams } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Carbon Reports Class with all methods to request carbon reports infos
 * @property {string} url - main url to build Api requests for this class
 */
export class CarbonReports extends MainBuilder {
    static url: string = '/carbon/statistics/reports?';

    /**
     * GET | /carbon/statistics/reports?
     * @param {IReportURLParams?} params - all query params to filter report requests based on IReportURLParams interface
     * @returns {Promise.<IApiResponse>} - get datas of last past month (eq 30/31 days) by default or on a specific period and with daily details if specified
     */
    get = (params?: IReportURLParams): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(CarbonReports.url + '?', {
                params: params,
            })
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
