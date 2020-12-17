require('dotenv').config('/.env');
import { PartnershipGroup } from '../src/models';
import { deserialize } from 'typescript-json-serializer';
import { Tools } from '../src/models';

test("it sets the partnership as the default one", () => {
    const partnershipGroupTest = new PartnershipGroup();
    partnershipGroupTest.isDefault = true;
    expect(partnershipGroupTest.isDefault).toBe(true);
});

test('Add complete partnershipGroup with PartnershipGroup Model', () => {
    const userTest = new PartnershipGroup(
        [11,4],
        false,
        'newPartnershipGroup',
    );
    expect(userTest).toMatchObject({
        partnershipIds: [11,4],
        isDefault: false,
        externalId: 'newPartnershipGroup',
    });
});

test('It deserializes received data to fit PartnershipGroup Model', () => {
    const data = {
        partnershipIds: [13,2],
        isDefault: true,
        externalId: 'newPartnershipGroup',
    };
    const finalData = deserialize(data, PartnershipGroup);
    expect(finalData).toMatchObject({
        partnershipIds: [13,2],
        isDefault: true,
        externalId: 'newPartnershipGroup',
    });
});

test('It verifies if method returns error with empty array for partnershipIds', () => {
    const charityTest3 = new PartnershipGroup(
        [],
        false,
        'newPartnershipGroup',
    );
    return Tools.verify(charityTest3).then((data: any) => {
        expect(data).toBeDefined();
        expect(data[0].property).toContain('partnershipIds');
    });
});
