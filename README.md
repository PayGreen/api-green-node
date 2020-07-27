# Api Green Node

-   An ease-to-use Node Sdk for API Green. Carbon footprints and carbon credits purchase are the heart of our API.
-   For contributors, please check technical specifications [here.](#For-contributors)

## Documentation

-   Here are a few examples of API calls made with our Sdk. Please see the full documentation to get the best of [API-Green-Node](https://github.com/PayGreen/api-green-node/doc).
-   For more information specifically about API Green, please visit https://solidaire.paygreen.fr/documentation/green.

## Features

-   Easy API Calls : simple methods that support all API Green endpoints.
-   Data Building Models : Quickly and safely generate data for post/put calls.
-   Extra Tools : Handle and convert data received from API.

## Installation

Install the package with:

```sh
npm i api-green-node --save
```

## Quick Start

### Import Sdk - ES6 module

```
import { Sdk } from 'api-green-node';
```

### Import Sdk - CommonJS2 (in e.g. node.js)

```
const { Sdk } = require('api-green-node');
```

### Authentication

Login with your ids/tokens is required to access to our API Green.
Accounts are created by PayGreen only. To create an Account, please email us at tech@paygreen.fr to obtain your ids. You will be provided with an account id, a username (unique id) and a password.

-   Login with Account Informations
    The API Green uses an OAuth2 security scheme with a Token/Refresh Url. If you don't have any tokens yet, you need to make a first API Call using your username, password and account id. Use the `authentication.login()` method. If all informations provided are correct, the API response will contain an access token and a refresh token.

| Name      | Type                | Description                                                                                                                                                                                                                                                          |
| --------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode      | <code>Enum</code>   | optional - choose between 3 modes 'DEV', 'PREPROD', 'PROD' that correspond to 3 different host urls - if nothing is provided 'PROD' mode and the corresponding host will be used by default                                                                          |
| host      | <code>string</code> | optional - the sdk contains already 3 defined hosts to request API, based on each mode. You can overwrite these urls if you need to use a specific host, just choose between 'DEV' and 'PREPROD' and specify the url of your host. You CANNOT overwrite 'PROD' mode. |
| username  | <code>string</code> | your username                                                                                                                                                                                                                                                        |
| password  | <code>string</code> | your password                                                                                                                                                                                                                                                        |
| accountId | <code>string</code> | your accountId                                                                                                                                                                                                                                                       |

-   here we choose 'DEV', it's the corresponding url inside the Sdk that will be used.

```
import { Sdk, Mode } from 'api-green-node';

const config = {
    mode: Mode.DEV,
};

const sdk = new Sdk(config)
    return sdk.authentication
        .login(username, password, accountId)
        .then((res) => {
            console.log(res)
        });
```

-   in case you need a specific url :

```
import { Sdk, Mode } from 'api-green-node';

const config = {
    mode: Mode.DEV,
    host: 'http://myspecialurl'
};
```

-   Login with Tokens
    If you already have your tokens, you just need to instanciate our sdk with a config object.

| Name         | Type                | Description                                                                                                                                                     |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | <code>string</code> | access token which expires in 14400s                                                                                                                            |
| refreshToken | <code>string</code> | refresh token to get a new valid access token                                                                                                                   |
| mode         | <code>Enum</code>   | optional - choose between 3 modes 'DEV', 'PREPROD', 'PROD' that correspond to 3 different host urls. if nothing is provided mode 'PROD' will be used by default |

```
const config = {
    token: string,
    refreshToken: string,
    mode?: enum,
    host?: string,
}
```

```
import { Sdk, Mode } from 'api-green-node';

const config = {
    token: yourToken,
    refreshToken: yourRefreshToken,
    mode: Mode.DEV,
};
const sdk = new Sdk(config);
```

## All endpoints covered by our Sdk :

```
//Authentication Class
    authentication.login()
    authentication.refreshToken()

//User Class
    user.getAccount()
    user.getAll()
    user.getOne()
    user.create()
    user.update()
    user.delete()

//Iban Class
    iban.getAll()
    iban.getOne()
    iban.create()
    iban.setAsDefault()
    iban.validate()
    iban.delete()

//Transport Class
    transport.getAll()

//Carbon Class
    carbon.addWebEstimate()
    carbon.addPathEstimate()
    carbon.getEstimate()
    carbon.completeEstimate()
    carbon.deleteEstimate()

//CarbonStastitics Class
    carbonStatistics.get()
    carbonStatistics.getADate()
    carbonStatistics.getAPeriod()

```

## API Requests examples

Please, remind, that the access level of your User Status (Administrator or User) defines what kind of actions or the kind of data you can access.

### Manage and create user profiles :

-   get information about one user based on his Username.(Optional, by default UserName used will be the one from identity)

```
    return sdk.user
        .getOne(userNameValue?)
        .then((res) => {
            console.log(res)
        }};
```

-   create a new user:
    we highly recommend you to use our User Model Class to ensure full compatibility with the API. Please see [Documentation](https://github.com/PayGreen/api-green-node/doc).

```
    return sdk.user
        .create(newUser)
        .then((res) => {
            console.log(res)
        });
```

-   create an IBAN associated to user :
    -   In order to purchase carbon offset, you need to register an IBAN. This IBAN will be used to make bank wire transfers. An IBAN is associated to the User that registers it.
    -   We highly recommend you to use our Iban Model Class to ensure full compatibility with the API. Please see [Documentation](https://github.com/PayGreen/api-green-node/doc). (Username Optional, by default UserName used will be the one from identity, username is require if you want to create an IBAN for another user than yourself)

```
    return sdk.iban
        .create(newIban, userNameValue?)
        .then((res) => {
            console.log(res)
        });
```

### Adding web carbon footprint

If you have completed your profile (user + IBAN) you can add and manage carbon footprint!

Here we will show you how to create a web carbon footprint but in API Green there are two kind of carbon footprints estimations:

-   web browsing or navigation (dependent on time, device type, number of images loaded, number of pages visited, etc.)
-   transport of persons or goods (dependent on weight, method of transport and the kind of energy used).
-   so you can easily estimate the carbon cost for the web browsing made by a user to shop a product and the carbon cost for the transport of this product to be delivered to consumer.
-   estimated carbon is in tons CO2eq and estimated price amount in euros cents (100 = 1€).

STEP 1: CREATE THE WEB ESTIMATE OFFSET

-   Each footprint is identified by its unique `fingerprint`. To be sure to have a unique fingerPrint, please check [Documentation](https://github.com/PayGreen/api-green-node/doc).
-   You can make a carbon footprint in multiple calls, mix transports, add a web footprint on top of it, as long as you use the SAME fingerprint and if you haven't completed (= finalized) the carbon offset.

```
import { WebEstimate } from 'api-green-node';

const newWebData = new WebEstimate(
    fingerprint,
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
    140,
    6,
    180,
);
```

STEP 2 : ADD THE WEB ESTIMATE (Only admin can add a carbon footprint)

```
    return sdk.carbon
        .addWebEstimate(newWebData)
        .then((res) => {
            console.log(res)
        });
```

STEP 3 : COMPLETE (FINALIZE) THE WEB ESTIMATE

```
    return sdk.carbon
        .completeEstimate(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

### Get your carbon statitics

-   If you have created and completed carbon offsetting estimates, you can now get statistics and see all your carbon offsetting credit purchases, filtered in many ways.
-   default mode : get automatically data from last month until today

```
    return sdk.carbonStatistics
        .get()
        .then((res) => {
            console.log(res)
        });
```

-   get datas on a specific date

| Param | Type                | Description                                                                           |
| ----- | ------------------- | ------------------------------------------------------------------------------------- |
| date  | <code>string</code> | accepted formats are YYYY-MM-DD(show a day), YYYY-MM(show a month), YYYY(show a year) |

```
    return sdk.carbonStatistics
        .getADate(date)
        .then((res) => {
            console.log(res)
        });
```

## For contributors

-   To configure properly the Sdk and Jest tests for development, once you have installed the repository on your computer, you have to create an .env file with the following fields (you can find these fields in the 'model.env' file in this repository) :

```
SDK_ACCOUNTID = your accountId here
SDK_USERNAME = your username here
SDK_PASSWORD = your password here
SDK_TOKEN = your token here
SDK_REFRESHTOKEN = your refresh token here
SDK_MODE = choose between DEV, PREPROD and PROD (if no mode provided, default mode will be PROD and the requests will automatically be made with url http://localhost)
SDK_HOST = your url here (if no host provided, the requests will automatically be made with url http://localhost)
```

## Questions & support

Don't hesitate to contact tech@paygreen.fr (or create an issue on github) for any questions.
