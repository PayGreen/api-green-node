require('dotenv').config('/.env');
import { Mode, UserType } from '../../src/enums';
import { IConfig } from '../../src/interfaces';
import { Sdk } from '../../src';

/**
 * AUTOCONFIG
 * @description - to auto generate a config object to instanciate sdk
 * @param {UserType} type - enum containing user type for login ('SHOP' or 'CHARITY')
 * @returns {Promise.<IConfig>} - get object with all infos for login with sdk
 */
const autoConfig = (type: UserType): Promise<IConfig> => {
    // we call each variable from .env dynamically based on type
    const envUsername = `SDK_${type}_USERNAME`;
    const envPassword = `SDK_${type}_PASSWORD`;
    const envAccountId = `SDK_${type}_ACCOUNTID`;

    // we fix types issues with .env variables by type casting them as strings.
    const username: string = process.env[envUsername] as string;
    const password: string = process.env[envPassword] as string;
    const accountId: string = process.env[envAccountId] as string;

    const config = {
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
        token: '',
        refreshToken: '',
    };
    const sdk = new Sdk(config);

    return sdk.authentication
        .login(username, password, accountId)
        .then((data: any) => {
            config.token = data.dataInfo.access_token;
            config.refreshToken = data.dataInfo.refresh_token;
            return config;
        });
};

export default autoConfig;
