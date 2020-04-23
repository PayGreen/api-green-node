---
id: carbon-data
title: Create Paths & Web Estimates
---

Here you will find all informations to create a New Path Estimate and New Web Estimate Objects with our Model classes.
- Each estimate is identified by its unique `fingerprint`. To be sure to have a unique fingerPrint, please check our [special method here.](tools#randomfingerprint) 
- You can make a carbon offsetting estimate in multiple calls, mix transports, add a web estimate on top of it, as long as you use the SAME fingerprint.
- After its creation, the estimate is considered as ongoing, and you can either:
    - add data to the estimate (as many calls as you need)
    - check the current estimate results (computed with available data)
    - complete the estimate (no further addition will be accepted) and validate the purchase of carbon offsetting credits.
    - or delete the estimate (all provided data associated with this fingerprint will be removed).

# Web Estimate : 

## Object expected by API Green : 

| Name | Type | Description |
| --- | --- | --- |
| type | <code>enum</code> | type of Estimate based on enum - prefilled with 'web' value|
| fingerprint | <code>string</code> | unique string to identify a Carbon offsetting estimate data |
| userAgent | <code>string</code> | user agent headers |
| device | <code>string</code> | device will be automatically filled by Api based on the User Agent provided |
| browser | <code>string</code> | browser will be automatically filled by Api based on the User Agent provided |
| countImages | <code>number</code> | number of images requested during the navigation |
| countPages | <code>number</code> | number of pages requested during the navigation |
| time | <code>number</code> | time spent during the navigation (in seconds) |
| externalId | <code>string</code> | optional - user ExternalId you may use to identify him in your system |
```
{
    type: 'web',
    fingerprint: string,
    webNavigation: {
        userAgent: string,
        device: '',
        browser: '',
        countImages: number,
        countPages: number,
        time: number,
        externalId?: string,
    },
}
```
when you use the WebEstimate Model Class, type is prefilled with 'web' value.

## Add one information at a time :

```
import { Tools, WebEstimate } from 'api-green-node';

const randomFingerprint = Tools.randomFingerprint();

const newWebData = new WebEstimate();
newWebData.fingerprint = randomFingerprint;
```
## Or all at once  :
adding fingerprint + userAgent + number of Pages + number of Images + Time
```
import { WebEstimate } from 'api-green-node';

const newWebData = new WebEstimate(
    randomFingerprint,
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0',
    140,
    6,
    180,
);
```

# Path Estimate :

- A `PathEstimate` includes the quantity and weight of the packages sent and the `Path(s)` they have traveled. 
- A `Path` combines a point of departure, a point of arrival and a mode of transport associated.
- A point of departure/arrival can be created with either our model `Coordinate` for Plane and Ferry (that require latitude and longitude) or our model class `Address` for all other transports. 
- Let's create a PathEstimate step by step! 

## Step 1 : We create 3 addresses:
## Adress Model
| Name | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | street name |
| zipCode | <code>string</code> | zipCode |
| city | <code>string</code> | city name |
| country | <code>string</code> | country (must be written out in full) |

## Coordinate Model
| Name | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | this field must be sent to Api with default value. |
| zipCode | <code>string</code> | this field must be sent to Api with default value. |
| city | <code>string</code> | city name |
| country | <code>string</code> | country (must be written out in full) |
| latitude | <code>string</code> | valid latitude coordinate |
| longitude | <code>string</code> | valid longitude coordinate |

```
import { Coordinate, Address } from 'api-green-node';

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
```
## Step 2 : We create the 2 paths :
## Model Path
| Name | Type | Description |
| --- | --- | --- |
| addressDeparture | <code>Address/Coordinate</code> | address object generated with Address or Coordinate Models |
| addressArrival | <code>Address/Coordinate</code> | address object generated with Address or Coordinate Models |
| transport | <code>enum</code> | transport vehicle chosen from enum |

``` 
import { Path, Transport } from 'api-green-node';

const path1 = new Path(address1, address2, Transport['Plane < 10000km']);
const path2 = new Path(address2, address3, Transport['TER France - Diesel'],
);
```
## Step 3 : We build the PathEstimate :
## Object expected by API Green : 

| Name | Type | Description |
| --- | --- | --- |
| type | <code>EstimateType</code> | type of Estimate based on enum |
| fingerprint | <code>string</code> | unique string to identify a Carbon offsetting estimate data |
| weightPackages | <code>number</code> | accumulated weight of all packages transported (in kilogram) |
| countPackages | <code>number</code> | number of packages transported |
| addresses | <code>Array.&lt;Address&gt;</code> | an array containing all adresses |
| transports | <code>Array.&lt;object&gt;</code> | an array containing all transports |

when you use the PathEstimate Model Class, type is prefilled with 'path' value.

```
import { PathEstimate } from 'api-green-node';

const pathTest = new PathEstimate(
    'NewMixNYFrance',
    20,
    1,
    [path1, path2]
    );
```
what our final object will look like : 

```
{
    type: 'path',
    fingerprint: 'NewMixNYFrance',
    weightPackages: 20,
    countPackages: 1,
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
}
```

### We have built special method to verify the data before sending it to API. [Try it here](tools#verify)