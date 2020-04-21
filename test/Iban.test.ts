require('dotenv').config('/.env');
import { Sdk } from '../src';
import {
    ApiResponse,
    Iban as IbanModel,
    IbanValidation as IbanValidationModel,
} from '../src/models';
import { Bank, Country, Mode } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};

const sdk = new Sdk(config);

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
    return sdk.iban.getOne(18).then((data: any) => {
        expect(data.dataInfo).toHaveProperty('bankName');
        expect(data.dataInfo).toHaveProperty('bic');
        expect(ApiResponse.getId(data)).toHaveProperty('idRib', '18');
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
            expect(data.dataInfo.isDefault).toBe('1');
        });
    });
});

test('it returns the validated iban based on its ibanId', () => {
    const ibanTest = new IbanModel(
        Bank['La Banque Postale Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    const newIban = new IbanValidationModel(Bank.LCL);
    return sdk.iban.create(ibanTest).then((data: any) => {
        const ibanId = data.dataInfo.idRib;
        return sdk.iban.validate(newIban, ibanId).then((data: any) => {
            expect(data.dataInfo).toHaveProperty('bankName', 'LCL');
            expect(ApiResponse.getId(data)).toHaveProperty('idRib');
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
        sdk.iban.delete(ibanId).then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true),
                expect(data.status).toEqual(204);
        });
    });
});