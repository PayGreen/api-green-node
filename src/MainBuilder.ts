import { ITokens, IIdentity } from './interfaces';
import { ApiResponse } from './models';

/** Main Builder with config constructor */
export class MainBuilder {
    /**
     * Stock the identity.
     * @param {object} identity - identity inherited from SDK class to authorize access to API and build url:
     * */
    public identity: IIdentity;

    /**
     * * Create the configurationtokens.
     * @param {object} tokens - tokens inherited from SDK class to authorize access to API and build url:
     */
    public tokens: ITokens;

    /**
     * * Mode of production.
     * @param {string} host - host of Api inherited from SDK class based on production mode
     */
    public host: string;

    /**
     * * Class ApiResponse.
     * @type {ApiResponse}
     */
    public ApiResponse: any = ApiResponse;

    constructor(tokens: ITokens, identity: IIdentity, host: string) {
        this.tokens = tokens;
        this.identity = identity;
        this.host = host;
        this.ApiResponse;
    }
}