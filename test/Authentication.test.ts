require('dotenv').config('/.env');
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

test('it gets a refreshed token access to request Api', () => {
    if (process.env.SDK_ACCOUNTID)
        return sdk.authentication
            .refreshToken(process.env.SDK_ACCOUNTID)
            .then((data: any) => {
                expect(data.success).toBe(true);
                expect(data.dataInfo.access_token).toBeDefined;
            });
});