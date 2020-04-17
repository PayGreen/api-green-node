require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';
import { Mode } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};

const sdk = new Sdk(config);

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
        console.log(data)
        console.log (ApiResponse.getIdList(data))
        // for (let key in ApiResponse.getIdList(data)) {
        //     expect(ApiResponse.getIdList(data)[key]).toHaveProperty('name');
        // }
    });
});