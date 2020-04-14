import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { PathEstimate, WebEstimate } from '../models';
import { serialize } from 'typescript-json-serializer';

/**
 * Carbon Class with all methods to request/modify carbon estimates infos
 * @property {string} url - main url to build Api requests for this class
 */
export class Carbon extends MainBuilder {
    static url = '/tree/ccarbon';

    /**
     * ADD WEB ESTIMATE | /tree/ccarbon
     * @param {WebEstimate} newEstimate - object containing all datas about the ongoing web carbon offsetting estimate - Only admin can add web estimate
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    addWebEstimate = (newEstimate: WebEstimate): Promise<IApiResponse> => {
        const serializedEstimate = serialize(newEstimate);
        return this.axiosRequest
            .post(this.buildUrl(false, Carbon.url), serializedEstimate)
            .then(res => {
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
            .post(this.buildUrl(false, Carbon.url), serializedEstimate)
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    'path estimate added successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * GET ESTIMATE | /tree/ccarbon/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     * @returns {Promise.<IApiResponse>} - get information about the ongoing carbon offsetting estimate
     */
    getEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Carbon.url, fingerPrint))
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
     * COMPLETE ESTIMATE | /tree/ccarbon/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     * @returns {Promise.<IApiResponse>} - get response with status 204 if success, the carbon estimate is validated.
     */
    completeEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .patch(this.buildUrl(true, Carbon.url, fingerPrint), {})
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    'carbon estimate completed successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };

    /**
     * DELETE ESTIMATE | /tree/ccarbon/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     * @returns {Promise.<IApiResponse>} - get response with status 204 if success, only ongoing estimate
     *  can be deleted.
     */
    deleteEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .delete(this.buildUrl(true, Carbon.url, fingerPrint))
            .then(res => {
                return this.ApiResponse.formatResponse(
                    true,
                    'carbon estimate deleted successfully',
                    res.status,
                );
            })
            .catch(this.ApiResponse.formatError);
    };
}