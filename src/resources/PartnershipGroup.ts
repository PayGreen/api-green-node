import { IApiResponse, IApiResponseList } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { serialize } from 'typescript-json-serializer';
import { PartnershipGroup as PartnershipGroupModel } from '../models';

/**
 * PartnershipGroup Class with all methods to request/modify partnerships groups infos
 * @property {string} urlPartnership -  url to build Api requests for partnership group info in this class
 */
export class PartnershipGroup extends MainBuilder {
    static urlPartnershipGroup: string = '/partnership-group';

    /**
     * GET ALL | /partnership-group
     * @returns {Promise.<IApiResponseList>} - Get a list of all the active partnerships groups between charities and shops (with Admin role)
     */
    getAll = (): Promise<IApiResponseList> => {
        return this.axiosRequest
            .get(this.buildUrl(false, PartnershipGroup.urlPartnershipGroup))
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
     * GET ONE | /partnership-group/{externalId}
     *  @param {string} externalId - id that has been chosen to identify the partnershipGroup during creation
     *  @returns {Promise.<IApiResponse>} Get information about a specific partnershipgroup based on its externalId (only Admin role)
     */
    getOne = (externalId: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(
                this.buildUrl(
                    true,
                    PartnershipGroup.urlPartnershipGroup,
                    externalId,
                ),
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
     * CREATE ONE | /partnership-group
     *  @param {PartnershipGroupModel} newPartnershipGroup - Admin Only (only shop can create a partnership group containing charities)
     *  @returns {Promise.<IApiResponse>} Get object with new partnershipGroup created. (only Admin role)
     */
    create = (
        newPartnershipGroup: PartnershipGroupModel,
    ): Promise<IApiResponse> => {
        const serializedPartnershipGroup = serialize(newPartnershipGroup);
        return this.axiosRequest
            .post(
                this.buildUrl(false, PartnershipGroup.urlPartnershipGroup),
                serializedPartnershipGroup,
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
     * UPDATE ONE | /partnership-group/{externalId}
     *  @param {object} updatedPartnershipGroup - Object containing one or more updated fields for partnershipGroup
     *  @param {string} externalId - id that has been chosen to identify the partnershipGroup during creation
     *  @returns {Promise.<IApiResponse>} Get object with partnershipGroup updated. (only Admin role)
     */
    update = (
        externalId: string,
        updatedPartnershipGroup: object,
    ): Promise<IApiResponse> => {
        return this.axiosRequest
            .put(
                this.buildUrl(
                    true,
                    PartnershipGroup.urlPartnershipGroup,
                    externalId,
                ),
                updatedPartnershipGroup,
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
     * DELETE ONE | /partnership-group/{externalId}
     *  @param {string} externalId - id that has been chosen to identify the partnershipGroup during creation, the pre-existing partnershipGroup with externalId 'default' cannot be deleted
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success. (only Admin role)
     */
    delete = (externalId: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .delete(
                this.buildUrl(
                    true,
                    PartnershipGroup.urlPartnershipGroup,
                    externalId,
                ),
            )
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'partnership group deleted successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}
