---
id: doc4
title: Account - Api Request
---

An Account is the base of your identity in our API. This is like a namespace for your data.

## user.getAccount()

- get information of the account based on accountId.
```
    return sdk.user
        .getAccount()
        .then((res) => {
            console.log(res)
        }})
    };
```
- Api Response
```
{
    success: true,
    dataInfo: { client_id: 'paygreen', _links: { self: [Object] } },
    status: 200
}
```
