require('dotenv').config('/.env');
import { Sdk } from '../src';

if (process.env.SDK_ACCOUNTID && process.env.SDK_USERNAME && process.env.SDK_TOKEN) {
    const sdk = new Sdk(
        process.env.SDK_ACCOUNTID,
        process.env.SDK_USERNAME,
        process.env.SDK_TOKEN,
    );

    test('Sdk has properties config & identity', () => {
        expect(sdk).toHaveProperty('config');
        expect(sdk).toHaveProperty('identity');
    });

    test('Sdk constructor initializes correctly with the parameters', () => {
        expect(sdk.accountId).toBe(process.env.SDK_ACCOUNTID);
        expect(sdk.userName).toBe(process.env.SDK_USERNAME);
        expect(sdk.token).toBe(process.env.SDK_TOKEN);
    });
}
