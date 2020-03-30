require('dotenv').config('/.env');
import { Transport } from '../src/enums';
import { PathEstimate, WebEstimate } from '../src/models';

test('Add fingerprint of a web estimation with Model', () => {
    const webEstimationTest = new WebEstimate();
    webEstimationTest.fingerprint = 'NewFingerPrint';
    expect(webEstimationTest.fingerprint).toEqual('NewFingerPrint');
});

test('Add complete web estimation of a carbon estimate with Model', () => {
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

test('Add complete path estimation of a carbon estimate with Model', () => {
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
        Transport.Bus,
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
    const pathTest = new PathEstimate('NewFingerPrint', 20, 1, [path1, path2]);
    expect(pathTest).toMatchObject({
        type: 'path',
        fingerprint: 'NewFingerPrint',
        addresses: [
            {
                address: 'Rue Capitaine Cocart',
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
                address: 'Rue Capitaine Cocart',
                zipCode: '91120',
                city: 'Lille',
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
