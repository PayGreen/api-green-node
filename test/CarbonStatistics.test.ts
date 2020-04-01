require('dotenv').config('/.env');
import { Sdk } from '../src';
import { Mode } from '../src/enums';
import { ApiResponse } from '../src/models';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};
const sdk = new Sdk(config);

test('it gets carbon statistics without any parameter', () => {
    return sdk.carbonStatistics.get().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
    });
});

test('it gets carbon statistics based on a specific date', () => {
    return sdk.carbonStatistics.getADate('2020-03-30').then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo.period.start).toContain('2020-03-30');
    });
});

test('it gets carbon statistics based on a specific period', () => {
    const today = new Date().toISOString().substring(0, 10);
    return sdk.carbonStatistics.getAPeriod('2020-03-29').then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo.period.start).toContain('2020-03-29');
        expect(data.dataInfo.period.end).toContain(today);
    });
});