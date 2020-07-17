import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { PathEstimate, WebEstimate } from '../models';
import { Status } from '../enums';
import { serialize } from 'typescript-json-serializer';

/**
 * Carbon Class with all methods to request/modify carbon footprints infos
 * @property {string} url - main url to build Api requests for this class
 */
export class Carbon extends MainBuilder {
    // we keep both urls temporarily until all methods are updated
    static url = '/carbon/footprints';
    static legacyUrl = '/tree/ccarbon';

    /**
     * ADD WEB ESTIMATE | /tree/ccarbon
     * @param {WebEstimate} newEstimate - object containing all datas about the ongoing web carbon offsetting estimate - Only admin can add web estimate
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    addWebEstimate = (newEstimate: WebEstimate): Promise<IApiResponse> => {
        const serializedEstimate = serialize(newEstimate);
        return this.axiosRequest
            .post(this.buildUrl(false, Carbon.legacyUrl), serializedEstimate)
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'web estimate added successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * ADD PATH ESTIMATE | /tree/ccarbon
     * @param {PathEstimate} newEstimate - object containing all datas about the ongoing path carbon offsetting estimate - Only admin can add path estimate
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    addPathEstimate = (newEstimate: PathEstimate): Promise<IApiResponse> => {
        const serializedEstimate = serialize(newEstimate);
        return this.axiosRequest
            .post(this.buildUrl(false, Carbon.legacyUrl), serializedEstimate)
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'path estimate added successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * GET ONE FOOTPRINT | /carbon/footprints/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon footprint
     * @returns {Promise.<IApiResponse>} - get information about the ongoing carbon footprint
     */
    getOneFootprint = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Carbon.url, fingerPrint))
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
     * GET ALL FOOTPRINTS | /carbon/footprints?status={Status}
     * @param {Status} status - status of the carbon footprint - based on enum
     * @returns {Promise.<IApiResponse>} - get all carbon footprints associated to fingerprint and filtered by status
     */
    getAllFootprints = (status: Status): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(false, Carbon.url) + '?status=' + Status[status])
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
     * CLOSE FOOTPRINT | /carbon/footprints/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon footprint
     * @returns {Promise.<IApiResponse>} - get response with status 200 if success, the carbon footprint is closed and cannot be modified or purchased anymore.
     */
    closeFootprint = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .patch(this.buildUrl(true, Carbon.url, fingerPrint), {
                status: 'CLOSED',
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
     * PURCHASE FOOTPRINT | /carbon/footprints/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon footprint
     * @returns {Promise.<IApiResponse>} - get response with status 200 if success, the carbon footprint is purchased.
     */
    purchaseFootprint = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .patch(this.buildUrl(true, Carbon.url, fingerPrint), {
                status: 'PURCHASED',
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
     * EMPTY FOOTPRINT | /carbon/footprints/{fingerprint}
     * @description - this method removes all carbon footprint calculations associated with a specific fingerprint, but the fingerprint still exists and can be used again to add new data.
     * @param {string} fingerPrint - an unique name to identify each carbon footprint
     * @returns {Promise.<IApiResponse>} - get response with status 204 if success, only ongoing footprint can be emptied.
     */
    emptyFootprint = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .delete(this.buildUrl(true, Carbon.url, fingerPrint))
            .then((res) => {
                return this.ApiResponse.formatResponse(
                    true,
                    'carbon footprint emptied successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}
