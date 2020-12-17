require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models';
import { UserType } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets all partnerships and then gets all ids directly, with shop user type (role=ADMIN or PAYGREEN)', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.partnershipGroup.getAll().then((data: any) => {
        expect(data).toBeDefined();
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'externalId',
            );
        }
    });
});

test("it gets the pre-existing 'default' partnershipgroup for each user and then gets its externalId directly", async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));
    const envAccountId = `SDK_${UserType.SHOP}_ACCOUNTID`;
    const accountId: string = process.env[envAccountId] as string;

    return sdk.partnershipGroup.getOne('default').then((data: any) => {
        expect(data.dataInfo).toHaveProperty('idAccount', accountId);
        expect(data.dataInfo).toHaveProperty('associations');
        expect(data.dataInfo).toHaveProperty('partnerships');
        expect(ApiResponse.getId(data)).toHaveProperty('externalId', 'default');
    });
});

// stand by, waiting for fix into APi to have the possibility to create new partnerships with a new user to create new partnershipgroups
test('it creates a partnershipgroup, then updated it and finally deletes it', async () => {});
