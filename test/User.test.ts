require('dotenv').config('/.env');
import { Sdk } from '../src';
import { User } from '../src/models';
import { ApiResponse } from '../src/models/ApiResponse';
import { Mode } from '../src/enums/Mode';

const config = {
    token : process.env.SDK_TOKEN,
    refreshToken : process.env.SDK_REFRESHTOKEN,
    mode : Mode.DEV,
}
    const sdk = new Sdk(config)

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

    test('it gets an error because of wrong token', () => {
        return sdk.user.getAll().then((data: any) => {
            expect(ApiResponse.isInvalid(data)).toBe(true),
                expect(ApiResponse.getErrorMessage(data)).toBe('Unauthorized');
            expect(ApiResponse.getStatus(data)).toEqual(401);
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
                expect(ApiResponse.getErrorMessage(data)).toBe(
                    'Entity not found.',
                );
            expect(ApiResponse.getStatus(data)).toEqual(404);
        });
    });

    test('it returns the created user', () => {
        const userTest = new User(
            'bouffier400',
            'fanny400',
            'fb400',
            'ADMIN',
            'fb450',
            'fb400',
            'fb6@example.com',
            'fr',
        );
        return sdk.user.create(userTest).then((data: any) => {
            expect(data.dataInfo).toHaveProperty('lastname', 'bouffier400'),
                expect(data.dataInfo).toHaveProperty('firstname', 'fanny400'),
                expect(data.dataInfo).toHaveProperty('publicname', 'fb400'),
                expect(data.dataInfo).toHaveProperty('role', 'ADMIN');
            expect(data.dataInfo).toHaveProperty('username', 'fb450');
        });
    });

    test('it returns the updated user based on his username', () => {
        const userTest = new User(
            'bouffier90',
            'fanny90',
            'fb90',
            'ADMIN',
            'fb90',
            'fb90',
            'fb90@example.com',
            'fr',
        );
        return sdk.user.update(userTest, 'fb90').then((data: any) => {
            expect(data.dataInfo).toHaveProperty('lastname', 'bouffier90'),
                expect(data.dataInfo).toHaveProperty('firstname', 'fanny90'),
                expect(data.dataInfo).toHaveProperty('role', 'ADMIN');
            expect(data.dataInfo).toHaveProperty('username', 'fb90');
        });
    });

    test('it returns 204 status when deleting user', () => {
        return sdk.user.delete('user1').then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true),
                expect(data.status).toEqual(204);
        });
    });