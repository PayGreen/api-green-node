import { IConfig, IIdentity } from './interfaces';

/** Main Builder with config constructor */
export class MainBuilder {
    /**
     * Stock the identity.
     * @param {object} identity - identity inherited from SDK class to authorize access to API and build url:
     * */
    public identity: IIdentity;

    /**
     * * Create the configuration.
     * @param {object} config - configuration inherited from SDK class to authorize access to API and build url:
     */
    public config: IConfig;

    constructor(config: IConfig, identity: IIdentity) {
        this.config = config;
        this.identity = identity;
    }
}
