require('dotenv').config('/.env');
import { ApiResponse } from '../src/models/ApiResponse';
import { Mode } from '../src/enums';
import { Sdk } from '../src';

const sdk = new Sdk();

test('it gets a token access to request Api', () => {
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

const sdk2 = new Sdk(config);

test('it gets a refreshed token access to request Api each time the refreshtoken() method is used', () => {
    if (process.env.SDK_ACCOUNTID) {
        return sdk2.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(true);
                expect(data.dataInfo.access_token).toBeDefined;
            });
    }
    if (process.env.SDK_ACCOUNTID) {
        return sdk2.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(true);
                expect(data.dataInfo.access_token).toBeDefined;
            });
    }
});

const wrongConfig = {
    token: 'wrong token',
    refreshToken: 'wrong refresh token',
    mode: Mode.DEV,
};

const sdk3 = new Sdk(wrongConfig);

test('it gets an error when trying to refresh with a wrong token', () => {
    if (process.env.SDK_ACCOUNTID) {
        return sdk3.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(false);
                expect(ApiResponse.isInvalid(data)).toBe(true);
            });
    }
});