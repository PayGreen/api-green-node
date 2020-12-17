require('dotenv').config('/.env');
import { Sdk } from '../src';
import { Host, Mode, UserType } from '../src/enums';
import { autoLocaleConfig } from './config/autoConfig';

test('Sdk has properties _tokens & _identity', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));

    expect(sdk).toHaveProperty('_tokens');
    expect(sdk).toHaveProperty('_identity');
});

test('Sdk constructor initializes correctly with all the parameters', async () => {
    const sdk = new Sdk(await autoLocaleConfig(UserType.SHOP));
    const host: string = process.env.SDK_HOST as string;
    const mode: string = process.env.SDK_MODE as string;

    expect(sdk.host).toBe(host || Host[Mode[Mode.SANDBOX]]);
    expect(sdk.mode).toEqual(Mode[mode] ?? Mode.SANDBOX);
});

const sdk2 = new Sdk();

test('Sdk constructor initializes correctly with default value for mode & host(sandbox)', () => {
    expect(sdk2.mode).toEqual(Mode.SANDBOX);
    expect(sdk2.host).toEqual(Host[Mode[Mode.SANDBOX]]);
});

test('Sdk constructor initializes correctly with or without customed value for mode & host from .env file', () => {
    const localConfig = {
        mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
        host: process.env.SDK_HOST || null,
        token: '',
        refreshToken: '',
    };
    const sdk3 = new Sdk(localConfig);

    if (localConfig.mode) {
        expect(sdk3.mode).toEqual(localConfig.mode);
    }

    if (localConfig.host && localConfig.mode) {
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
