import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import { PathEstimate, WebEstimate } from '../models';
import { serialize } from 'typescript-json-serializer';

/** Carbon Class with all methods to request/modify carbon estimates infos */
export class Carbon extends MainBuilder {
    /**
     * ADD WEB ESTIMATE | /tree/ccarbon
     *  @param {WebEstimate} newEstimate - object containing all datas about the ongoing web carbon offsetting estimate
     *  @returns {Promise.<IApiResponse>} Get object with new carbon cost estimated.
     */
    addWebEstimate = (newEstimate: WebEstimate): Promise<IApiResponse> => {
        const serializedEstimate = serialize(newEstimate);
        return axios
            .post(`${this.host}/tree/ccarbon`, serializedEstimate, {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
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
     *  @param {PathEstimate} newEstimate - object containing all datas about the ongoing path carbon offsetting estimate
     *  @returns {Promise.<IApiResponse>} Get object with new carbon cost estimated.
     */
    addPathEstimate = (newEstimate: PathEstimate): Promise<IApiResponse> => {
        const serializedEstimate = serialize(newEstimate);
        return axios
            .post(`${this.host}/tree/ccarbon`, serializedEstimate, {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
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
     *  @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     *  @returns {Promise.<IApiResponse>} Get information about the ongoing carbon offsetting estimate
     */
    getEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return axios
            .get(`${this.host}/tree/ccarbon/${fingerPrint}`, {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
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
     *  @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    completeEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return axios
            .patch(
                `${this.host}/tree/ccarbon/${fingerPrint}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${this.tokens.token}`,
                    },
                },
            )
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
     *  @param {string} fingerPrint - an unique name to identify each carbon offsetting estimate
     *  @returns {Promise.<IApiResponse>} Get response with status 204 if success.
     */
    deleteEstimate = (fingerPrint: string): Promise<IApiResponse> => {
        return axios
            .delete(`${this.host}/tree/ccarbon/${fingerPrint}`, {
                headers: {
                    Authorization: `Bearer ${this.tokens.token}`,
                },
            })
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