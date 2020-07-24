---
id: carbon-api-requests
title: Carbon Estimate - API Requests
---

If you have completed your profile you can now add and manage carbon footprints!

Carbon footprints and carbon credits purchase are the heart of our API.
We have selected two kind of carbon footprints:
- web browsing or navigation (dependent on time, device type, number of images loaded, number of pages visited, etc.). For web browsing, we have other elements that are taken into account which are reduced to electrical consumption.
- transport of persons or goods (dependent on weight, method of transport and the kind of energy used). With each transport type is associated an energy type and with each energy type is associated a carbon emission factor. 
- so you can easily estimate the carbon cost for the web browsing made by a user to shop a product and the carbon cost for the transport of this product to be delivered to consumer.
- The main results are the carbon equivalent estimate (estimatedCarbon expressed in Tons of CO²eq) and the price estimate (estimatedPrice expressed in euro cents (100 = 1€)) for offsetting your carbon equivalent.
- Moreover, our Api gives you the possibility to create Footprints that will be saved in our database and after retrievable via a `fingerprint` but also to simulate footprints. These simulations WON'T have fingerprint to identify them and WON'T be saved in database. 

## carbon.addWebFootprint()
to create a web carbon footprint associated with a unique fingerprint and that will be saved in database

| Param | Type | Description |
| --- | --- | --- |
| newWebFootprint | <code>WebFootprint</code> | object containing all datas about the ongoing web carbon footprint WITH fingerprint - Only admin can add web footprint |
You can find details about how to build the object new WebFootprint [here.](carbon-data#web-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .addWebFootprint(newWebFootprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'web estimate added successfully',
    status: 201
}
```

## carbon.simulateWebFootprint()
to create a web carbon footprint WITHOUT fingerprint and get an estimation that will NOT be saved in database

| Param | Type | Description |
| --- | --- | --- |
| newWebFootprintSimulation | <code>WebFootprintSimulation</code> | object containing all datas about the ongoing web carbon footprint WITHOUT fingerprint - Only admin can add simulation web footprint |
You can find details about how to build the object new WebFootprintSimulation [here.](carbon-data#web-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .simulateWebFootprint(newWebFootprintSimulation)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'web estimate added successfully',
    status: 201
}
```

## carbon.addTransportationFootprint()
to create a transportation carbon footprint associated with a unique fingerprint and that will be saved in database

| Param | Type | Description |
| --- | --- | --- |
| newTransportationFootprint | <code>TransportationFootprint</code> | object containing all datas about the ongoing transportation carbon footprint WITH fingerprint - Only admin can add transportation footprint |
You can find details about how to build the object newTransportationFootprint [here.](carbon-data#path-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .addTransportationFootprint(newTransportationFootprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'path estimate added successfully',
    status: 201
}
```
- since adding a transportation footprint without fingerprint is also possible but will result as an unsaved data, if you use this method without fingerprint you will received a special error : 
```
{
    success: false,
    dataInfo: "you cannot add a transportation footprint without fingerprint in your transportation object, data won't be saved",
    status: 400
}
```

## carbon.simulateTransportationFootprint()
to create a transportation carbon footprint associated with a unique fingerprint and that will be saved in database

| Param | Type | Description |
| --- | --- | --- |
| newTransportationFootprint | <code>TransportationFootprint</code> | object containing all datas about the ongoing transportation carbon footprint WITH fingerprint - Only admin can add transportation footprint |
You can find details about how to build the object newTransportationFootprintSimulation [here.](carbon-data#path-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .simulateTransportationFootprint(newTransportationFootprintSimulation)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'path estimate added successfully',
    status: 201
}
```

## carbon.getOneFootprint()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | an unique name to identify each carbon footprint |
- get information about the ongoing carbon footprint.
```
    return sdk.carbon
        .getOneFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: '12',
        fingerprint: '158711654547ccac1b310b',
        estimatedCarbon: '0.03191955',
        estimatedPrice: '22.343700408935547',
        computedTime: 0,
        createdAt: 1587127136,
        data: null,
        _links: { self: [Object] }
},
    status: 200
}
```
## carbon.getAllFootprints()
| Param | Type | Description |
| --- | --- | --- |
| status | <code>Status</code> | status of the carbon footprint - based on enum 'ONGOING' or 'CLOSED' or 'PURCHASED' |
- get all carbon footprints associated to fingerprint and filtered by status.
```
    return sdk.carbon
        .getAllFootprints(status)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: '12',
        fingerprint: '158711654547ccac1b310b',
        estimatedCarbon: '0.03191955',
        estimatedPrice: '22.343700408935547',
        computedTime: 0,
        createdAt: 1587127136,
        data: null,
        _links: { self: [Object] }
},
    status: 200
}
```
## carbon.closeFootprint()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon footprint |
- get response with status 200 if success, the carbon footprint is closed and cannot be modified or purchased anymore.
```
    return sdk.carbon
        .closeFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'carbon estimate completed successfully',
    status: 200
}
```
## carbon.purchaseFootprint()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon footprint |
- get response with status 200 if success, the carbon footprint is purchased. After being purchased, the footprint cannot be updated anymore.
```
    return sdk.carbon
        .purchaseFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'carbon estimate completed successfully',
    status: 200
}
```

## carbon.emptyFootprint()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon offsetting estimate |
- get response with status 204 if success, only ongoing footprint can be emptied.

```
    return sdk.carbon
        .emptyFootprint(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'carbon estimate emptied successfully',
    status: 204
}
```

## carbon.getOnePurchase()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | an unique name to identify each carbon footprint |
- get information about one specific carbon footprint with status 'PURCHASED'.
```
    return sdk.carbon
        .getOnePurchase(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: '12',
        fingerprint: '158711654547ccac1b310b',
        estimatedCarbon: '0.03191955',
        estimatedPrice: '22.343700408935547',
        computedTime: 0,
        createdAt: 1587127136,
        data: null,
        _links: { self: [Object] }
},
    status: 200
}
```

## carbon.getAllPurchases()
- get all carbon footprints that have been purchased by user.
```
    return sdk.carbon
        .getAllFootprints()
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: '12',
        fingerprint: '158711654547ccac1b310b',
        estimatedCarbon: '0.03191955',
        estimatedPrice: '22.343700408935547',
        computedTime: 0,
        createdAt: 1587127136,
        data: null,
        _links: { self: [Object] }
},
    status: 200
}
```