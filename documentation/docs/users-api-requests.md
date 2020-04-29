---
id: users-api-requests
title: Users - Api Requests
---
A User is the second part of your identity in our API (along with the Account). The access level of your User (Administrator, User) defines what kind of actions or the kind of data you can access.
By default, PayGreen will provide you an Account and an Administrator-level User.

### Multiple Users :
One Account can have multiple Users attached to it. We have defined two level of Users for your convenience:
Administrator user level: which has access to all actions for your Account.
Simple User level: which has a more limited access (e.g. can't create other users).

## user.getAll()
- Get a list of users based on accountId, only Admin can see other users.
```
    return sdk.user
        .getAll()
        .then((res) => {
            console.log(res)
        });
```
- Api Response : the `_embedded` object inside API response contains an array of all users associated to your account.
```
{
    success: true,
    dataInfo: {
        _links: { self: [Object] },
        _embedded: { user: [Array] },
        total_items: 15
    },
    status: 200
}   
```
## user.getOne()
| Param | Type | Description |
| --- | --- | --- |
| userName | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserName to get a different user of the company account |
- Get information about one user based on his Username.
```
    return sdk.user
        .getOne(userName?)
        .then((res) => {
            console.log(res)
        }};
```
- Api Response : the object inside API response contains all informations about the user requested.
```
{
    success: true,
    dataInfo: {
        username: 'paygreen',
        firstname: 'Golade',
        lastname: 'Larry',
        publicname: 'Larry Golade - Paygreen',
        createdAt: '1576859744',
        enabledAt: '1576859744',
        role: 'ADMIN',
        accountId: 'paygreen',
        _links: { self: [Object] }
    },
    status: 200
}   
```
## user.create()
| Param | Type | Description |
| --- | --- | --- |
| newUser | <code>UserModel</code> | Admin Only - object containing all new user information |
- Get object with new user created.
- To create a new user, we highly recommend you to use our User Model Class to ensure full compatibility with the API. (especially for 'role' and 'country' that are specific formats). [Try it here](users-data.md)
```
    return sdk.user
        .create(newUser)
        .then((res) => {
            console.log(res)
        });
```
- API Response : the object inside API response contains all informations about the user created.
```
{
    success: true,
    dataInfo: {
        username: 'mc3165',
        firstname: 'matthieu',
        lastname: 'coulon',
        publicname: 'mattmatt',
        createdAt: 1587133482,
        enabledAt: 1587133482,
        role: 'ADMIN',
        accountId: 'paygreen',
        _links: { self: [Object] }
    },
    status: 201
}   
```
## user.update()
| Param | Type | Description |
| --- | --- | --- |
| updatedUser | <code>UserModel</code> | Object containing all new user information |
| userName | <code>string</code> | Optional, by default UserName used will be the one from identity, only Admin can use a specific UserName to modify a different user of the company account |

- Get object with new data updated  
- To update an user, we highly recommend you to use our User Model Class to ensure full compatibility with the API. [Try it here](users-data.md)
```
    return sdk.user
        .update(updatedUser, userName?)
        .then((res) => {
            console.log(res)
        });
```
- API Response : the object inside API response contains all informations about the user updated.
```
{
    success: true,
    dataInfo: {
        username: 'mc3165',
        firstname: 'jean',
        lastname: 'coulon',
        publicname: 'jeanjean',
        createdAt: '1587133482',
        enabledAt: '1587133482',
        role: 'ADMIN',
        accountId: 'paygreen',
        _links: { self: [Object] }
    },
    status: 200
}   
```
## user.delete()
| Param | Type | Description |
| --- | --- | --- |
| userName | <code>string</code> | Admin Only - to delete one user from the company account |
- Get response with status 204 if success.  
```
    return sdk.user
        .delete(userName)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'user deleted successfully',
    status: 204,
}   
```
