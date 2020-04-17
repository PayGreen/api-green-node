---
id: doc8
title: Get Carbon Statistics
---

If you have created and completed carbon offsetting estimates, you can now get statistics and see all your carbon offsetting credit purchases, filtered in many ways.

## carbonStatistics.get()
- default mode : get automatically datas from last month until today
```
    return sdk.carbonStatistics
        .get()
        .then((res) => {
            console.log(res)
        }})
    };
```
## carbonStatistics.getADate()
- get datas on a specific date

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | accepted formats are YYYY-MM-DD(show a day), YYYY-MM(show a month), YYYY(show a year) |

```
    return sdk.carbonStatistics
        .getADate(date)
        .then((res) => {
            console.log(res)
        }})
    };
```

## carbonStatistics.getAPeriod()
- get datas on a specific period

| Param | Type | Description |
| --- | --- | --- |
| start | <code>string</code> | accepted format YYYY-MM-DD |
| end? | <code>string</code> | optional, if no date specified current day will be used, accepted format YYYY-MM-DD |

```
    return sdk.carbonStatistics
        .getAPeriod(start, end)
        .then((res) => {
            console.log(res)
        }})
    };
```

## Api Response
The object inside response contains the number of carbon estimates, the total Carbon in kilograms, the total of purchases in euros cents and the period requested.
```
{
    success: true,
    dataInfo : {
        count: '24',
        estimatedCarbon: '0.47815984000000045',
        estimatedPrice: '334.7122166156769',
        period: {
          start: '2020-03-29T00:00:00+00:00',
          end: '2020-04-17T00:00:00+00:00'
        },
    status: 201
}   
```
We have created special tools to handle/convert data inside the response, like Carbon or Price. You can find them [here.](doc9.md) 