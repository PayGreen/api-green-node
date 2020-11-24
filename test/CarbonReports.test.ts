require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse, Tools } from '../src/models';
import { IReportURLParams } from '../src/interfaces';
import { UserType } from '../src/enums';
import autoConfig from './config/autoConfig';

test('it gets carbon reports without any parameter', async () => {
    const sdk = new Sdk(await autoConfig(UserType.SHOP));

    return sdk.carbonReports.get().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('ongoingFootprintCount');
        expect(data.dataInfo).toHaveProperty('closedFootprintCount');
        expect(data.dataInfo).toHaveProperty('purchasedFootprintCount');
        expect(data.dataInfo).toHaveProperty('carbonEmitted');
        expect(data.dataInfo).toHaveProperty('carbonOffset');
        expect(data.dataInfo).toHaveProperty('carbonOffsetPrice');
        expect(data.dataInfo).not.toHaveProperty('daily');
    });
});

test('it gets carbon reports without daily option', async () => {
    const sdk = new Sdk(await autoConfig(UserType.SHOP));
    const params: IReportURLParams = {
        daily: 1,
    };

    return sdk.carbonReports.get(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('ongoingFootprintCount');
        expect(data.dataInfo).toHaveProperty('daily');
    });
});

test('it gets carbon reports with begin and end dates as parameters', async () => {
    const sdk = new Sdk(await autoConfig(UserType.SHOP));
    const today = new Date().toISOString().substring(0, 10);
    const params: IReportURLParams = {
        end: today,
        begin: '2020-03-29',
    };

    return sdk.carbonReports.get(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('ongoingFootprintCount');
        expect(data.dataInfo).toHaveProperty('end', today);
        expect(data.dataInfo).toHaveProperty('begin', '2020-03-29');
    });
});

test('it gets carbon reports without any parameter, converts estimated CO2eq in tons to kilograms and estimated price in euros cents to euros', async () => {
    const sdk = new Sdk(await autoConfig(UserType.SHOP));

    return sdk.carbonReports.get().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        const Co2InKilos = Tools.tonsCo2ToKilosCo2(data.dataInfo.carbonEmitted);
        expect(Co2InKilos).toEqual(data.dataInfo.carbonEmitted * 1000);
        const PriceInEuros = Tools.eurosCentstoEuros(
            data.dataInfo.carbonOffsetPrice,
        );
        expect(PriceInEuros).toEqual(data.dataInfo.carbonOffsetPrice / 100);
    });
});
