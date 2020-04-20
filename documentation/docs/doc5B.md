---
id: doc5B
title: Users - Create Data
---

Here you will find all informations to create a New User Object with our User Model class.
- both country and role are based on enumeration for autocompletion.
- for role : you have to choose between 'ADMIN' and 'USER'. Please remember only administrator level has access to all actions.
- for country : all countries are available in format ISO31661Alpha2.

## Object expected by API Green : 
| Name | Type | Description |
| --- | --- | --- |
| lastname | <code>string</code> | email address of the user |
| firstname | <code>string</code> | country of the user |
| publicname | <code>string</code> | public name of the user |
| role | <code>enum</code> | role of the user |
| password | <code>string</code> | password of the user |
| username | <code>string</code> | unique identifier for the user |
| email | <code>string</code> | email address of the user |
| country | <code>enum</code> | country of the user |

```
{
    lastname: string,
    firstname: string,
    publicname: string,
    role: enum,
    username: string,
    password: string,
    contact: {
        email: string,
        country: enum
    }
}

```

## Add one information at a time :

```
import { User } from 'api-green-node';

const newUser = new User();
    newUser.firstname = 'Jean';

```
## Or all at once  :

```
import { User, Mode, Role } from 'api-green-node';

const newUser = new User(
        'Dupont',
        'Jean',
        'JD',
        Role.ADMIN,
        JD22,
        'password',
        'jd@example.com',
        Country.FR,
    );

```
### We have built special method to verify the data before sending it to API. [Try it here](doc9#verify)