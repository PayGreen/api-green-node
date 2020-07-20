import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';
import {
    TransportationFootprint,
    TransportationFootprintSimulation,
    WebFootprint,
    WebFootprintSimulation,
} from '../models';
import { Status } from '../enums';
import { serialize } from 'typescript-json-serializer';

/**
 * Carbon Class with all methods to request/modify carbon footprints infos
 * @property {string} url - url to build footprints Api requests for this class
 * @property {string} webUrl - url to simulate or add web data footprints for this class
 * @property {string} transportationUrl - url to simulate or add transportation data footprints for this class
 * @property {string} purchasesUrl - url to make purchases Api requests for this class
 */
export class Carbon extends MainBuilder {
    static url = '/carbon/footprints';
    static webUrl = '/carbon/web';
    static transportationUrl = '/carbon/transportation';
    static purchasesUrl = '/carbon/purchases';

    /**
     * ADD WEB FOOTPRINT | /carbon/web
     * @description - to create a web carbon footprint associated with a unique fingerprint and that will be saved in database
     * @param {WebFootprint} newWebFootprint - object containing all datas about the ongoing web carbon footprint WITH fingerprint - Only admin can add web footprint
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    addWebFootprint = async (
        newWebFootprint: WebFootprint,
    ): Promise<IApiResponse> => {
        if (!newWebFootprint.fingerprint) {
            return await this.ApiResponse.formatResponse(
                false,
                "you cannot add a web footprint without fingerprint in your web object, data won't be saved",
                400,
            );
        } else {
            const serializedWebFootprint = serialize(newWebFootprint);
            return this.axiosRequest
                .post(
                    this.buildUrl(false, Carbon.webUrl),
                    serializedWebFootprint,
                )
                .then((res) => {
                    return this.ApiResponse.formatResponse(
                        true,
                        res.data,
                        res.status,
                    );
                })
                .catch(this.ApiResponse.formatError);
        }
    };

    /**
     * SIMULATE WEB FOOTPRINT | /carbon/web
     * @description - to create a web carbon footprint WITHOUT fingerprint and get an estimation that will NOT be saved in database
     * @param {WebFootprintSimulation} newWebFootprintSimulation - object containing all datas about the ongoing web carbon footprint WITHOUT fingerprint - Only admin can add simulation web footprint
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    simulateWebFootprint = (
        newWebFootprintSimulation: WebFootprintSimulation,
    ): Promise<IApiResponse> => {
        const serializedWebFootprintSimulation = serialize(
            newWebFootprintSimulation,
        );
        return this.axiosRequest
            .post(
                this.buildUrl(false, Carbon.webUrl),
                serializedWebFootprintSimulation,
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
     * ADD TRANSPORTATION FOOTPRINT | /carbon/transportation
     * @description - to create a transportation carbon footprint associated with a unique fingerprint and that will be saved in database
     * @param {TransportationFootprint} newTransportationFootprint - object containing all datas about the ongoing transportation carbon footprint WITH fingerprint - Only admin can add transportation footprint
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    addTransportationFootprint = async (
        newTransportationFootprint: TransportationFootprint,
    ): Promise<IApiResponse> => {
        if (!newTransportationFootprint.fingerprint) {
            return await this.ApiResponse.formatResponse(
                false,
                "you cannot add a transportation footprint without fingerprint in your transportation object, data won't be saved",
                400,
            );
        } else {
            const serializedTransportationFootprint = serialize(
                newTransportationFootprint,
            );
            return this.axiosRequest
                .post(
                    this.buildUrl(false, Carbon.transportationUrl),
                    serializedTransportationFootprint,
                )
                .then((res) => {
                    return this.ApiResponse.formatResponse(
                        true,
                        res.data,
                        res.status,
                    );
                })
                .catch(this.ApiResponse.formatError);
        }
    };

    /**
     * SIMULATE TRANSPORTATION FOOTPRINT | /carbon/transportation
     * @description - to create a transportation carbon footprint WITHOUT fingerprint and get an estimation that will NOT be saved in database
     * @param {TransportationFootprintSimulation} newTransportationFootprintSimulation - object containing all datas about the ongoing transportation carbon footprint WITHOUT fingerprint - Only admin can add transportation simulation footprint
     * @returns {Promise.<IApiResponse>} - get object with new carbon cost estimated.
     */
    simulateTransportationFootprint = (
        newTransportationFootprintSimulation: TransportationFootprintSimulation,
    ): Promise<IApiResponse> => {
        const serializedTransportationFootprintSimulation = serialize(
            newTransportationFootprintSimulation,
        );
        return this.axiosRequest
            .post(
                this.buildUrl(false, Carbon.transportationUrl),
                serializedTransportationFootprintSimulation,
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

    /**
     * GET ONE PURCHASE | /carbon/purchases/{fingerprint}
     * @param {string} fingerPrint - an unique name to identify each carbon footprint
     * @returns {Promise.<IApiResponse>} - get information about one specific carbon footprint with status 'PURCHASED'
     */
    getOnePurchase = (fingerPrint: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Carbon.purchasesUrl, fingerPrint))
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
     * GET ALL PURCHASES | /carbon/purchases/
     * @returns {Promise.<IApiResponse>} - get all carbon footprints associated to fingerprint with status 'PURCHASED'
     */
    getAllPurchases = (status: Status): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(false, Carbon.purchasesUrl))
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
