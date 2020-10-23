---
id: carbon-api-requests
title: Carbon Footprints - API Requests
---

**If you have completed your profile you can now add and manage carbon footprints!**

Carbon footprints and carbon credits purchase are the heart of our API.
We have selected two kind of carbon footprints:

-   web browsing or navigation (dependent on time, device type, number of images loaded, number of pages visited, etc.). For web browsing, we have other elements that are taken into account which are reduced to electrical consumption.
-   transport of persons or goods (dependent on weight, method of transport and the kind of energy used). With each transport type is associated an energy type and with each energy type is associated a carbon emission factor.
-   so you can easily estimate the carbon cost for the web browsing made by a user to shop a product and the carbon cost for the transport of this product to be delivered to consumer.
-   The main results are the carbon equivalent estimate (estimatedCarbon expressed in Tons of CO²eq) and the price estimate (estimatedPrice expressed in euro cents (100 = 1€)) for offsetting your carbon equivalent.
-   Moreover, our Api gives you the possibility to create footprints that will be saved in our database and after retrievable via a `fingerprint` but also to simulate footprints. These simulations WON'T have fingerprint to identify them and WON'T be saved in database.

## carbon.addWebFootprint()

to create a web carbon footprint associated with a unique fingerprint and that will be saved in database

| Param           | Type                      | Description                                                                                                            |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| newWebFootprint | <code>WebFootprint</code> | object containing all datas about the ongoing web carbon footprint WITH fingerprint - Only admin can add web footprint |

You can find details about how to build the object new WebFootprint [here.](carbon-data#web-footprint-)

-   add object with new carbon cost estimated.

```
    return sdk.carbon
        .addWebFootprint(newWebFootprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.000002',
        estimatedPrice: '0.0011',
        createdAt: 1595799361,
        updatedAt: 1595799361,
        status: 'ONGOING'
    },
    status: 201
}
```

-   since adding a web footprint without fingerprint is also possible but will result as an unsaved data, if you use this method without fingerprint you will received a special error :

```
{
    success: false,
    dataInfo: "you cannot add a web footprint without fingerprint in your web object, data won't be saved",
    status: 400
}
```

## carbon.simulateWebFootprint()

to simulate a web carbon footprint WITHOUT fingerprint and get an estimation that will NOT be saved in database

| Param                     | Type                                | Description                                                                                                                          |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| newWebFootprintSimulation | <code>WebFootprintSimulation</code> | object containing all datas about the ongoing web carbon footprint WITHOUT fingerprint - Only admin can add simulation web footprint |

You can find details about how to build the object new WebFootprintSimulation [here.](carbon-data#footprints-simulations-)

-   add object with new carbon cost estimated.

```
    return sdk.carbon
        .simulateWebFootprint(newWebFootprintSimulation)
        .then((res) => {
            console.log(res)
        });
```

-   API Response (the API will automatically send back a timestamp as fingerprint)

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 1595799361,
        estimatedCarbon: '0.000002',
        estimatedPrice: '0.0011',
        createdAt: 1595799361,
        updatedAt: 1595799361,
        status: 'ONGOING'
    },
    status: 201
}
```

## carbon.addTransportationFootprint()

to create a transportation carbon footprint associated with a unique fingerprint and that will be saved in database

| Param                      | Type                                 | Description                                                                                                                                  |
| -------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| newTransportationFootprint | <code>TransportationFootprint</code> | object containing all datas about the ongoing transportation carbon footprint WITH fingerprint - Only admin can add transportation footprint |

You can find details about how to build the object newTransportationFootprint [here.](carbon-data#transportation-footprint-)

-   add object with new carbon cost estimated.

```
    return sdk.carbon
        .addTransportationFootprint(newTransportationFootprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.003585',
        estimatedPrice: '2.5097',
        createdAt: 1595799362,
        updatedAt: 1595799362,
        status: 'ONGOING'
    },
    status: 201
}
```

-   since adding a transportation footprint without fingerprint is also possible but will result as an unsaved data, if you use this method without fingerprint you will received a special error :

```
{
    success: false,
    dataInfo: "you cannot add a transportation footprint without fingerprint in your transportation object, data won't be saved",
    status: 400
}
```

## carbon.simulateTransportationFootprint()

to simulate a transportation carbon footprint WITHOUT fingerprint and get an estimation that will NOT be saved in database

| Param                                | Type                                           | Description                                                                                                                                                |
| ------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| newTransportationFootprintSimulation | <code>TransportationFootprintSimulation</code> | object containing all datas about the ongoing transportation carbon footprint WITHOUT fingerprint - Only admin can add transportation simulation footprint |

You can find details about how to build the object newTransportationFootprintSimulation [here.](carbon-data#footprints-simulations-)

-   add object with new carbon cost estimated.

```
    return sdk.carbon
        .simulateTransportationFootprint(newTransportationFootprintSimulation)
        .then((res) => {
            console.log(res)
        });
```

-   API Response (the API will automatically send back a timestamp as fingerprint)

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 1595799363,
        estimatedCarbon: '0.003585',
        estimatedPrice: '2.5097',
        createdAt: 1595799363,
        updatedAt: 1595799363,
        status: 'ONGOING'
    },
    status: 201
}
```

## carbon.getOneFootprint()

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| fingerPrint | <code>string</code> | an unique name to identify each carbon footprint |

-   get information about the ongoing carbon footprint.

```
    return sdk.carbon
        .getOneFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.000002',
        estimatedPrice: '0.0011',
        createdAt: '1595799361',
        updatedAt: '1595799361',
        status: 'ONGOING',
        _links: { self: [Object] }
    },
    status: 200
}
```

## carbon.getAllFootprints()

| Param  | Type                | Description                                                                         |
| ------ | ------------------- | ----------------------------------------------------------------------------------- |
| params | <code>IFootprintURLParams</code> | optional, all query params to filter footprints requests based on IFootprintURLParams interface  |


-  IFootprintURLParams: object with specifications of all possible params to apply to filter data :
  ```      
    params = { 
        status?: Status | null; // based on enum, choose between 'PURCHASED', 'CLOSED', 'ONGOING' footprints
        limit?: number | null; // number of entities received inside API response per page, limit is 50 by default
        page?: number | null; // numerotation of page, number is 1 by default
    }
```

-   get all carbon footprints, no filter applied.

```
    return sdk.carbon
        .getAllFootprints()
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        _links: { self: [Object] },
        _embedded: { footprint: [Array] },
        total_items: 50
    },
    status: 200
}
```

## carbon.closeFootprint()

| Param       | Type                | Description                                     |
| ----------- | ------------------- | ----------------------------------------------- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon footprint |

-   get response with status 200 if success, the carbon footprint is closed and cannot be modified or purchased anymore.

```
    return sdk.carbon
        .closeFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.003585',
        estimatedPrice: '2.5097',
        createdAt: '1595799362',
        updatedAt: 1595799363,
        status: 'CLOSED',
        _links: { self: [Object] }
    },
    status: 200
}
```

## carbon.purchaseFootprint()

| Param       | Type                | Description                                     |
| ----------- | ------------------- | ----------------------------------------------- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon footprint |

-   get response with status 200 if success, the carbon footprint is purchased. After being purchased, the footprint cannot be updated anymore.

```
    return sdk.carbon
        .purchaseFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.001177',
        estimatedPrice: '0.8235',
        createdAt: '1595799363',
        updatedAt: 1595799364,
        status: 'PURCHASED',
        _links: { self: [Object] }
    },
    status: 200
}
```

## carbon.emptyFootprint()

| Param       | Type                | Description                                     |
| ----------- | ------------------- | ----------------------------------------------- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon footprint |

-   get response with status 204 if success, only ongoing footprint can be emptied.

```
    return sdk.carbon
        .emptyFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: 'carbon footprint emptied successfully',
    status: 204
}
```

## carbon.getOnePurchase()

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| fingerPrint | <code>string</code> | an unique name to identify each carbon footprint |

-   get information about one specific carbon footprint with status 'PURCHASED'.

```
    return sdk.carbon
        .getOnePurchase(fingerprint)
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 'yourUserId',
        fingerprint: 'yourFingerprint',
        estimatedCarbon: '0.001177',
        estimatedPrice: '0.8235',
        createdAt: '1595799363',
        _links: { self: [Object] }
    },
    status: 200
}
```

## carbon.getAllPurchases()

-   get all carbon footprints that have been purchased by user.

```
    return sdk.carbon
        .getAllFootprints()
        .then((res) => {
            console.log(res)
        });
```

-   API Response

```
{
    success: true,
    dataInfo: {
        _links: { self: [Object] },
        _embedded: { purchase: [Array] },
        total_items: 50
    },
    status: 200
}
```
