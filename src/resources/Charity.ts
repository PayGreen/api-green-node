import { IApiResponse, IApiResponseList } from '../interfaces';
import { MainBuilder } from '../MainBuilder';

/**
 * Charity Class with all methods to request/modify charity infos
 * @property {string} urlCharity -  url to build Api requests for charity info in this class
 */
export class Charity extends MainBuilder {
    static urlCharity: string = '/association';

    /**
     * GET ALL | /association
     * @returns {Promise.<IApiResponseList>} - Get a list of all the charities only Admin ('Association' role do not have access to others charities/associations informations)
     */
    getAll = (): Promise<IApiResponseList> => {
        return this.axiosRequest
            .get(this.buildUrl(false, Charity.urlCharity))
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
     * GET ONE | /association/{idAssociation}
     *  @param {string} idAssociation -
     *  @returns {Promise.<IApiResponse>} Get information about a charity/association based on id
     *  @description This method will be improved after API update to have the possibility to request with idAssociation or "me"  as optional parameters 
     */
    getOne = (idAssociation: string): Promise<IApiResponse> => {
        return this.axiosRequest
            .get(this.buildUrl(true, Charity.urlCharity, idAssociation))
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
     * UPDATE ONE | /association/{idAssociation}
     *  @param {object} updatedCharity - Object containing one or more updated fields for charity/association
     *  @param {string} idAssociation -
     *  @returns {Promise.<IApiResponse>} Get object with new data updated. Only association role can update a charity. 
     */
    update = (
        updatedCharity: object,
        idAssociation: string,
    ): Promise<IApiResponse> => {
        return this.axiosRequest
            .put(
                this.buildUrl(true, Charity.urlCharity, idAssociation),
                updatedCharity,
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
}
