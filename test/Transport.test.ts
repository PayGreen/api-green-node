require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';

const sdk = new Sdk(localConfig);

test('it gets all transports available inside the Api', () => {
    return sdk.transport.getAll().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.success).toBe(true);
        expect(data.dataInfo._embedded.ccarbon_transport[0]).toHaveProperty(
            'vehicle',
        );
    });
});

test('it gets all id from transports available inside the Api', () => {
    return sdk.transport.getAll().then((data: any) => {
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty('name');
        }
    });
});
