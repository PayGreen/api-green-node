---
id: transports
title: Get Transports
---

If you wish to estimate the carbon footprint of a transport, we provide you with a detailed list of vehicles types (including the energy used for fuel) that are commonly used. This include trucks (arranged by maximum weight capacity), vans, motorcycle, cars, buses, trains, planes, ferry, and even a bike.

## transport.getAll()

-   Get a list of all the different transports available inside the API

```
    return sdk.transport
        .getAll()
        .then((res) => {
            console.log(res)
        });
```

## API Response

The \_embedded object inside API response contains an array of all transport modes availables.

```
{
    success: true,
    dataInfo: {
        _links: { self: [Object] },
        _embedded: { ccarbon_transport: [Array] },
        total_items: 39
    },
    status: 200
}
```

\_embedded object close-up :

```
{   ccarbon_transport: [
        ...,
        {
            idTransport: '322',
            idEnergy: '16',
            idAccount: null,
            idUser: null,
            uuid: 'subway-elec-1',
            name: 'Subway, city > 150 000 at 250 000 inhabitants',
            vehicle: 'Subway',
            maxWeight: '25000',
            consumption: '1',
            _links: [Object]
        },
        {
            idTransport: '321',
            idEnergy: '17',
            idAccount: null,
            idUser: null,
            uuid: 'bus-diesel',
            name: 'Bus',
            vehicle: 'Bus',
            maxWeight: '25000',
            consumption: '32.193',
            _links: [Object]
        },
        ...
    ]
}
```

We have created special tools to handle/convert data inside the response, like getting directly the name of each transport. You can find them [here.](tools#getidlist)
