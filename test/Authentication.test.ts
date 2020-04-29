require('dotenv').config('/.env');
import { ApiResponse } from '../src/models/ApiResponse';
import { Host, Mode } from '../src/enums';
import { Sdk } from '../src';

test('it gets a token access to request Api with prefilled host inside Sdk based on DEV mode', () => {
    const config = {
        mode: Mode.DEV,
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
                expect(sdk.host).toBe(Host[Mode[Mode.DEV]]);
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
    const config = {
        token: process.env.SDK_TOKEN,
        refreshToken: process.env.SDK_REFRESHTOKEN,
        mode: Mode.DEV,
    };
    if (process.env.SDK_ACCOUNTID) {
        const sdk = new Sdk(config);
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
                    const sdk = new Sdk();
                    if (
                        process.env.SDK_ACCOUNTID &&
                        process.env.SDK_USERNAME &&
                        process.env.SDK_PASSWORD
                    ) {
                        return sdk.authentication
                            .login(
                                process.env.SDK_USERNAME,
                                process.env.SDK_PASSWORD,
                                process.env.SDK_ACCOUNTID,
                            )
                            .then(() => {
                                if (process.env.SDK_ACCOUNTID) {
                                    return sdk.authentication
                                        .refreshToken(process.env.SDK_ACCOUNTID)
                                        .then((data: any) => {
                                            expect(data.success).toBe(true);
                                            expect(data.dataInfo.access_token)
                                                .toBeDefined;
                                            if (process.env.SDK_ACCOUNTID) {
                                                return sdk.authentication
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

const wrongConfig = {
    token: 'wrong token',
    refreshToken: 'wrong refresh token',
    mode: Mode.DEV,
};

test('it gets an error when trying to refresh with a wrong token', () => {
    const sdk3 = new Sdk(wrongConfig);
    if (process.env.SDK_ACCOUNTID) {
        return sdk3.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(false);
                expect(ApiResponse.isInvalid(data)).toBe(true);
            });
    }
});