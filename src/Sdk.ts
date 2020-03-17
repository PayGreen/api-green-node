import { User } from './resources/User';
import { IConfig, IIdentity } from './interfaces';

/** The Sdk Main Class to make APIGreen Calls. */
export class Sdk {
    public user: User;

    private identity: IIdentity = {
        accountId: '',
        userName: '',
    };

    private config: IConfig = {
        host: 'http://localhost',
        token: '',
    };

    /**
     * Create the user configuration.
     * @param {string} accountId - The name of the accountId.
     * @param {string} userName - The name of the userName.
     * @param {string} tokenValue - The token to access API.
     */
    constructor(
        accountId: string | null,
        userName: string | null,
        tokenValue: string | null,
    ) {
        this.identity.accountId = accountId;
        this.identity.userName = userName;
        this.config.token = tokenValue;
        this.user = new User(this.config, this.identity);
    }

    get accountId(): string | null {
        return this.identity.accountId;
    }

    set accountId(accountId: string | null) {
        this.identity.accountId = accountId;
    }

    get userName(): string | null {
        return this.identity.userName;
    }

    set userName(userName: string | null) {
        this.identity.userName = userName;
    }

    get token(): string | null {
        return this.config.token;
    }

    set token(token: string | null) {
        this.config.token = token;
    }
}
