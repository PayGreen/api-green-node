import { Authentication, User } from './resources';
import { IConfig, IIdentity } from './interfaces';
import { Mode } from './enums/Mode';

/** The Sdk Main Class to make APIGreen Calls. */
export class Sdk {
    public user: User;
    public authentication: Authentication;

    private _identity: IIdentity = {
        accountId: '',
        userName: '',
        password: '',
    };

    private _config: IConfig = {
        token: '',
        refreshToken: '',
    };

    private _mode: Mode = Mode.PROD;

    /**
     * Create the user configuration.
     * @param {string} accountId - The name of the accountId.
     * @param {string} userName - The name of the userName.
     * @param {string} password - The user's password.
     * @param {Mode?} mode - Mode of production.
     */
    constructor(
        accountId: string | null,
        userName: string | null,
        password: string | null,
        mode?: Mode,
    ) {
        this._identity.accountId = accountId;
        this._identity.userName = userName;
        this._identity.password = password;
        this._mode = mode || Mode.PROD;
        this.user = new User(this._config, this._identity, this._mode);
        this.authentication = new Authentication(
            this._config,
            this._identity,
            this._mode,
        );
    }

    get accountId(): string | null {
        return this._identity.accountId;
    }

    set accountId(accountId: string | null) {
        this._identity.accountId = accountId;
    }

    get userName(): string | null {
        return this._identity.userName;
    }

    set userName(userName: string | null) {
        this._identity.userName = userName;
    }

    get password(): string | null {
        return this._identity.password;
    }

    set password(password: string | null) {
        this._identity.password = password;
    }

    get token(): string | null {
        return this._config.token;
    }

    set token(token: string | null) {
        this._config.token = token;
    }

    get refreshToken(): string | null {
        return this._config.refreshToken;
    }

    set refreshToken(refreshToken: string | null) {
        this._config.refreshToken = refreshToken;
    }

    get mode(): Mode {
        return this._mode;
    }

    set mode(mode: Mode) {
        this._mode = mode;
    }
}