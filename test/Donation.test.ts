require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';
import { UserType } from '../src/enums';
import { IDonationURLParams } from '../src/interfaces';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets all donations and then gets all ids directly, with shop user type (role=ADMIN or PAYGREEN)', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.donation.getAll().then((data: any) => {
        expect(data).toBeDefined();
        expect(data.dataInfo).toHaveProperty('total_items');

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'idDonation',
            );
        }
    });
});

let today = new Date();
today.setUTCHours(0, 0, 0, 0); // we reset the current day to midnight

const currentDayParams = {
    begin: today.toISOString().slice(0, 10),
    end: new Date(today.setDate(today.getDate() + 1))
        .toISOString()
        .slice(0, 10),
};

const timestampBegin = new Date(currentDayParams.begin).getTime() / 1000; // we convert timestamp from milliseconds to seconds to fit timestamps format from API
const timestampEnd = new Date(currentDayParams.end).getTime() / 1000;

test('it gets all donations limited with begin and end dates covering the current day', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.donation.getAll(currentDayParams).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);

        if (data.dataInfo._embedded.donation.length) {
            data.dataInfo._embedded.donation.forEach((e) => {
                expect(e.createdAt).toBeGreaterThanOrEqual(timestampBegin);
                expect(e.createdAt).toBeLessThan(timestampEnd);
            });
        }
    });
});

test('it gets all donations limited to 20 results maximum', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));
    const params: IDonationURLParams = {
        limit: 20,
    };

    return sdk.donation.getAll(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo._embedded.donation.length).toBeLessThanOrEqual(20);
    });
});

test('if at least one donation has been made, it gets the last one created based on its id and then gets its id directly', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.donation.getAll().then((data: any) => {
        expect(data).toBeDefined();

        if (data.dataInfo._embedded.donation.length) {
            // we get by default the id of the first donation from the list
            const idDonation = Object.values(ApiResponse.getIdList(data)[0])[0];

            return sdk.donation.getOne(idDonation).then((data: any) => {
                expect(ApiResponse.getId(data)).toHaveProperty(
                    'idDonation',
                    idDonation,
                );
            });
        }
    });
});

// stand by tests for refund donation will be made after fix inside API
test('it creates a donation, then refunds it', async () => {});
