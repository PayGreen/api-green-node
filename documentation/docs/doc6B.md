---
id: doc6B
title: Ibans - Create Data
---

Here you will find all informations to create a New Iban Object with our Iban Model class.
- both country and bankName are based on enumeration for autocompletion.
- for country : all countries are available in format ISO31661Alpha2.

## Object expected by API Green : 
| Name | Type | Description |
| --- | --- | --- |
| bankName | <code>enum</code> | bank of the iban |
| iban | <code>string</code> | number of the iban |
| bic | <code>string</code> | bic of the iban |
| country | <code>enum</code> | country of the iban |

```
{
    bankName: enum,
    iban: string,
    bic: string,
    country: enum,
}

```

## Add one information at a time :

```
import { Iban } from 'api-green-node';

const newIban = new Iban();
    newIban.iban = 'FR7640618802980004033009519';

```
## Or all at once  :

```
import { Iban, Bank, Country } from 'api-green-node';

const newIban = new Iban(
    Bank['BNP Paribas Particuliers'],
    'FR7640618802980004033009519',
    'BNPAFRPP039',
    Country.FR,
);

```
### We have built special method to verify the data before sending it to API. [Try it here](doc9#verify)
