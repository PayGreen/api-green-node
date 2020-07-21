import {
    Authentication,
    Carbon,
    Iban,
    Transport,
    User,
    CarbonReports,
} from './resources';
import { IConfig, IIdentity, ITokens } from './interfaces';
import { Host, Mode } from './enums';

/** The Sdk Main Class to make APIGreen Calls. */
export class Sdk {
    public authentication: Authentication;
    public iban: Iban;
    public transport: Transport;
    public user: User;
    public carbon: Carbon;
    public carbonReports: CarbonReports;

    private _identity: IIdentity = {
        accountId: '',
    };

    private _tokens: ITokens = {
        token: '',
        refreshToken: '',
    };

    private _mode: Mode;

    private _host: string;

    /**
     * Create the user configuration.
     * @param {IConfig?} configObject -
     */
    constructor(configObject?: IConfig) {
        if (configObject?.token) {
            this._tokens.token = configObject.token;
        }
        if (configObject?.refreshToken) {
            this._tokens.refreshToken = configObject.refreshToken;
        }
        if (
            (configObject?.mode == Mode.DEV ||
                configObject?.mode == Mode.PREPROD) &&
            configObject?.host != null
        ) {
            this._host = configObject.host;
            this._mode = configObject.mode;
        } else if (configObject?.mode != null && configObject?.host == null) {
            this._mode = configObject.mode;
            this._host = Host[Mode[configObject.mode]];
        } else {
            this._mode = Mode.PROD;
            this._host = Host[Mode[Mode.PROD]];
        }
        this.user = new User(this._tokens, this._identity, this._host);
        this.authentication = new Authentication(
            this._tokens,
            this._identity,
            this._host,
        );
        this.iban = new Iban(this._tokens, this._identity, this._host);
        this.transport = new Transport(
            this._tokens,
            this._identity,
            this._host,
        );
        this.carbon = new Carbon(this._tokens, this._identity, this._host);
        this.carbonReports = new CarbonReports(
            this._tokens,
            this._identity,
            this._host,
        );
    }

    get accountId(): string | null {
        return this._identity.accountId;
    }

    set accountId(accountId: string | null) {
        this._identity.accountId = accountId;
    }

    get token(): string | null {
        return this._tokens.token;
    }

    set token(token: string | null) {
        this._tokens.token = token;
    }

    get refreshToken(): string | null {
        return this._tokens.refreshToken;
    }

    set refreshToken(refreshToken: string | null) {
        this._tokens.refreshToken = refreshToken;
    }

    get mode(): Mode {
        return this._mode;
    }

    set mode(mode: Mode) {
        this._mode = mode;
    }

    get host(): string {
        return this._host;
    }

    set host(host: string) {
        this._host = host;
    }
}