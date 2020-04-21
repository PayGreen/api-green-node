require('dotenv').config('/.env');
import { ApiResponse } from '../src/models/ApiResponse';
import { Mode } from '../src/enums';
import { Sdk } from '../src';

test('it gets a token access to request Api', () => {
    const sdk = new Sdk();
    if (
        process.env.SDK_ACCOUNTID &&
        process.env.SDK_USERNAME &&
        process.env.SDK_PASSWORD
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
            });
});

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};
test('it gets a refreshed token each time the refreshtoken() method is used and if token/refresh token are valid, else it renews all tokens with login()', () => {
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