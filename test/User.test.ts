require('dotenv').config('/.env');
import Chance from 'chance';
import { Sdk } from '../src';
import { User } from '../src/models';
import { ApiResponse } from '../src/models/ApiResponse';
import { Country, Mode, Role, UserType } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('it gets the account based on account id', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.user.getAccount().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.success).toBe(true),
            expect(data.dataInfo).toHaveProperty(
                'client_id',
                process.env.SDK_SHOP_ACCOUNTID,
            );
        expect(data.dataInfo.client_secret).toBeUndefined();
        expect(ApiResponse.getId(data)).toHaveProperty(
            'client_id',
            process.env.SDK_SHOP_ACCOUNTID,
        );
    });
});

test('it gets all users of one account id and then gets all ids directly', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.user.getAll().then((data: any) => {
        expect(data).toBeDefined();
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty('username');
        }
    });
});

test('it cannot get all users of one account  with charity user type (role=ASSOCIATION)', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.CHARITY));

    return sdk.user.getAll().then((data: any) => {
        expect(data.success).toBe(false);
        expect(ApiResponse.isInvalid(data)).toBe(true);
    });
});

test('it gets an error message because of wrong username', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.user.getOne('paygreendfd').then((data: any) => {
        expect(ApiResponse.isInvalid(data)).toBe(true),
            expect(ApiResponse.getErrorMessage(data)).toBe('Entity not found.');
        expect(ApiResponse.getStatus(data)).toEqual(404);
    });
});

// Creating a new random user with Chance.js
const newUser = () => {
    let chance = new Chance();

    const randomPublicUserName = chance.name();
    const randomUserFirstName = randomPublicUserName.substr(
        0,
        randomPublicUserName.indexOf(' '),
    );
    const randomUserLastName = randomPublicUserName.substr(
        randomPublicUserName.indexOf(' ') + 1,
        randomPublicUserName.length,
    );
    const randomUserName = randomPublicUserName.replace(' ', '').toLowerCase();

    const newUser = new User(
        randomUserLastName,
        randomUserFirstName,
        randomPublicUserName,
        Role.ADMIN,
        randomUserName,
        `${randomUserFirstName.slice(0, 1)}${randomUserLastName.slice(
            0,
            1,
        )}password`,
        `${randomUserName}@mail.com`,
        Country.FR,
    );

    return newUser;
};

const userTest = newUser();

test('it returns the created user', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.user.create(userTest).then((data: any) => {
        expect(data.dataInfo).toHaveProperty('lastname', userTest.lastname),
            expect(data.dataInfo).toHaveProperty(
                'firstname',
                userTest.firstname,
            ),
            expect(data.dataInfo).toHaveProperty(
                'publicname',
                userTest.publicname,
            ),
            expect(data.dataInfo).toHaveProperty('role', 'ADMIN');
        expect(ApiResponse.getId(data)).toHaveProperty(
            'username',
            userTest.username,
        );
    });
});

test('it returns the updated user based on his username', async () => {
    const updatedUser = {
        lastname: 'coulon',
        firstname: 'matthieu',
    };

    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));
    const username: string = userTest.username as string;

    return sdk.user.update(updatedUser, username).then((data: any) => {
        expect(data.dataInfo).toHaveProperty('lastname', 'coulon'),
            expect(data.dataInfo).toHaveProperty('firstname', 'matthieu'),
            expect(ApiResponse.getId(data)).toHaveProperty(
                'username',
                userTest.username,
            );
    });
});

test('it returns 204 status when deleting user', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));
    const username: string = userTest.username as string;

    return sdk.user.delete(username).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.status).toEqual(204);
    });
});

test('it gets one user based on his username and then gets his id directly', async () => {
    const userTest2 = newUser();
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    return sdk.user.create(userTest2).then((data: any) => {
        const userId = data.dataInfo.username;
        return sdk.user.getOne(userId).then((data: any) => {
            expect(data.dataInfo).toHaveProperty('firstname');
            expect(data.dataInfo).toHaveProperty('lastname');
            expect(ApiResponse.getId(data)).toHaveProperty(
                'username',
                userTest2.username,
            );
        });
    });
});

test('it gets an error because of wrong token', () => {
    const wrongConfig = {
        token: 'wrong token',
        refreshToken: 'wrong refresh token',
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST ? process.env.SDK_HOST : null,
    };
    const sdk2 = new Sdk(wrongConfig);

    return sdk2.user.getAll().then((data: any) => {
        expect(ApiResponse.isInvalid(data)).toBe(true),
            expect(ApiResponse.getErrorMessage(data)).toBe('Unauthorized');
        expect(ApiResponse.getStatus(data)).toEqual(401);
    });
});

export { newUser };
