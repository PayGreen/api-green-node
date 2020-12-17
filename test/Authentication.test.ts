require('dotenv').config('/.env');
import { autoLocaleConfig } from './config/autoConfig';
import { ApiResponse } from '../src/models/ApiResponse';
import { Host, Mode, UserType } from '../src/enums';
import { Sdk } from '../src';

// we fix types issues with .env variables by type casting them as strings.
const shopUsername: string = process.env.SDK_SHOP_USERNAME as string;
const shopPassword: string = process.env.SDK_SHOP_PASSWORD as string;
const shopAccountId: string = process.env.SDK_SHOP_ACCOUNTID as string;

test('it gets a token access to request Api with prefilled host inside Sdk based on RECETTE mode', () => {
    const config = {
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
    };
    const sdk = new Sdk(config);

    return sdk.authentication
        .login(shopUsername, shopPassword, shopAccountId)
        .then((data: any) => {
            expect(data.success).toBe(true);
            expect(data.dataInfo.access_token).toBeDefined;
            expect(data.dataInfo.refresh_token).toBeDefined;
            process.env.SDK_HOST
                ? expect(sdk.host).toBe(process.env.SDK_HOST)
                : expect(sdk.host).toBe(Host[Mode[Mode.PROD]]);
        });
});

test('it overwrites the predefined host with new host in config object', () => {
    const config = {
        mode: Mode.SANDBOX,
        host: 'http//newhost',
    };
    const sdk = new Sdk(config);
    expect(sdk.host).toBe('http//newhost');
});

test('it defines the correct host with only mode defined in config object', () => {
    const config = {
        mode: Mode.PROD,
    };
    const sdk = new Sdk(config);
    expect(sdk.host).toBe(Host[Mode[Mode.PROD]]);
});

test('it defines host and mode by default to SANDBOX without any parameter', () => {
    const sdk = new Sdk();
    expect(sdk.host).toBe(Host[Mode[Mode.SANDBOX]]);
    expect(sdk.mode).toBe(Mode.SANDBOX);
});

test('it gets a refreshed token each time the refreshtoken() method is used and if token/refresh token are valid, else it renews all tokens with login()', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.authentication.refreshToken(shopAccountId).then((data: any) => {
        if (data.success === true) {
            expect(data.success).toBe(true);
            expect(data.dataInfo.access_token).toBeDefined;
            if (shopAccountId) {
                return sdk.authentication
                    .refreshToken(shopAccountId)
                    .then((data: any) => {
                        expect(data.success).toBe(true);
                        expect(data.dataInfo.access_token).toBeDefined;
                    });
            }
        } else {
            const sdkRefreshed = new Sdk({
                mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
                host: process.env.SDK_HOST || null,
            });

            return sdkRefreshed.authentication
                .login(shopUsername, shopPassword, shopAccountId)
                .then(() => {
                    return sdkRefreshed.authentication
                        .refreshToken(shopAccountId)
                        .then((data: any) => {
                            expect(data.success).toBe(true);
                            expect(data.dataInfo.access_token).toBeDefined;
                            if (shopAccountId) {
                                return sdkRefreshed.authentication
                                    .refreshToken(shopAccountId)
                                    .then((data: any) => {
                                        expect(data.success).toBe(true);
                                        expect(data.dataInfo.access_token)
                                            .toBeDefined;
                                    });
                            }
                        });
                });
        }
    });
});

test('it gets an error when trying to refresh with a wrong token', () => {
    const wrongConfig = {
        token: 'wrong token',
        refreshToken: 'wrong refresh token',
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
    };
    const sdk = new Sdk(wrongConfig);

    return sdk.authentication.refreshToken(shopAccountId).then((data: any) => {
        expect(data.success).toBe(false);
        expect(ApiResponse.isInvalid(data)).toBe(true);
    });
});
