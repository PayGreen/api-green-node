require('dotenv').config('/.env');
import { Sdk } from '../src';
import { Iban as IbanModel } from '../src/models';
import { ApiResponse } from '../src/models/ApiResponse';
import { Bank, Country, Mode } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};

const sdk = new Sdk(config);

test('it gets all ibans of the current user', () => {
    return sdk.iban.getAll().then((data: any) => {
        expect(data).toBeDefined();
    });
});

test('it returns the created iban for the current user', () => {
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
            expect(data.dataInfo).toHaveProperty('bic', 'BNPFRPPXXX'),
            expect(data.dataInfo).toHaveProperty('country', 'FR');
        expect(data.dataInfo).toHaveProperty('status', 'VALID');
    });
});

test('it gets one iban of a user based on its ibanId', () => {
    return sdk.iban.getOne(19).then((data: any) => {
        expect(data.dataInfo).toHaveProperty('idRib', '19');
    });
});

test('it sets one iban of a user as the default one', () => {
    return sdk.iban.setAsDefault(19).then((data: any) => {
        console.log('data dans setdefault', data)
        expect(data.dataInfo.isDefault).toBe('1');
    });
});

test('it returns the updated iban based on his ibanId', () => {
    const ibanTest = new IbanModel(
        Bank['La Banque Postale Particuliers'],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    return sdk.iban.update(ibanTest, 19).then((data: any) => {
        expect(data.dataInfo).toHaveProperty(
            'bankName',
            'La Banque Postale Particuliers',
        ),
            expect(data.dataInfo).toHaveProperty(
                'iban',
                'FR7640618802980004033009519',
            ),
            expect(data.dataInfo).toHaveProperty('bic', 'BNPFRPPXXX'),
            expect(data.dataInfo).toHaveProperty('country', 'FR');
    });
});

test('it returns 204 status when deleting an iban', () => {
    return sdk.iban.delete(19).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.status).toEqual(204);
    });
});
