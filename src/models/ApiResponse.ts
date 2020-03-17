/** Api Response Model Class with all methods to display api responses */

import { IApiResponse } from '../interfaces';
export class ApiResponse {
    /**
     *  GLOBAL RESPONSE FORMATMETHOD |
     *  @param {boolean} boolean - for success or fail of the request
     *  @param {any} data - response of the answer from Api
     *  @returns {IApiResponse} - global object with complete response formatted
     */
    static formatResponse = (success: boolean, data: any): IApiResponse => {
        let objectResponse = {
            success: success,
            dataInfo: data,
        };
        return objectResponse;
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
                error.response.status + ' ' + error.response.statusText,
            );
        }
    };
}
