require('dotenv').config('/.env');
import { Charity, Sdk } from '../src';
import { ApiResponse } from '../src/models/ApiResponse';
import { FieldOfAction, UserType } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets all charities and then gets all ids directly, with shop user type (role=ADMIN or PAYGREEN)', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.charity.getAll().then((data: any) => {
        expect(data).toBeDefined();
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'idAssociation',
            );
        }
    });
});

test('it gets one charity/association based on its id and then gets its id directly', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.charity.getAll().then((data: any) => {
        expect(data).toBeDefined();
        // we get by default the id of the first charity from the list
        const idAssociation = Object.values(ApiResponse.getIdList(data)[0])[0];

        return sdk.charity.getOne(idAssociation).then((data: any) => {
            expect(ApiResponse.getId(data)).toHaveProperty(
                'idAssociation',
                idAssociation,
            );
        });
    });
});

// this test will be improved after update from API to get association directly with "me" id.
// and when it will be possible to do it also with userType = "CHARITY" (we can't do a charity.getAll() with CHARITY role)
// since all associations are shared among all accounts we update only temporarily a charity
// and then reset it to its original state to keep data inside API as clean as possible :)
test('it gets one charity/association based on its id and then updates some infos and finally resets to original data', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.charity.getAll().then((data: any) => {
        expect(data).toBeDefined();
        // we get by default the id of the first charity from the list
        const idCharity = Object.values(ApiResponse.getIdList(data)[0])[0];

        return sdk.charity.getOne(idCharity).then((data: any) => {
            const updatedCharity = new Charity(
                data.dataInfo.name,
                data.dataInfo.url,
                data.dataInfo.description + ' A new sentence to describe it',
                Number(FieldOfAction[data.dataInfo.fieldOfAction]),
            );

            return sdk.charity
                .update(updatedCharity, idCharity)
                .then((updatedData: any) => {
                    expect(ApiResponse.isSuccessful(updatedData)).toBe(true),
                        expect(updatedData.dataInfo).toHaveProperty(
                            'description',
                            data.dataInfo.description +
                                ' A new sentence to describe it',
                        );
                    expect(updatedData.dataInfo).toHaveProperty(
                        'url',
                        data.dataInfo.url,
                    );

                    const resetCharity = new Charity(
                        data.dataInfo.name,
                        data.dataInfo.url,
                        data.dataInfo.description,
                        Number(FieldOfAction[data.dataInfo.fieldOfAction]),
                    );

                    return sdk.charity
                        .update(resetCharity, idCharity)
                        .then((resetData: any) => {
                            expect(ApiResponse.isSuccessful(resetData)).toBe(
                                true,
                            );
                            expect(resetData.dataInfo).toHaveProperty(
                                'description',
                                data.dataInfo.description,
                            );
                        });
                });
        });
    });
});
