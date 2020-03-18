import { IConfig, IIdentity } from './interfaces';
import { Mode } from './enums/Mode'

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

    /**
     * * Mode of developement.
     * @param {Mode} Mode - enum of the different developement modes
     */
    public mode: Mode;

    constructor(config: IConfig, identity: IIdentity, mode?:Mode) {
        this.config = config;
        this.identity = identity;
        this.mode = mode || Mode.PROD;
    }
}