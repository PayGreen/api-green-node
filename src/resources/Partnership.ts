import { IApiResponse, IApiResponseList } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { PartnershipStatus } from '../enums';

/**
 * Partnership Class with all methods to request/modify partnerships infos
 * @property {string} urlPartnership -  url to build Api requests for partnership info in this class
 */
export class Partnership extends MainBuilder {
    static urlPartnership: string = '/partnership';

    /**
     * GET ALL | /partnership
     * @returns {Promise.<IApiResponseList>} - Get a list of all the active partnerships between charities and shops (with Admin or Association roles)
     */
    getAll = (): Promise<IApiResponseList> => {
        return this.axiosRequest
            .get(this.buildUrl(false, Partnership.urlPartnership))
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
     * GET ONE | /partnership/{idPartnership}
     *  @param {string} idPartnership -
     *  @returns {Promise.<IApiResponse>} Get information about a specific partnership based on id (with Admin or Association roles)
     */
    getOne = (idPartnership: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Partnership.urlPartnership, idPartnership))
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
     * CREATE ONE | /partnership
     *  @param {string} idAssociation - Admin Only (only shop can request a partnership with a charity)
     *  @returns {Promise.<IApiResponse>} Get object with new partnership created.
     */
    create = (idAssociation: string): Promise<IApiResponse> => {
        const newCharityPartnership = { idAssociation: idAssociation };

        return this.axiosRequest
            .post(
                this.buildUrl(false, Partnership.urlPartnership),
                newCharityPartnership,
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

    /**
     * UPDATE ONE AS SHOP | /partnership/{idPartnership}
     *  @param {PartnershipStatus} status - status of the partnership - based on enum, choose between DELETE or ACCEPT.
     *  @param {string} idPartnership -
     *  @returns {Promise.<IApiResponse>} Get object with accountStatus value updated. (only Admin roles).
     */
    updateAsShop = (
        idPartnership: string,
        status: PartnershipStatus,
    ): Promise<IApiResponse> => {
        const updatedPartnership = { accountStatus: PartnershipStatus[status] };
        
        return this.axiosRequest
            .put(
                this.buildUrl(true, Partnership.urlPartnership, idPartnership),
                updatedPartnership,
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

    /**
     * UPDATE ONE AS CHARITY | /partnership/{idPartnership}
     *  @param {PartnershipStatus} status - status of the partnership - based on enum, choose between REFUSE or ACCEPT.
     *  @param {string} idPartnership -
     *  @returns {Promise.<IApiResponse>} Get object with associationStatus value updated. (only Association roles).
     */
    updateAsCharity = (
        idPartnership: string,
        status: PartnershipStatus,
    ): Promise<IApiResponse> => {
        const updatedPartnership = {
            associationStatus: PartnershipStatus[status],
        };

        return this.axiosRequest
            .put(
                this.buildUrl(true, Partnership.urlPartnership, idPartnership),
                updatedPartnership,
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

    /**
     * DELETE ONE | /partnership/{idPartnership}
     *  @param {string} idPartnership - Admin or Association roles only - to delete one partnership
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    delete = (idPartnership: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .delete(
                this.buildUrl(true, Partnership.urlPartnership, idPartnership),
            )
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'partnership deleted successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}
