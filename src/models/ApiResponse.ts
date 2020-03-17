/** Api Response Model Class with all methods to format/select api responses */

import { IApiResponse } from '../interfaces';
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
     * IS SUCCESSFUL |
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isSuccessful = (data: any): boolean => {
        return data.status.toString().charAt(0) === '2' ? true : false;
    };

    /**
     * IS INVALID |
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isInvalid = (data: any): boolean => {
        return data.dataInfo.status.toString().charAt(0) === '4' ? true : false;
    };

    /**
     * CAUSED AN ERROR |
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static causedAnError = (data: any): boolean => {
        return data.dataInfo.status.toString().charAt(0) === '5' ? true : false;
    };

    /**
     * GET ERROR MESSAGE |
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static getErrorMessage = (data: any): string => {
        return data.dataInfo.detail;
    };

    /**
     * GET ERROR CODE |
     *  @param {any} data - response formatted from Api
     *  @returns {number} Get status of the http response
     */
    static getErrorCode = (data: any): number => {
        return data.dataInfo.status;
    };
}
