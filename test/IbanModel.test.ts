require('dotenv').config('/.env');
import { Iban } from '../src/models';
import { Bank, Country } from '../src/enums';
import { deserialize, serialize } from 'typescript-json-serializer';

test('Add firstname of a user with User Model', () => {
    const ibanTest = new Iban();
    ibanTest.iban = "FR7640618802980004033009519";
    expect(ibanTest.iban).toEqual("FR7640618802980004033009519");
});

test('Add complete iban of a user with Iban Model', () => {
    const ibanTest2 = new Iban(
        Bank["BNP Paribas Particuliers"],
        'FR7640618802980004033009519',
        'BNPFRPPXXX',
        Country.FR,
    );
    expect(ibanTest2).toMatchObject({
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPFRPPXXX',
        country: 'FR',
    });
});

test('deserialize received data to fit Iban Model', () => {
    const data = {
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPFRPPXXX',
        country: 'FR',
    };
    const finalData = deserialize(data, Iban);
    expect(finalData).toMatchObject({
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPFRPPXXX',
        country: 'FR',
    });
});

test('Verify method throws error with wrong iban syntax', () => {
    const ibanTest3 = new Iban(
        Bank["BNP Paribas Particuliers"],
        'wrongIban',
        'BNPFRPPXXX',
        Country.FR,
    );
    expect(() => {
        ibanTest3.verify(ibanTest3);
    }).toThrowError('Error in iban syntax, please verify your iban');
});