require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse } from '../src/models';
import { UserType, PartnershipStatus } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets all partnerships and then gets all ids directly, with shop user type (role=ADMIN or PAYGREEN)', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.partnership.getAll().then((data: any) => {
        expect(data).toBeDefined();
        if (data.dataInfo._embedded.partnership.length) {
            for (let key in ApiResponse.getIdList(data)) {
                expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                    'idPartnership',
                );
            }
        }
    });
});

test('if at least one partnership has been created, it gets the last one created based on its id and then gets its id directly', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.partnership.getAll().then((data: any) => {
        expect(data).toBeDefined();

        if (data.dataInfo._embedded.partnership.length) {
            // we get by default the id of the first partnership from the list
            const idPartnership = Object.values(
                ApiResponse.getIdList(data)[0],
            )[0];

            return sdk.partnership.getOne(idPartnership).then((data: any) => {
                expect(ApiResponse.getId(data)).toHaveProperty(
                    'idPartnership',
                    idPartnership,
                );
            });
        }
    });
});

// stand by, waiting for fix into API for creating/validating/cancelling a partnership
test('it creates a partnership, then validates it and finally cancels it', async () => {});
