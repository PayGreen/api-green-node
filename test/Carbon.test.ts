require('dotenv').config('/.env');
const { localConfig } = require('./config/localConfig');
import { Sdk } from '../src';
import {
    Address,
    Coordinate,
    ApiResponse,
    Path,
    TransportationFootprint,
    TransportationFootprintSimulation,
    Tools,
    WebFootprint,
    WebFootprintSimulation,
} from '../src/models';
import { Status, Transport } from '../src/enums';

const sdk = new Sdk(localConfig);
const newWebFootprintSimulation = new WebFootprintSimulation(
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
    140,
    6,
    180,
);

test('it creates a web footprint simulation without fingerprint', () => {
    return sdk.carbon
        .simulateWebFootprint(newWebFootprintSimulation)
        .then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true);
        });
});

test('it gets an error when trying to add a web footprint simulation without fingerprint using addWebFootprint() method', () => {
    return sdk.carbon
        .addWebFootprint(newWebFootprintSimulation)
        .then((data: any) => {
            expect(ApiResponse.isInvalid(data)).toBe(true);
            expect(ApiResponse.getErrorMessage(data)).toBe(
                "you cannot add a web footprint without fingerprint in your web object, data won't be saved",
            );
        });
});

const randomFingerprint = Tools.randomFingerprint();

test('it adds a web footprint with fingerprint', () => {
    const newWebFootprint = new WebFootprint(
        randomFingerprint,
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
        140,
        6,
        180,
    );
    return sdk.carbon.addWebFootprint(newWebFootprint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
    });
});

test('it gets a carbon footprint based on fingerPrint and converts estimated price in euros cents to euros', () => {
    return sdk.carbon.getOneFootprint(randomFingerprint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('fingerprint', randomFingerprint);
        expect(data.dataInfo).toHaveProperty('status', 'ONGOING');
        const PriceInEuros = Tools.eurosCentstoEuros(
            data.dataInfo.estimatedPrice,
        );
        expect(PriceInEuros).toEqual(data.dataInfo.estimatedPrice / 100);
    });
});

test('it tries to get a carbon footprint with wrong fingerPrint', () => {
    return sdk.carbon.getOneFootprint('wrongFingerprint').then((data: any) => {
        expect(ApiResponse.isInvalid(data)).toBe(true);
        expect(ApiResponse.getErrorMessage(data)).toBe(
            'Footprint not found with this fingerprint: wrongFingerprint',
        );
    });
});

test("it gets a carbon footprint based on fingerPrint and gets its id 'fingerPrint' directly", () => {
    return sdk.carbon.getOneFootprint(randomFingerprint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(ApiResponse.getId(data)).toHaveProperty(
            'fingerprint',
            randomFingerprint,
        );
        expect(data.dataInfo).toHaveProperty('estimatedCarbon');
        expect(data.dataInfo).toHaveProperty('estimatedPrice');
    });
});

test('it empties a carbon footprint based on fingerPrint if it is neither purchased nor closed', () => {
    return sdk.carbon.emptyFootprint(randomFingerprint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.status).toEqual(204);
    });
});

test('it tries to purchase a footprint after having emptied it', () => {
    return sdk.carbon.purchaseFootprint(randomFingerprint).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('status', 'PURCHASED');
        expect(data.dataInfo).toHaveProperty('estimatedCarbon', '0');
    });
});

const randomFingerprint2 = Tools.randomFingerprint();

test('it adds a transportation footprint with fingerprint', () => {
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
    const newTransportationFootprint = new TransportationFootprint(
        randomFingerprint2,
        20,
        1,
        [path1, path2],
    );

    return sdk.carbon
        .addTransportationFootprint(newTransportationFootprint)
        .then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true);
            expect(data.dataInfo).toHaveProperty(
                'fingerprint',
                randomFingerprint2,
            );
        });
});

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
const address3 = new Address('24 rue du Faubourg', '75003', 'Paris', 'France');
const path1 = new Path(address1, address2, Transport.Bus);
const path2 = new Path(address2, address3, Transport['TER France - Diesel']);
const newTransportationFootprintSimulation = new TransportationFootprintSimulation(
    20,
    1,
    [path1, path2],
);

test('it creates a transportation footprint simulation without fingerprint', () => {
    return sdk.carbon
        .simulateTransportationFootprint(newTransportationFootprintSimulation)
        .then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true);
        });
});

test('it gets an error when trying to add a transportation footprint simulation without fingerprint using addTransportationFootprint() method', () => {
    return sdk.carbon
        .addTransportationFootprint(newTransportationFootprintSimulation)
        .then((data: any) => {
            expect(ApiResponse.isInvalid(data)).toBe(true);
            expect(ApiResponse.getErrorMessage(data)).toBe(
                "you cannot add a transportation footprint without fingerprint in your transportation object, data won't be saved",
            );
        });
});

test('it closes a footprint based on fingerPrint', () => {
    return sdk.carbon.closeFootprint(randomFingerprint2).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('status', 'CLOSED');
    });
});

test('it tries to purchase a footprint after having closed it', () => {
    return sdk.carbon
        .purchaseFootprint(randomFingerprint2)
        .then((data: any) => {
            expect(ApiResponse.isInvalid(data)).toBe(true);
            expect(ApiResponse.getErrorMessage(data)).toBe(
                'Purchasing a CarbonFootprint is only allowed when its status is ONGOING (currently CLOSED)',
            );
        });
});

const randomFingerprint3 = Tools.randomFingerprint();

test('it adds a mixed path footprint', () => {
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

    const newTransportationFootprint = new TransportationFootprint(
        randomFingerprint3,
        20,
        1,
        [path1, path2],
    );

    return sdk.carbon
        .addTransportationFootprint(newTransportationFootprint)
        .then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true);
            expect(data.dataInfo).toHaveProperty(
                'fingerprint',
                randomFingerprint3,
            );
        });
});

test('it purchases a footprint based on fingerPrint', () => {
    return sdk.carbon
        .purchaseFootprint(randomFingerprint3)
        .then((data: any) => {
            expect(ApiResponse.isSuccessful(data)).toBe(true);
            expect(data.dataInfo).toHaveProperty('status', 'PURCHASED');
            expect(data.dataInfo).toHaveProperty(
                'fingerprint',
                randomFingerprint3,
            );
        });
});

test('it gets all footprints with no filter', () => {
    return sdk.carbon.getAllFootprints().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'fingerprint',
            );
        }

        data.dataInfo._embedded.footprint.forEach((e) => {
            expect(e).toHaveProperty('estimatedCarbon');
            expect(e).toHaveProperty('estimatedPrice');
        });
    });
});

test('it gets all footprints with CLOSED status', () => {
    const params = {
        status: Status.CLOSED,
    };

    return sdk.carbon.getAllFootprints(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'fingerprint',
            );
        }

        data.dataInfo._embedded.footprint.forEach((e) => {
            expect(e).toHaveProperty('estimatedCarbon');
            expect(e).toHaveProperty('estimatedPrice');
            expect(e).toHaveProperty('status', 'CLOSED');
        });
    });
});

test('it gets all footprints limited with begin and end dates covering the current day', () => {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0); // we reset the current day to midnight

    const params = {
        begin: today.toISOString().slice(0, 10),
        end: new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .slice(0, 10),
    };

    const timestampBegin = new Date(params.begin).getTime() / 1000; // we convert timestamp from milliseconds to seconds to fit timestamps from API
    const timestampEnd = new Date(params.end).getTime() / 1000;

    return sdk.carbon.getAllFootprints(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);

        if (data.dataInfo._embedded.footprint.length > 0) {
            data.dataInfo._embedded.footprint.forEach((e) => {
                expect(e.createdAt).toBeGreaterThanOrEqual(timestampBegin);
                expect(e.createdAt).toBeLessThan(timestampEnd);
            });
        }
    });
});

test('it gets all footprints limited to 20 results maximum', () => {
    const params = {
        limit: 20,
    };

    return sdk.carbon.getAllFootprints(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo._embedded.footprint.length).toBeLessThanOrEqual(
            20,
        );
    });
});

test('it gets all footprints with PURCHASED status and limited to 10 results maximum', () => {
    const params = {
        status: Status.PURCHASED,
        limit: 10,
    };

    return sdk.carbon.getAllFootprints(params).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        data.dataInfo._embedded.footprint.forEach((e) => {
            expect(e).toHaveProperty('status', 'PURCHASED');
        });
        expect(data.dataInfo._embedded.footprint.length).toBeLessThanOrEqual(
            10,
        );
    });
});

test('it gets one specific purchased carbon footprint based on fingerPrint', () => {
    return sdk.carbon.getOnePurchase(randomFingerprint3).then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(data.dataInfo).toHaveProperty('fingerprint', randomFingerprint3);
    });
});

test('it gets an error trying to get purchased carbon footprint with wrong fingerPrint', () => {
    return sdk.carbon
        .getOnePurchase('notPurchasedFingerprint')
        .then((data: any) => {
            expect(ApiResponse.isInvalid(data)).toBe(true);
            expect(ApiResponse.getErrorMessage(data)).toBe(
                'Purchase not found with this fingerprint: notPurchasedFingerprint',
            );
        });
});

test('it gets all footprints that have been purchased for one user', () => {
    return sdk.carbon.getAllPurchases().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'fingerprint',
            );
        }

        data.dataInfo._embedded.purchase.forEach((e) => {
            expect(e).toHaveProperty('estimatedCarbon');
            expect(e).toHaveProperty('estimatedPrice');
        });
    });
});

test("it gets all projects linked to the user's account", () => {
    return sdk.carbon.getAllProjects().then((data: any) => {
        expect(ApiResponse.isSuccessful(data)).toBe(true);
        expect(ApiResponse.getIdList(data).length).toBeGreaterThan(0);

        for (let key in ApiResponse.getIdList(data)) {
            expect(ApiResponse.getIdList(data)[key]).toHaveProperty(
                'idProject',
            );
        }

        data.dataInfo._embedded.project.forEach((e) => {
            expect(e).toHaveProperty('brokerName');
            expect(e).toHaveProperty('carbonPrice');
            expect(e).toHaveProperty('country');
        });
    });
});
