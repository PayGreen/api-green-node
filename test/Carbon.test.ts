require('dotenv').config('/.env');
import { Sdk } from '../src';
import { ApiResponse, PathEstimate, WebEstimate } from '../src/models';
import { Mode, Transport } from '../src/enums';

const config = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: Mode.DEV,
};
const sdk = new Sdk(config);

const randomFingerPrint = `fingerprint${Math.floor(Math.random() * 10000)}`;

test('it adds a web estimate', () => {
    const newWebEstimate = new WebEstimate(
        randomFingerPrint,
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        140,
        6,
        180,
    );
    return sdk.carbon.addWebEstimate(newWebEstimate).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.status).toEqual(201);
    });
});

test('it gets an estimate based on fingerPrint', () => {
    return sdk.carbon.getEstimate(randomFingerPrint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('fingerprint',randomFingerPrint);
    });
});

const randomFingerPrint2 = `fingerprint${Math.floor(Math.random() * 10000)}`;

test('it adds a path estimate', () => {
    const path = new PathEstimate();
    const path1 = path.createPath(
        'Rue Capitaine Cocart',
        '91120',
        'Palaiseau',
        'France',
        '72 rue de la République',
        '76140',
        'Le Petit Quevilly',
        'France',
        Transport["Plane < 5000km"],
    );
    const path2 = path.createPath(
        '72 rue de la République',
        '76140',
        'Le Petit Quevilly',
        'France',
        'Rue Capitaine Cocart',
        '91120',
        'Lille',
        'France',
        Transport['TER France - Diesel'],
    );
    const newPathEstimate = new PathEstimate(randomFingerPrint2, 20, 1, [path1, path2]);
    return sdk.carbon.addPathEstimate(newPathEstimate).then((data: any) => {
        console.log('data', data)
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.status).toEqual(201);
    });
});

test('it completes an estimate based on fingerPrint', () => {
    return sdk.carbon.completeEstimate(randomFingerPrint2).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.status).toEqual(200);
    });
});

test('it deletes an estimate based on fingerPrint if it is not completed', () => {
    return sdk.carbon.deleteEstimate(randomFingerPrint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true)
        expect(data.status).toEqual(204);
    });
});