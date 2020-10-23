require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { Sdk } from '../src';
import { Host, Mode } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.RECETTE,
};
const sdk = new Sdk(config);

test('Sdk has properties _tokens & _identity', () => {
    expect(sdk).toHaveProperty('_tokens');
    expect(sdk).toHaveProperty('_identity');
});

test('Sdk constructor initializes correctly with all the parameters from config object', () => {
    expect(sdk.token).toBe(process.env.SDK_TOKEN);
    expect(sdk.refreshToken).toBe(process.env.SDK_REFRESHTOKEN);
    expect(sdk.mode).toEqual(Mode.RECETTE);
});

const sdk2 = new Sdk();

test('Sdk constructor initializes correctly with default value for mode & host(sandbox)', () => {
    expect(sdk2.mode).toEqual(Mode.SANDBOX);
    expect(sdk2.host).toEqual(Host[Mode[Mode.SANDBOX]]);
});

test('Sdk constructor initializes correctly with or without customed value for mode & host from .env file', () => {
    const sdk3 = new Sdk(localConfig);

    if (localConfig.mode) {
        expect(sdk3.mode).toEqual(localConfig.mode);
    }

    if (localConfig.host & localConfig.mode) {
        expect(sdk3.host).toEqual(localConfig.host);
    }

    if (localConfig.mode && localConfig.host === null) {
        expect(sdk3.host).toEqual(Host[Mode[localConfig.mode]]);
    }

    if (localConfig.mode === null && localConfig.host) {
        expect(sdk3.host).toEqual(Host[Mode[Mode.SANDBOX]]);
    }

    if (localConfig.mode === null && localConfig.host === null) {
        expect(sdk3.host).toEqual(Host[Mode[Mode.SANDBOX]]);
    }
});
