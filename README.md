# Api Green Node

-   An ease-to-use Node Sdk for API Green. Carbon footprints and carbon credits purchase are the heart of our API.
-   For contributors, please check technical specifications [here.](#For-contributors)

## Documentation

-   Here are a few examples of API calls made with our Sdk. Please see the full documentation to get the best of [API-Green-Node](https://paygreen.github.io/api-green-node/).
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

| Name      | Type                | Description                                                                                                                                                                                                                                                                                        |
| --------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode      | <code>Enum</code>   | optional - choose between 3 modes 'RECETTE', 'SANDBOX', 'PROD' that correspond to 3 different host urls - if nothing is provided 'SANDBOX' mode and the corresponding host will be used by default                                                                                                 |
| host      | <code>string</code> | optional - the sdk contains already 3 defined hosts to request API, based on each mode. You can overwrite these urls if you need to use a specific host, just choose between 'RECETTE' and 'SANDBOX' and specify the url of your host. If you don't specify a mode, the host won't be overwritten! |
| username  | <code>string</code> | your username                                                                                                                                                                                                                                                                                      |
| password  | <code>string</code> | your password                                                                                                                                                                                                                                                                                      |
| accountId | <code>string</code> | your accountId                                                                                                                                                                                                                                                                                     |

-   here we choose 'RECETTE', it's the corresponding url inside the Sdk that will be used.

```
import { Sdk, Mode } from 'api-green-node';

const config = {
    mode: Mode.RECETTE,
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
    mode: Mode.RECETTE,
    host: 'http://myspecialurl'
};
```

-   You can also use a dotenv environment file to load your environment variables if you need a specific configuration.

```
your .env file:
SDK_MODE = choose between RECETTE, SANDBOX and PROD (if no mode provided, default mode will be SANDBOX and the requests will automatically be made with url https://sb.forcharity.io)
SDK_HOST = your customed url here (you need to choose a specific mode (RECETTE or SANDBOX) as well to be allowed to custom the url inside sdk)
```

```Javascript
require('dotenv').config('/.env');
import { Sdk, Mode } from 'api-green-node';

const specialConfig = {
    mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
    host: process.env.SDK_HOST || null,
};

const sdk = new Sdk(specialConfig);
```

-   Login with Tokens
    If you already have your tokens, you just need to instanciate our sdk with a config object.

| Name         | Type                | Description                                                                                                                                                            |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token        | <code>string</code> | access token which expires in 14400s                                                                                                                                   |
| refreshToken | <code>string</code> | refresh token to get a new valid access token                                                                                                                          |
| mode         | <code>Enum</code>   | optional - choose between 3 modes 'RECETTE', 'SANDBOX', 'PROD' that correspond to 3 different host urls. if nothing is provided mode 'SANDBOX' will be used by default |

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
    mode: Mode.RECETTE,
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
    carbon.addWebFootprint()
    carbon.simulateWebFootprint()
    carbon.addTransportationFootprint()
    carbon.simulateTransportationFootprint()
    carbon.getOneFootprint()
    carbon.getAllFootprints()
    carbon.closeFootprint()
    carbon.purchaseFootprint()
    carbon.emptyFootprint()
    carbon.getOnePurchase()
    carbon.getAllPurchases()

//CarbonReports Class
    carbonReports.get()

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

STEP 1: CREATE THE WEB FOOTPRINT

-   Each footprint is identified by its unique `fingerprint`. To be sure to have a unique fingerPrint, please check [Documentation](https://github.com/PayGreen/api-green-node/doc).
-   You can make a carbon footprint in multiple calls, mix with transportation, add a web footprint on top of it, as long as you use the SAME fingerprint and if you haven't closed or purchased the carbon footprint.

```
import { WebFootprint } from 'api-green-node';

const newWebData = new WebFootprint(
    fingerprint,
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
    140,
    6,
    180,
);
```

STEP 2 : ADD THE WEB FOOTPRINT (Only admin can add a carbon footprint)

```
    return sdk.carbon
        .addWebFootprint(newWebData)
        .then((res) => {
            console.log(res)
        });
```

STEP 3 : PURCHASE (FINALIZE) THE WEB FOOTPRINT

```
    return sdk.carbon
        .purchaseFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

### Get your carbon reports

-   If you have created and completed/purchased carbon footprints, you can now get reports and see all your carbon footprints credit purchases.
-   Get carbon reports from last month by default, request a specific period, or even get daily data details

| Param  | Type                          | Description                                                                               |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------- |
| params | <code>IReportURLParams</code> | optional, all query params to filter reports requests based on IReportURLParams interface |

-   IReportURLParams: object with specifications of all possible params to apply to filter data :

```
  params = {
      begin?: string | null; // begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
      end?: string | null; // end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
      daily?: 0 | 1 | null ; // numeric literal types are 0 | 1, if 1, day by day data will be provided;
  }
```

-   get all carbon reports, no filter applied. default mode will provide data from the last past 30 days.
```
    return sdk.carbonReports
        .get()
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
SDK_MODE = choose between RECETTE, SANDBOX and PROD (if no mode provided, default mode will be SANDBOX and the requests will automatically be made with url https://sb.forcharity.io)
SDK_HOST = your customed url here (you need to choose a specific mode (RECETTE or SANDBOX) as well to be allowed to custom the url inside sdk)
```

## Questions & support

Don't hesitate to contact tech@paygreen.fr (or create an issue on github) for any questions.
