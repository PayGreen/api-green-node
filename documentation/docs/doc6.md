---
id: doc6
title: Ibans - API Requests
---

- In order to purchase carbon offset, you need to register an IBAN. This IBAN will be used to make bank wire transfers. An IBAN is associated to the User that registers it. IBAN registration is mandatory and is associated to a User.
- After this step, your IBAN will be validated by our Account Managers. Once an IBAN is validated (marked in a VALID status), it can't be updated anymore. If there is a problem with your IBAN, it will be marked in a ERROR status.
- The first IBAN created by a User becomes the default IBAN for your User.

## iban.getAll()

| Param | Type | Description |
| --- | --- | --- |
| userNameValue | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserNameValue to get all ibans of a different user of the company account |

- Get a list of ibans based on accountId and username
```
    return sdk.iban
        .getAll(userNameValue?)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response
The _embedded object inside API response contains an array of all ibans associated to the username.
```
{
    success: true,
        dataInfo: {
          _links: { self: [Object] },
          _embedded: { rib: [Array] },
          total_items: 22
        },
    status: 200
}   
```
## iban.create()

| Param | Type | Description |
| --- | --- | --- |
| newIban | <code>IbanModel</code> | object containing all new iban information, both Admin and User can create Iban |
| userNameValue | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserNameValue to create ibans of a different user of the company account |
- Get object with new iban created.  

```
    return sdk.iban
        .create(newIban, userNameValue?)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response
```
{
    success: true,
    dataInfo: {
        idRib: '587',
        model: 'ApiUser',
        idModel: '12',
        status: 'VALID',
        bankName: 'BNP Paribas Particuliers',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPFRPPXXX',
        country: 'FR',
        isDefault: 0,
        createdAt: 1587138210,
        validatedAt: 1587138210,
        _links: { self: [Object] }
    },
    status: 201
}   
```
## iban.getOne()

| Param | Type | Description |
| --- | --- | --- |
| ibanId | <code>number</code> | unique number to identify the iban |
| userNameValue | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserNameValue 
- Get information about a specific iban  

```
    return sdk.iban
        .getOne(ibanId, userNameValue?)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response
The _embedded object inside API response contains an array of all users associated to your account.
```
{
    success: true,
    dataInfo: {
        idRib: '18',
        model: 'ApiUser',
        idModel: '12',
        status: 'VALID',
        bankName: 'Boursorama',
        iban: 'FR7640618802980004033009519',
        bic: 'BOUSFRPPXXX',
        country: 'FR',
        isDefault: '1',
        createdAt: '1584026655'
        validatedAt: '1584026655' }
        _links: { self: [Object] }
    },
    status: 200
}   
```
## iban.setOneAsDefault()

| Param | Type | Description |
| --- | --- | --- |
| ibanId | <code>number</code> | unique number to identify the iban |
| userNameValue | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserNameValue to get an iban of a different user of the company account |
- Set one iban as default one. 

```
    return sdk.iban
        .setOneAsDefault(ibanId, userNameValue?)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response
The object contains the boolean 'isDefault' set to '1';
```
{
    success: true,
    dataInfo: {
        "idRib": "1",
        "idUser": "1",
        "status": "VALID",
        "bankName": "MyBank",
        "iban": "FR7613106005002000743520962",
        "bic": "CMCIFR2A",
        "country": "FR",
        "isDefault": "1",
        "createdAt": "1514761200",
        "enabledAt": "1514761200",
        "_links": {
        "self": {}
        }
    },
    status: 200
}   
```

## iban.validate()
(reserved to 'Paygreen' account users)

| Param | Type | Description |
| --- | --- | --- |
| ibanId | <code>number</code> | unique number to identify the iban |
| ValidatedIban | <code>IbanValidationModel</code> | Object containing all new iban information |
| userNameValue | <code>string</code> | UserName of the owner of the iban |
-  Get object with iban validated. 

```
    return sdk.iban
        .validate(ibanId, ValidatedIban, userNameValue)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response
The _embedded object inside API response contains an array of all users associated to your account.
```
{
    success: true,
    dataInfo: {
        idRib: '589',
        model: 'ApiUser',
        idModel: '12',
        status: 'VALID',
        bankName: 'LCL',
        iban: 'FR7640618802980004033009519',
        bic: 'BNPFRPPXXX',
        country: 'FR',
        isDefault: '0',
        createdAt: '1587138210',
        validatedAt: '1587138210',
        _links: { self: [Object] }
    },
    status: 200
}   
```
## iban.delete()

| Param | Type | Description |
| --- | --- | --- |
| ibanId | <code>number</code> | unique number to identify the iban |
| UserNameValue | <code>string</code> | Admin Only - to delete one iban of a different user from the company account |
- Get response with status 204 if iban is deleted successfully.
- The Default IBAN can't be deleted. Instead, you have to:
    - create another IBAN
    - make the newly created IBAN your default one
    - delete your old IBAN (which is no longer the default one)

```
    return sdk.iban
        .delete(ibanId, userNameValue?)
        .then((res) => {
            console.log(res)
        }})
    };
```
- API Response

```
{
    success: true,
    dataInfo: 'user deleted successfully',
    status: 204
}   
```