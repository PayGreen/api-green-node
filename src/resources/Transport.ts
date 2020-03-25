import axios from 'axios';
import { IApiResponse } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/** Transport Class with all methods to request infos about transport */
export class Transport extends MainBuilder {

    /**
     * GET ALL | /tree/ccarbon-transport
     * @returns {Promise.<IApiResponse>} Get a list of the different transports available inside the Api
     */
    getAll = (): Promise<IApiResponse> => {
        return axios
            .get(`${this.host}/tree/ccarbon-transport`, {
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
}