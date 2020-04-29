require('dotenv').config('/.env');
import { Iban } from '../src/models';
import { Bank, Country } from '../src/enums';
import { Tools } from '../src/models';
import { deserialize, serialize } from 'typescript-json-serializer';

test('Add firstname of a user with User Model', () => {
    const ibanTest = new Iban();
    ibanTest.iban = 'FR7640618802980004033009519';
    expect(ibanTest.iban).toEqual('FR7640618802980004033009519');
});

test('Add complete iban of a user with Iban Model', () => {
    const ibanTest2 = new Iban(
        Bank['BNP Paribas Particuliers'],
        'FR7640618802980004033009519',
        'BNPAFRPP039',
        Country.FR,
    );
    expect(ibanTest2).toMatchObject({
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPAFRPP039',
        country: 'FR',
    });
});

test('deserialize received data to fit Iban Model', () => {
    const data = {
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPAFRPP039',
        country: 'FR',
    };
    const finalData = deserialize(data, Iban);
    expect(finalData).toMatchObject({
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPAFRPP039',
        country: 'FR',
    });
});

test('Verify method returns error with the name of the wrong property iban', () => {
    const ibanTest3 = new Iban(
        Bank['BNP Paribas Particuliers'],
        'wrongIban',
        'BNPAFRPP039',
        Country.FR,
    );
    return Tools.verify(ibanTest3).then((data: any) => {
        expect(data).toBeDefined();
        expect(data[0].property).toContain('iban');
    });
});