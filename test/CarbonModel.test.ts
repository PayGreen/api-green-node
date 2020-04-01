require('dotenv').config('/.env');
import { Transport } from '../src/enums';
import {
    Address,
    Coordinate,
    Path,
    PathEstimate,
    Tools,
    WebEstimate,
} from '../src/models';

const tools = new Tools();
const randomFingerprint = tools.randomFingerprint();

test('it adds a fingerprint of a web estimation with Model', () => {
    const webEstimationTest = new WebEstimate();
    webEstimationTest.fingerprint = randomFingerprint;
    expect(webEstimationTest.fingerprint).toEqual(randomFingerprint);
});

test('it creates a web estimation of a carbon estimate with Model', () => {
    const webTest = new WebEstimate(
        'NewFingerPrint',
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        140,
        6,
        180,
    );
    expect(webTest).toMatchObject({
        type: 'web',
        fingerprint: 'NewFingerPrint',
        webNavigation: {
            userAgent:
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
            device: '',
            browser: '',
            countImages: 140,
            countPages: 6,
            time: 180,
            externalId: null,
        },
    });
});

test('it creates a path simulation for carbon estimate with Address Model', () => {
    const address1 = new Address(
        '22 rue Capitaine Cocart',
        '91120',
        'Palaiseau',
        'France',
    );
    const address2 = new Address(
        '72 rue de la République',
        '76140',
        'Le Petit Quevilly',
        'France',
    );
    const address3 = new Address(
        '24 rue du Faubourg',
        '75003',
        'Paris',
        'France',
    );
    const path1 = new Path(address1, address2, Transport.Bus);
    const path2 = new Path(
        address2,
        address3,
        Transport['TER France - Diesel'],
    );

    const pathTest = new PathEstimate('NewFingerPrint', 20, 1, [path1, path2]);

    expect(pathTest).toMatchObject({
        type: 'path',
        fingerprint: 'NewFingerPrint',
        addresses: [
            {
                address: '22 rue Capitaine Cocart',
                zipCode: '91120',
                city: 'Palaiseau',
                country: 'France',
            },
            {
                address: '72 rue de la République',
                zipCode: '76140',
                city: 'Le Petit Quevilly',
                country: 'France',
            },
            {
                address: '24 rue du Faubourg',
                zipCode: '75003',
                city: 'Paris',
                country: 'France',
            },
        ],
        transports: [
            {
                uuidTransport: 'bus-diesel',
            },
            {
                uuidTransport: 'ter-france-diesel',
            },
        ],
    });
});

test('it creates a mixed path simulation for carbon estimate with Address + Coordinate Models', () => {
    const address1 = new Coordinate(
        'New-York',
        'Etats-Unis',
        '40.725863',
        '-74.039987',
    );
    const address2 = new Coordinate(
        'Roissy-en-France',
        'France',
        '49.009901',
        '2.542471',
    );
    const address3 = new Address(
        '72 rue de la République',
        '76140',
        'Le Petit Quevilly',
        'France',
    );
    const path1 = new Path(address1, address2, Transport['Plane < 10000km']);
    const path2 = new Path(
        address2,
        address3,
        Transport['TER France - Diesel'],
    );

    const pathTest = new PathEstimate('NewMixNYFrance', 20, 1, [path1, path2]);

    expect(pathTest).toMatchObject({
        type: 'path',
        fingerprint: 'NewMixNYFrance',
        addresses: [
            {
                address: '',
                zipCode: '',
                city: 'New-York',
                country: 'Etats-Unis',
                latitude: '40.725863',
                longitude: '-74.039987',
            },
            {
                address: '',
                zipCode: '',
                city: 'Roissy-en-France',
                country: 'France',
                latitude: '49.009901',
                longitude: '2.542471',
            },
            {
                address: '72 rue de la République',
                zipCode: '76140',
                city: 'Le Petit Quevilly',
                country: 'France',
            },
        ],
        transports: [
            {
                uuidTransport: 'plane-10000',
            },
            {
                uuidTransport: 'ter-france-diesel',
            },
        ],
    });
});