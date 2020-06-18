require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { ApiResponse } from '../src/models/ApiResponse';
import { Host, Mode } from '../src/enums';
import { Sdk } from '../src';

test('it gets a token access to request Api with prefilled host inside Sdk based on DEV mode', () => {
    const config = {
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
    };
    const sdk = new Sdk(config);
    if (
        process.env.SDK_USERNAME &&
        process.env.SDK_PASSWORD &&
        process.env.SDK_ACCOUNTID
    )
        return sdk.authentication
            .login(
                process.env.SDK_USERNAME,
                process.env.SDK_PASSWORD,
                process.env.SDK_ACCOUNTID,
            )
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
        mode: Mode.PREPROD,
        host: 'http//newhost',
    };
    const sdk = new Sdk(config);
    expect(sdk.host).toBe('http//newhost');
});

test("it doesn't overwrite the predefined host in sdk even with new host in config object if mode is PROD", () => {
    const config = {
        mode: Mode.PROD,
        host: 'http//newhost',
    };
    const sdk = new Sdk(config);
    expect(sdk.host).toBe(Host[Mode[Mode.PROD]]);
});

test('it defines host and mode by default to PROD without any parameter', () => {
    const sdk = new Sdk();
    expect(sdk.host).toBe(Host[Mode[Mode.PROD]]);
    expect(sdk.mode).toBe(Mode.PROD);
});

test('it gets a refreshed token each time the refreshtoken() method is used and if token/refresh token are valid, else it renews all tokens with login()', () => {
    if (process.env.SDK_ACCOUNTID) {
        const sdk = new Sdk(localConfig);
        return sdk.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                if (data.success === true) {
                    expect(data.success).toBe(true);
                    expect(data.dataInfo.access_token).toBeDefined;
                    if (process.env.SDK_ACCOUNTID) {
                        return sdk.authentication
                            .refreshToken(process.env.SDK_ACCOUNTID)
                            .then((data: any) => {
                                expect(data.success).toBe(true);
                                expect(data.dataInfo.access_token).toBeDefined;
                            });
                    }
                } else {
                    const sdkRefreshed = new Sdk({
                        mode: process.env.SDK_MODE
                            ? Mode[process.env.SDK_MODE]
                            : null,
                        host: process.env.SDK_HOST || null,
                    });
                    if (
                        process.env.SDK_ACCOUNTID &&
                        process.env.SDK_USERNAME &&
                        process.env.SDK_PASSWORD
                    ) {
                        return sdkRefreshed.authentication
                            .login(
                                process.env.SDK_USERNAME,
                                process.env.SDK_PASSWORD,
                                process.env.SDK_ACCOUNTID,
                            )
                            .then(() => {
                                if (process.env.SDK_ACCOUNTID) {
                                    return sdkRefreshed.authentication
                                        .refreshToken(process.env.SDK_ACCOUNTID)
                                        .then((data: any) => {
                                            expect(data.success).toBe(true);
                                            expect(data.dataInfo.access_token)
                                                .toBeDefined;
                                            if (process.env.SDK_ACCOUNTID) {
                                                return sdkRefreshed.authentication
                                                    .refreshToken(
                                                        process.env
                                                            .SDK_ACCOUNTID,
                                                    )
                                                    .then((data: any) => {
                                                        expect(
                                                            data.success,
                                                        ).toBe(true);
                                                        expect(
                                                            data.dataInfo
                                                                .access_token,
                                                        ).toBeDefined;
                                                    });
                                            }
                                        });
                                }
                            });
                    }
                }
            });
    }
});

test('it gets an error when trying to refresh with a wrong token', () => {
    const wrongConfig = {
        token: 'wrong token',
        refreshToken: 'wrong refresh token',
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
    };
    const sdk = new Sdk(wrongConfig);
    if (process.env.SDK_ACCOUNTID) {
        return sdk.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(false);
                expect(ApiResponse.isInvalid(data)).toBe(true);
            });
    }
});
