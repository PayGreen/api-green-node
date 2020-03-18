require('dotenv').config('/.env');
import { Sdk } from '../src';
import { Mode } from '../src/enums/Mode';

if (
    process.env.SDK_ACCOUNTID &&
    process.env.SDK_USERNAME &&
    process.env.SDK_PASSWORD
) {
    const sdk = new Sdk(
        process.env.SDK_ACCOUNTID,
        process.env.SDK_USERNAME,
        process.env.SDK_PASSWORD,
        Mode.DEV,
    );

    test('Sdk has properties _config & _identity', () => {
        expect(sdk).toHaveProperty('_config');
        expect(sdk).toHaveProperty('_identity');
    });

    test('Sdk constructor initializes correctly with all the parameters', () => {
        expect(sdk.accountId).toBe(process.env.SDK_ACCOUNTID);
        expect(sdk.userName).toBe(process.env.SDK_USERNAME);
        expect(sdk.password).toBe(process.env.SDK_PASSWORD);
        expect(sdk.mode).toBe('http://localhost')
    });
}