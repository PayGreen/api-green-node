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

    test('it gets a token access to request Api', () => {
        return sdk.authentication.getToken().then((data: any) => {
            expect(data.success).toBe(true);
            expect(data.dataInfo.access_token).toBeDefined;
        });
    });

    test('it gets a refreshed token access to request Api', () => {
        return sdk.authentication.getToken().then((data: any) => {
            expect(data.success).toBe(true);
            expect(data.dataInfo.access_token).toBeDefined;
        });
    });
}