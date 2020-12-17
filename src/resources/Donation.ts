import {
    IApiResponse,
    IApiResponseList,
    IDonationURLParams,
} from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Donation Class with all methods to request/modify Donation infos
 * @property {string} urlDonation -  url to build Api requests for Donation info in this class
 */
export class Donation extends MainBuilder {
    static urlDonation: string = '/donation';

    /**
     * GET ALL | /donation
     * @param {IDonationURLParams?} params - all query params to filter donations requests based on IDonationURLParams interface
     * @returns {Promise.<IApiResponseList>} - get donations of last past month (eq 30/31 days) by default
     */
    getAll = (params?: IDonationURLParams): Promise<IApiResponseList> => {
        return this.axiosRequest
        .get(Donation.urlDonation + '?', {
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

    /**
     * GET ONE | /donation/{idDonation}
     *  @param {string} idDonation -
     *  @returns {Promise.<IApiResponse>} Get information about a donation based on id
     */
    getOne = (idAssociation: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Donation.urlDonation, idAssociation))
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    res.data,
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * REFUND ONE | /donation/{idDonation}
     *  @param {string} idDonation - to cancel and refund one donation based on its id
     *  @returns {Promise.<IApiResponse>} - get response with status 204 if success.
     */
    refund = (idDonation: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .delete(this.buildUrl(true, Donation.urlDonation, idDonation))
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'donation refunded successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}
