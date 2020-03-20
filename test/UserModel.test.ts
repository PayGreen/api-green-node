require('dotenv').config('/.env');
import { User } from '../src/models';
import { Country, Role } from '../src/enums';
import { deserialize, serialize } from 'typescript-json-serializer';

test('Add firstname of a user with User Model', () => {
    const userTest = new User();
    userTest.firstname = 'New FirstName';
    expect(userTest.firstname).toEqual('New FirstName');
});

test('Add complete profile of a user with User Model', () => {
    const userTest = new User(
        'bouffier2',
        'fanny2',
        'fb2',
        Role.ADMIN,
        'fb2',
        'fb2',
        'fb2@example.com',
        Country.FR,
    );
    expect(userTest).toMatchObject({
        lastname: 'bouffier2',
        firstname: 'fanny2',
        publicname: 'fb2',
        role: 'ADMIN',
        username: 'fb2',
        password: 'fb2',
        contact: {
            email: 'fb2@example.com',
            country: 'FR',
        },
    });
});

test('deserialize received data to fit User Model', () => {
    const data = {
        lastname: 'bouffier2',
        firstname: 'fanny2',
        publicname: 'fb2',
        role: 'ADMIN',
        username: 'fb2',
        password: 'fb2',
        contact: {
            email: 'fb2@example.com',
            country: 'FR',
        },
    };
    const finalData = deserialize(data, User);
    expect(finalData).toMatchObject({
        lastname: 'bouffier2',
        firstname: 'fanny2',
        publicname: 'fb2',
        role: 'ADMIN',
        username: 'fb2',
        password: 'fb2',
        contact: {
            email: 'fb2@example.com',
            country: 'FR',
        },
    });
});

test('Verify method throws error with wrong email syntax', () => {
    const userTest = new User(
        'bouffier2',
        'fanny2',
        'fb2',
        Role.ADMIN,
        'fb2',
        'fb2',
        'fb2example.com',
        Country.FR,
    );
    expect(() => {
        userTest.verify(userTest);
    }).toThrowError('Error in email syntax, please verify your email');
});
