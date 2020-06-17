require('dotenv').config('/.env');
import { Sdk } from '../src';
import { Mode } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};
const sdk = new Sdk(config);

test('Sdk has properties _tokens & _identity', () => {
    expect(sdk).toHaveProperty('_tokens');
    expect(sdk).toHaveProperty('_identity');
});

test('Sdk constructor initializes correctly with all the parameters', () => {
    expect(sdk.token).toBe(process.env.SDK_TOKEN);
    expect(sdk.refreshToken).toBe(process.env.SDK_REFRESHTOKEN);
    expect(sdk.mode).toEqual(0);
});

const sdk2 = new Sdk();

test('Sdk constructor initializes correctly with default value for mode', () => {
    expect(sdk2.mode).toEqual(2);
});
