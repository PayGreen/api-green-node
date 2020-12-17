require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';
import { UserType } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets all transports available inside the Api', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.transport.getAll().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        data.dataInfo._embedded.transportation_mode.forEach((e) => {
            expect(e).toHaveProperty('idTransport');
            expect(e).toHaveProperty('idEnergy');
            expect(e).toHaveProperty('idAccount');
            expect(e).toHaveProperty('vehicle');
            expect(e).toHaveProperty('uuid');
            expect(e).toHaveProperty('name');
            expect(e).toHaveProperty('maxWeight');
            expect(e).toHaveProperty('consumption');
        });
    });
});

test('it gets all id from transports available inside the Api', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.transport.getAll().then((data: any) => {
        expect(ApiResponse.getIdList(data).length).toBeGreaterThan(0);

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty('name');
        }
    });
});

test("it can't get all id from transports with charity user type (role=ASSOCIATION)", async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.CHARITY));

    return sdk.transport.getAll().then((data: any) => {
        expect(data.success).toBe(false);
        expect(ApiResponse.isInvalid(data)).toBe(true);
    });
});
