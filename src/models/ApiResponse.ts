import { IApiResponse, IApiResponseList } from '../interfaces';
import { Identifier } from '../enums/Identifier';

/** Api Response Model Class with all methods to format/select api responses */
export class ApiResponse {
    /**
     *  GLOBAL RESPONSE FORMAT METHOD |
     *  @description - normalize all Api Responses for better readibility
     *  @param {boolean} success - for success or fail of the request
     *  @param {any} data - response of the answer from Api
     *  @param {number} status - http response status number
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
     *  @description - format specific error response from Api
     *  @param {any} error- error received from Api
     *  @returns {IApiResponse} - global object with complete response formatted
     */
    static formatError = (error: any): IApiResponse => {
        if (error.response?.data) {
            return ApiResponse.formatResponse(
                false,
                error.response.data,
                error.response.data.status,
            );
        } else if (error.response) {
            return ApiResponse.formatResponse(
                false,
                error.response.statusText,
                error.response.status,
            );
        } else {
            return ApiResponse.formatResponse(false, error.message, 500);
        }
    };

    /**
     * IS SUCCESSFUL
     *  @description - verify if http response format = 2xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isSuccessful = (data: any): boolean => {
        return ApiResponse.getStatus(data).toString().charAt(0) === '2';
    };

    /**
     * IS INVALID
     *  @description verify if http response format = 4xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static isInvalid = (data: any): boolean => {
        return ApiResponse.getStatus(data).toString().charAt(0) === '4';
    };

    /**
     * CAUSED AN ERROR
     *  @description - verify if http response format = 5xx
     *  @param {any} data - response formatted from Api
     *  @returns {boolean}
     */
    static causedAnError = (data: any): boolean => {
        return ApiResponse.getStatus(data).toString().charAt(0) === '5';
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
        return data.status;
    };

    /**
     * FILTER API RESPONSE |
     *  @description - hide confidential/useless data in Api response
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

    /**
     * GET ID IN RESPONSE |
     *  @description - to access quickly to the identifier of the data received
     *  @param {IApiResponse} data - response from API
     *  @returns {object} - object with the identifier name and its corresponding value
     */
    static getId = (data: IApiResponse): object => {
        let idKeys = Object.values(Identifier).toString();
        const idItem = {};
        for (let key in data.dataInfo) {
            if (idKeys.includes(key)) {
                idItem[key] = data.dataInfo[key];
            }
        }
        return idItem;
    };

    /**
     * GET ID LIST IN RESPONSE |
     *  @description - to access quickly to the list of identifiers of the data received
     *  @param {IApiResponseList} data - response from API
     *  @returns {object[]} - an array of objects with each identifier name and its value
     */
    static getIdList = (data: IApiResponseList): object[] => {
        let idKeys = Object.keys(Identifier);
        const idArray: object[] = [];
        for (let key in data.dataInfo._embedded) {
            if (idKeys.includes(key)) {
                const newIdObject = {};
                const keyName = Identifier[key];
                data.dataInfo._embedded[key].map((value) => {
                    newIdObject[keyName] = value[keyName];
                    idArray.push({ ...newIdObject });
                });
            }
        }
        return idArray;
    };
}
