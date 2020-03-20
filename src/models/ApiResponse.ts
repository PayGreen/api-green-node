import { IApiResponse } from '../interfaces';

/** Api Response Model Class with all methods to format/select api responses */
export class ApiResponse {
    /**
     *  GLOBAL RESPONSE FORMATMETHOD |
     *  @param {boolean} boolean - for success or fail of the request
     *  @param {any} data - response of the answer from Api
     *  @returns {IApiResponse} - global object with complete response formatted
     */
    static formatResponse = (
        success: boolean,
        data: any,
        status?: number,
    ): IApiResponse => {
        let objectResponse = {
            success: success,
            dataInfo: data,
            status: status,
        };
        let objectError = {
            success: success,
            dataInfo: data,
        };
        return status ? objectResponse : objectError;
    };

    /**
     * ERROR RESPONSE MODEL |
     *  @param {any} error- error received from Api
     *  @returns {IApiResponse} - global object with complete response formatted
     */
    static formatError = (error: any): IApiResponse => {
        if (error.response.data) {
            return ApiResponse.formatResponse(false, error.response.data);
        } else {
            return ApiResponse.formatResponse(
                false,
                error.response.statusText,
                error.response.status,
            );
        }
    };

    /**
     * IS SUCCESSFUL | verify if http response format = 2xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isSuccessful = (data: any): boolean => {
        return (
            ApiResponse.getStatus(data)
                .toString()
                .charAt(0) === '2'
        );
    };

    /**
     * IS INVALID | verify if http response format = 4xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isInvalid = (data: any): boolean => {
        return (
            ApiResponse.getStatus(data)
                .toString()
                .charAt(0) === '4'
        );
    };

    /**
     * CAUSED AN ERROR | verify if http response format = 5xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static causedAnError = (data: any): boolean => {
        return (
            ApiResponse.getStatus(data)
                .toString()
                .charAt(0) === '5'
        );
    };

    /**
     * GET ERROR MESSAGE |
     *  @param {any} data - response formatted from Api
     *  @returns {string} - error message details
     */
    static getErrorMessage = (data: any): string => {
        return data.dataInfo.detail ? data.dataInfo.detail : data.dataInfo;
    };

    /**
     * GET STATUS |
     *  @param {any} data - response formatted from Api
     *  @returns {number} Get status of the http response
     */
    static getStatus = (data: any): number => {
        return data.dataInfo.status ? data.dataInfo.status : data.status;
    };

    /**
     * FILTER API RESPONSE |
     *  @param {any} enumKeys - enum with list of informations we want to return from Api response
     *  @param {any} response - object containing the Api response
     *  @returns {any} the new object filtered
     */
    static filterResponse = (enumKeys: any, response: any): any => {
        const newResponse = {};
        let newKeys = Object.keys(enumKeys);
        for (let key in response) {
            if (newKeys.includes(key)) {
                newResponse[key] = response[key];
            }
        }
        return newResponse;
    };
}