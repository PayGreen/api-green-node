require('dotenv').config('/.env');
import { Transport } from '../src/enums';
import {
    Address,
    Coordinate,
    Path,
    TransportationFootprint,
    Tools,
    WebFootprint,
    WebFootprintSimulation,
} from '../src/models';

const randomFingerprint = Tools.randomFingerprint();

test('it adds a fingerprint of a web estimation with Model', () => {
    const webFootprintTest = new WebFootprint();
    webFootprintTest.fingerprint = randomFingerprint;
    expect(webFootprintTest.fingerprint).toEqual(randomFingerprint);
});

test('it creates a web data with fingerprint of a carbon footprint with Model', () => {
    const webTest = new WebFootprint(
        'NewFingerPrint',
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        140,
        6,
        180,
    );
    expect(webTest).toMatchObject({
        userAgent:
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        device: '',
        browser: '',
        countImages: 140,
        countPages: 6,
        time: 180,
        externalId: '',
        fingerprint: 'NewFingerPrint',
    });
    return Tools.verify(webTest).then((data: any) => {
        expect(data).toBe('validation succeed');
    });
});

test('it creates a web simulation of a carbon footprint withput fingerprint with Model', () => {
    const webSimulationTest = new WebFootprintSimulation(
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        140,
        6,
        180,
    );
    expect(webSimulationTest).toMatchObject({
        userAgent:
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        device: '',
        browser: '',
        countImages: 140,
        countPages: 6,
        time: 180,
        externalId: '',
    });
    return Tools.verify(webSimulationTest).then((data: any) => {
        expect(data).toBe('validation succeed');
    });
});

test('it creates a path simulation for carbon footprint with Address Model', () => {
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

    const pathTest = new TransportationFootprint('NewFingerPrint', 20, 1, [
        path1,
        path2,
    ]);

    expect(pathTest).toMatchObject({
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
    return Tools.verify(pathTest).then((data: any) => {
        expect(data).toBe('validation succeed');
    });
});

test('Verify method returns error with the name of the wrong property latitude', () => {
    const address1 = new Coordinate(
        'New-York',
        'Etats-Unis',
        'wrong latitude',
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

    const pathTest = new TransportationFootprint('NewMixNYFrance', 20, 1, [
        path1,
        path2,
    ]);
    return Tools.verify(pathTest).then((data: any) => {
        expect(data[0].children[0].children[0]).toHaveProperty(
            'property',
            'latitude',
        );
    });
});

test('it creates a mixed path simulation for carbon footprint with Address + Coordinate Models', () => {
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

    const pathTest = new TransportationFootprint('NewMixNYFrance', 20, 1, [
        path1,
        path2,
    ]);

    expect(pathTest).toMatchObject({
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
