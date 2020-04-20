---
id: doc3
title: Authentication
---

Login with your ids/tokens is required to access to our API Green.
Accounts are created by PayGreen only. To create an Account, please email us at tech@PayGreen.fr to obtain your ids. You will be provided with an account id, a username (unique id) and a password. 

## Login with Account Informations
The API Green uses an OAuth2 security scheme with a Token/Refresh Url. If you don't have any tokens yet, you need to make a first API Call using your username, password and account id. Use the `authentication.login()` method. If all informations provided are correct, the API response will contain an access token and a refresh token. 

```
import { Sdk } from 'api-green-node';

const sdk = new Sdk()
    return sdk.authentication
        .login(yourUsername, yourPassword, yourAccountId)
        .then((res) => {
            console.log(res)
        }})
    };
```
- you can modify each data individually inside the Sdk Class if needed :

```
    sdk.username = 'myUserName';
```


## API Responses Schemas
For an easier understanding, API responses are formatted this way : 

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code> | for success or fail of the request |
| dataInfo | <code>object</code> | global object with all informations about data if success or with error details in case of fail |
| status | <code>number</code> | http response status number
### if success : 
```
{
    success: true,
    dataInfo: object,
    status: number,
}
```
### if errors : 
```
{
    success: false,
    dataInfo: {
        type: string,
        title: string,
        status: number,
        detail: string
    }
}
```
We have created special tools to quickly access informations inside the response, like http status or error details. You can find them [here.](doc9.md) 

## Example with response containing Tokens

```
{
    success : true,
    dataInfo : {
        access_token: "2da80kjzhdjzhdljh77kjzehzekj755vd6eb8be0ce6ad",
        expires_in: 14400,
        token_type: "Bearer",
        scope: null,
        refresh_token: "66cehjdhezj775ljhj54ljhh65797kmhk8797dc58343b2"
    },
    status : 200
}
```
## Example with error response :
```
{
    success: false,
    dataInfo: {
        type: 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
        title: 'Not Found',
        status: 404,
        detail: 'Entity not found.'
    }
}
```
## Login with Tokens
If you already have your tokens, you just need to instanciate our sdk with a config object. 
| Name | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | access token which expires in 14400s |
| refreshToken | <code>string</code> | refresh token to get a new valid access token |
| mode | <code>Enum</code> | choose between 3 modes 'DEV', 'PREPROD', 'PROD' that correspond to 3 different host modes - optional, if not provided mode 'PROD' will be used by default
```
const config = {
    token: string,
    refreshToken: string,
    mode?: enum,
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

## Refresh your Tokens
After 14400s, your access token will expire. If you try to make API request you will receive a `401 Unauthorized error`. You need to use the `authentication.refresh()` method to get a new one. Use the same config object than previously. 

```
import { Sdk, Mode } from 'api-green-node';

const sdk = new Sdk(config);
    return sdk.authentication
        .refreshToken(yourAccountId)
        .then((res) => {
            console.log(res)
        }})
```

We are done! You can now use the Api!