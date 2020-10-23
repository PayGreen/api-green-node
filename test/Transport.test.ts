require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';

const sdk = new Sdk(localConfig);

test('it gets all transports available inside the Api', () => {
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

test('it gets all id from transports available inside the Api', () => {
    return sdk.transport.getAll().then((data: any) => {
        expect(ApiResponse.getIdList(data).length).toBeGreaterThan(0);

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty('name');
        }
    });
});
