require('dotenv').config('/.env');
import { Sdk } from '../src';
import { User } from '../src/models';
import { ApiResponse } from '../src/models/ApiResponse';
import { Mode } from '../src/enums/Mode';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};
const sdk = new Sdk(config);

test('it gets the account based on account id', () => {
    return sdk.user.getAccount().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.success).toBe(true),
            expect(data.dataInfo).toHaveProperty(
                'client_id',
                process.env.SDK_ACCOUNTID,
            );
    });
});

test('it gets all users of one account id', () => {
    return sdk.user.getAll().then((data: any) => {
        expect(data).toBeDefined();
    });
});

test('it gets one user based on his username', () => {
    return sdk.user.getOne().then((data: any) => {
        expect(data.dataInfo).toHaveProperty('username', 'paygreen');
    });
});

test('it gets an error message because of wrong username', () => {
    return sdk.user.getOne('paygreendfd').then((data: any) => {
        expect(ApiResponse.isInvalid(data)).toBe(true),
            expect(ApiResponse.getErrorMessage(data)).toBe('Entity not found.');
        expect(ApiResponse.getStatus(data)).toEqual(404);
    });
});

test('it returns the created user', () => {
    const userTest = new User(
        'coulon',
        'matthieu',
        'mattmatt',
        'ADMIN',
        'mc',
        'mcpassword',
        'matt@example.com',
        'fr',
    );
    return sdk.user.create(userTest).then((data: any) => {
        expect(data.dataInfo).toHaveProperty('lastname', 'coulon'),
            expect(data.dataInfo).toHaveProperty('firstname', 'matthieu'),
            expect(data.dataInfo).toHaveProperty('publicname', 'mattmatt'),
            expect(data.dataInfo).toHaveProperty('role', 'ADMIN');
        expect(data.dataInfo).toHaveProperty('username', 'mc');
    });
});

test('it returns the updated user based on his username', () => {
    const userTest = new User(
        'coulon',
        'newmatthieu',
        'mattmatt',
        'ADMIN',
        'mc',
        'mcpassword',
        'matt@example.com',
        'fr',
    );
    return sdk.user.update(userTest, 'mc').then((data: any) => {
        expect(data.dataInfo).toHaveProperty('lastname', 'coulon'),
            expect(data.dataInfo).toHaveProperty('firstname', 'newmatthieu'),
            expect(data.dataInfo).toHaveProperty('role', 'ADMIN');
        expect(data.dataInfo).toHaveProperty('username', 'mc');
    });
});

test('it returns 204 status when deleting user', () => {
    return sdk.user.delete('user1').then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true),
            expect(data.status).toEqual(204);
    });
});

const wrongConfig = {
    token: 'wrong token',
    refreshToken: 'wrong refresh token',
    mode: Mode.DEV,
};

const sdk2 = new Sdk(wrongConfig);

test('it gets an error because of wrong token', () => {
    return sdk2.user.getAll().then((data: any) => {
        expect(ApiResponse.isInvalid(data)).toBe(true),
            expect(ApiResponse.getErrorMessage(data)).toBe('Unauthorized');
        expect(ApiResponse.getStatus(data)).toEqual(401);
    });
});