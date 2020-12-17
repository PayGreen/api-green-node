require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse, Tools } from '../src/models';
import { UserType } from '../src/enums';
import { IDonationReportsURLParams } from '../src/interfaces';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets donation reports without any parameter and check if there is a details object if any donation has been made', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.donationReports.get().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('donationCount');
        expect(data.dataInfo).toHaveProperty('totalDonationAmount');
        expect(data.dataInfo).toHaveProperty('maximumDonationAmount');
        expect(data.dataInfo).toHaveProperty('minimumDonationAmount');
        expect(data.dataInfo).toHaveProperty('averageDonationAmount');

        if (data.dataInfo.donationCount) {
            expect(data.dataInfo).toHaveProperty('details');
        }
    });
});

test('it gets donation reports with begin and end dates as parameters', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    const today = new Date().toISOString().substring(0, 10);
    const params: IDonationReportsURLParams = {
        end: today,
        begin: '2020-03-29',
    };

    return sdk.donationReports.get(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('donationCount');
        expect(data.dataInfo).toHaveProperty('end', today);
        expect(data.dataInfo).toHaveProperty('begin', '2020-03-29');
    });
});

test('it gets donation reports without any parameter, converts estimated donations in euros cents to euros', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.donationReports.get().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('totalDonationAmount');
        const PriceInEuros = Tools.eurosCentstoEuros(
            data.dataInfo.totalDonationAmount,
        );
        expect(PriceInEuros).toEqual(data.dataInfo.totalDonationAmount / 100);
    });
});
