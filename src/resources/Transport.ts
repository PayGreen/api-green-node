import { IApiResponseList } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Transport Class with all methods to request infos about transport
 * @property {string} url - main url to build Api requests for this class
 */
export class Transport extends MainBuilder {
    static url: string = '/carbon/transportation-mode';

    /**
     * GET ALL | /carbon/transportation-mode
     * @returns {Promise.<IApiResponseList>} Get a list of the different transports available inside the Api
     */
    getAll = (): Promise<IApiResponseList> => {
        return this.axiosRequest
            .get(this.buildUrl(false, Transport.url))
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
