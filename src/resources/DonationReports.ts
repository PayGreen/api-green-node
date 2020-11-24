import { IApiResponse, IDonationReportsURLParams } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Donation Reports Class with all methods to request donation reports infos
 * @property {string} urlDonationReports - main url to build Api requests for this class
 */
export class DonationReports extends MainBuilder {
    static urlDonationReports: string = '/donation/statistics/reports?';

    /**
     * GET | /donation/statistics/reports?
     * @param {IDonationReportsURLParams?} params - all query params to filter report requests based on IDonationReportsURLParams interface
     * @returns {Promise.<IApiResponse>} - get datas of last past month (eq 30/31 days) by default or on a specific period and with daily details if specified
     */
    get = (params?: IDonationReportsURLParams): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(DonationReports.urlDonationReports + '?', {
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
