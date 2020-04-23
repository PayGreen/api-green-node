---
id: carbon-api-requests
title: Carbon Estimate - API Requests
---

If you have completed your profile you can now add and manage carbon offsetting estimate!

Carbon offsetting estimate and carbon credits purchase are the heart of our API.
We have selected two kind of carbon offsetting estimations:
- web browsing or navigation (dependent on time, device type, number of images loaded, number of pages visited, etc.). For web browsing, we have other elements that are taken into account which are reduced to electrical consumption.
- transport of persons or goods (dependent on weight, method of transport and the kind of energy used). With each transport type is associated an energy type and with each energy type is associated a carbon emission factor. 
- so you can easily estimate the carbon cost for the web browsing made by a user to shop a product and the carbon cost for the transport of this product to be delivered to consumer.
- The main results are the carbon equivalent estimate (estimatedCarbon expressed in Tons of CO²eq) and the price estimate (estimatedPrice expressed in euro cents (100 = 1€)) for offsetting your carbon equivalent. 

## carbon.addWebEstimate()
| Param | Type | Description |
| --- | --- | --- |
| newWebEstimate | <code>WebEstimate</code> | object containing all datas about the ongoing web carbon offsetting estimate - Only admin can add web estimate |
You can find details about how to build the object new WebEstimate [here.](carbon-data#web-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .addWebEstimate(newWebEstimate)
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

## carbon.addPathEstimate()
| Param | Type | Description |
| --- | --- | --- |
| newPathEstimate | <code>PathEstimate</code> | object containing all datas about the ongoing path carbon offsetting estimate - Only admin can add path estimate |
You can find details about how to build the object newPathEstimate [here.](carbon-data#path-estimate-)
- add object with new carbon cost estimated.
```
    return sdk.carbon
        .addPathEstimate(newPathEstimate)
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
## carbon.getEstimate()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon offsetting estimate |
- get information about the ongoing carbon offsetting estimate.
```
    return sdk.carbon
        .getEstimate(fingerprint)
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
## carbon.completeEstimate()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon offsetting estimate |
- get response with status 200 if success, the carbon estimate is validated. After completion, the estimate cannot be updated anymore.
```
    return sdk.carbon
        .completeEstimate(fingerprint)
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
## carbon.deleteEstimate()
| Param | Type | Description |
| --- | --- | --- |
| fingerPrint | <code>string</code> | a unique name to identify each carbon offsetting estimate |
- get response with status 204 if success, only ongoing estimate (before completion) can be deleted.  
```
    return sdk.carbon
        .deleteEstimate(fingerprint)
        .then((res) => {
            console.log(res)
        });
```
- API Response
```
{
    success: true,
    dataInfo: 'carbon estimate deleted successfully',
    status: 204
}
```