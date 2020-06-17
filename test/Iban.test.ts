require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { Sdk } from '../src';
import {
    ApiResponse,
    Iban as IbanModel,
    IbanValidation as IbanValidationModel,
    User,
} from '../src/models';
import { Bank, Country, Role } from '../src/enums';

const sdk = new Sdk(localConfig);

test('it gets all ibans of the current user and then gets all ids directly', () => {
    return sdk.iban.getAll().then((data: any) => {
        expect(data).toBeDefined();
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty('idRib');
        }
    });
});

test('it returns the created iban for the current user and then gets its id directly', () => {
    const ibanTest = new IbanModel(
        Bank['BNP Paribas Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    return sdk.iban.create(ibanTest).then((data: any) => {
        expect(data.dataInfo).toHaveProperty(
            'bankName',
            'BNP Paribas Particuliers',
        ),
            expect(data.dataInfo).toHaveProperty(
                'iban',
                'FR7640618802980004033009519',
            ),
            expect(data.dataInfo).toHaveProperty('bic', 'BNPFRPPXXX');
        expect(data.dataInfo).toHaveProperty('country', 'FR');
        expect(data.dataInfo).toHaveProperty('status', 'VALID');
        expect(ApiResponse.getId(data)).toHaveProperty('idRib');
    });
});

test('it gets one iban of a user based on its ibanId', () => {
    const ibanTest2 = new IbanModel(
        Bank['Banque Casino'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    return sdk.iban.create(ibanTest2).then((data: any) => {
        const ibanId = data.dataInfo.idRib;
        return sdk.iban.getOne(ibanId).then((data: any) => {
            expect(ApiResponse.getId(data)).toHaveProperty('idRib', ibanId);
            expect(data.dataInfo).toHaveProperty('bankName', 'Banque Casino');
        });
    });
});

//this test will fail due to methods conflict into the Api, it will be resolved soon
test('it sets one iban of a user as the default one', () => {
    const ibanTest = new IbanModel(
        Bank['La Banque Postale Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    return sdk.iban.create(ibanTest).then((data: any) => {
        const ibanId = data.dataInfo.idRib;
        return sdk.iban.setAsDefault(ibanId).then((data: any) => {
            expect(data.dataInfo.isDefault).toBe(1);
        });
    });
});

test('it returns the validated iban based on its ibanId', () => {
    const randomUserName = `mc${Math.floor(Math.random() * 10000)}`;
    const userTest = new User(
        'coulon',
        'newmatthieu',
        'mattmatt',
        Role.ADMIN,
        randomUserName,
        'mcpassword',
        'matt@example.com',
        Country.FR,
    );
    const ibanTest = new IbanModel(
        Bank['La Banque Postale Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    const newIban = new IbanValidationModel(Bank.LCL);

    return sdk.user.create(userTest).then((data: any) => {
        return sdk.iban.create(ibanTest, randomUserName).then((data: any) => {
            const ibanId = data.dataInfo.idRib;
            return sdk.iban
                .validate(newIban, ibanId, randomUserName)
                .then((data: any) => {
                    expect(data.dataInfo).toHaveProperty('bankName', 'LCL');
                    expect(ApiResponse.getId(data)).toHaveProperty('idRib');
                });
        });
    });
});

test('it returns 204 status when deleting an iban', () => {
    const ibanTest = new IbanModel(
        Bank['La Banque Postale Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    return sdk.iban.create(ibanTest).then((data: any) => {
        const ibanId = data.dataInfo.idRib;
        return sdk.iban.delete(ibanId).then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true),
                expect(data.status).toEqual(204);
        });
    });
});
