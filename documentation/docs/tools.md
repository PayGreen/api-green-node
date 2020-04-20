---
id: tools
title: Helpful methods for handling API Requests & Responses
---

We have created a bunch of methods to help you optimizing the data created to be sent to API as well as handling data received from API response.

# Before sending data to API :

## randomFingerPrint()

-   Easily create a unique fingerprint to identify path and web carbon estimates, when you want to add some [Carbon Offsetting Estimates.](carbon-data.md) Using this method guarantees you the uniqueness of the fingerprint.

```
    import { Tools } from 'api-green-node';

    const newFingerprint = Tools.randomFingerprint();
    console.log(newFingerprint) // output '1587312344606c81a00430f'
```

## verify()

| Param | Type                | Description                                  |
| ----- | ------------------- | -------------------------------------------- |
| data  | <code>object</code> | object created with one of the model classes |

-   Easily verify the data built with model classes (`User`,`Iban`, `WebEstimate`, `PathEstimate`) before sending it to API. This method verifies if there is no field left empty when all of them are required and check specific value validity like email for `User` or iban reference and bic reference for `Iban` or even latitude and longitude for `PathEstimate`.

```
    import { Tools } from 'api-green-node';

    return Tools.verify(data)
        .then((res) => {
        console.log(res)
    });
```

-   If all values are ok, you will received a simple string :

```
    'validation succeed'
```

-   In case of error, the method will return an array containing the name of the field concerned and the error detailed. Here, we have built a new user but left the field 'username' empty.

```
    import { Tools } from 'api-green-node';

    User {
        lastname: 'dupont',
        firstname: 'jean',
        publicname: 'dj4',
        role: 'ADMIN',
        username: '',
        password: 'dj4',
        contact: Contact { email: 'dj4@example.com', country: 'FR' }
    }

    return Tools.verify(User).then((res) => {
        console.log(res)
    });

    res = [
        ValidationError {
            value: '',
            property: 'username',
            children: [],
            constraints: {
            minLength: 'username must be longer than or equal to 1 characters'
            }
        }
    ]

```

# Handling API Responses :

Some API responses can be huge or complex with specific errors, for more efficiency we have built methods to browse the responses and access to specific information quickly.

## isSuccessful()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

-   verify if http response format = 2xx

```
    import { ApiResponse } from 'api-green-node';

    return ApiResponse.isSuccessful(data) // output true or false
```

## isInvalid()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

-   verify if http response format = 4xx

```
    import { ApiResponse } from 'api-green-node';

    return ApiResponse.isInvalid(data) // output true or false
```

## causedAnError()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

-   verify if http response format = 5xx

```
    import { ApiResponse } from 'api-green-node';

    return ApiResponse.causedAnError(data) // output true or false
```

## getStatus()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

-   get status of the http response

```
    import { ApiResponse } from 'api-green-node';

    return ApiResponse.getStatus(data) // output number
```

## getErrorMessage()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

-   get error message details

```
    import { ApiResponse } from 'api-green-node';

    return ApiResponse.getErrorMessage(data) // output string
```

## getId()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

**Returns**: <code>object</code> - object with the identifier name and its corresponding value

-   to access quickly to the identifier of the data received (after a GET for an entity like `user.getOne()`)

```
    import { ApiResponse } from 'api-green-node';

    return sdk.user.getOne('jd324').then((data) => {
        console.log(ApiResponse.getId(data))
    });
```

```
    { username: 'jd324' }
```

## getIdList()

| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| data  | <code>object</code> | response formatted from Api |

**Returns**: <code>array</code> - an array of objects with each identifier name and its value

-   to access quickly to the list of identifiers of the data received (after a GET for a collection like `user.getAll()`).

```
    import { ApiResponse } from 'api-green-node';

    return sdk.user.getAll().then((data) => {
        console.log(ApiResponse.getIdList(data))
    });
```

```
    [
        { username: 'jd324' },
        { username: 'mc3165' },
        { username: 'mc4627' },
        { username: 'fb5689' },
        { username: 'rd5606' },
        { username: 'mc1567' }
    ]
```

# Conversions :

## tonsCo2ToKilosCo2()

-   estimated carbon received from API is in Tons of CO²eq. With this method you can convert directly into kilograms when you get a [Carbon Estimate](carbon-api-requests.md) or a [Carbon Statistic.](carbon-statistics-api-requests.md)

| Param | Type                | Description                                 |
| ----- | ------------------- | ------------------------------------------- |
| value | <code>number</code> | quantity of Co2eq (in tons) to be converted |

```
    import { Tools } from 'api-green-node';

    const TonsInCo2 = Tools.tonsCo2ToKilosCo2(value);
```

## kilosCo2ToTonsCo2()

-   you can reconvert to kilograms if needed.
    | Param | Type | Description |
    | --- | --- | --- |
    | value | <code>number</code> | quantity of Co2eq (in kilograms) to be converted |

```
    import { Tools } from 'api-green-node';

    const Co2InTons = Tools.kilosCo2ToTonsCo2(value);
```

## eurosCentstoEuros()

-   estimated price received from API is in euro cents. With this method you can convert directly into euros when you get a [Carbon Estimate](carbon-api-requests.md) or a [Carbon Statistic.](carbon-statistics-api-requests.md)
    | Param | Type | Description |
    | --- | --- | --- |
    | value | <code>number</code> | price (in euros cents) to be converted |

```
    import { Tools } from 'api-green-node';

    const PriceInEuros = Tools.eurosCentstoEuros(value);
```

## eurosToEurosCents()

-   you can reconvert to euros cents if needed.
    | Param | Type | Description |
    | --- | --- | --- |
    | value | <code>number</code> | price (in euros) to be converted |

```
    import { Tools } from 'api-green-node';

    const PriceInEuroCents = Tools.eurosToEurosCents(value);
```